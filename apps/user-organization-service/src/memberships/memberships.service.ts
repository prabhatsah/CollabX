import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import {
  CreateMembershipDto,
  PaginationDto,
  IMembership,
  MembershipRole,
  MembershipStatus,
  ROLE_PERMISSIONS,
} from "@app/common";
import { UpdateMembershipDto } from "./dto/update-membership.dto";
import { AddMemberDto } from "./dto/add-member.dto";

@Injectable()
export class MembershipsService {
  constructor(private readonly prisma: PrismaService) {}

  async createMembership(
    createMembershipDto: CreateMembershipDto
  ): Promise<IMembership> {
    try {
      // Check if user exists
      const user = await this.prisma.user.findUnique({
        where: { id: createMembershipDto.userId },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      // Check if organization exists
      const organization = await this.prisma.organization.findUnique({
        where: { id: createMembershipDto.organizationId },
      });

      if (!organization) {
        throw new NotFoundException("Organization not found");
      }

      if (!organization.isActive) {
        throw new BadRequestException("Cannot join inactive organization");
      }

      // Check if membership already exists
      const existingMembership = await this.prisma.membership.findUnique({
        where: {
          userId_organizationId: {
            userId: createMembershipDto.userId,
            organizationId: createMembershipDto.organizationId,
          },
        },
      });

      if (
        existingMembership &&
        existingMembership.status === MembershipStatus.ACTIVE
      ) {
        throw new ConflictException(
          "User is already a member of this organization"
        );
      }

      // Check organization member limit
      const currentMemberCount = await this.prisma.membership.count({
        where: {
          organizationId: createMembershipDto.organizationId,
          status: MembershipStatus.ACTIVE,
        },
      });

      if (currentMemberCount >= organization.maxMembers) {
        throw new BadRequestException(
          "Organization has reached maximum member limit"
        );
      }

      // Create or reactivate membership
      const membership = existingMembership
        ? await this.prisma.membership.update({
            where: { id: existingMembership.id },
            data: {
              role: createMembershipDto.role,
              status: MembershipStatus.ACTIVE,
              joinedAt: new Date(),
              leftAt: null,
              permissions: createMembershipDto.permissions,
            },
          })
        : await this.prisma.membership.create({
            data: createMembershipDto,
          });

      return membership;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new Error(`Failed to create membership: ${error.message}`);
    }
  }

  async addMemberToOrganization(
    addMemberDto: AddMemberDto
  ): Promise<IMembership> {
    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email: addMemberDto.email },
    });

    if (!user) {
      throw new NotFoundException("User not found with this email");
    }

    return this.createMembership({
      userId: user.id,
      organizationId: addMemberDto.organizationId,
      role: addMemberDto.role,
      permissions: addMemberDto.permissions,
    });
  }

  async findMembershipsByOrganization(
    organizationId: string,
    paginationDto: PaginationDto
  ) {
    const { page = 1, limit = 10 } = paginationDto;
    const offset = (page - 1) * limit;

    const [memberships, total] = await Promise.all([
      this.prisma.membership.findMany({
        skip: offset,
        take: limit,
        where: {
          organizationId,
          status: MembershipStatus.ACTIVE,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              profileImage: true,
              status: true,
            },
          },
        },
        orderBy: { joinedAt: "asc" },
      }),
      this.prisma.membership.count({
        where: {
          organizationId,
          status: MembershipStatus.ACTIVE,
        },
      }),
    ]);

    return {
      data: memberships,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findMembershipsByUser(userId: string, paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const offset = (page - 1) * limit;

    const [memberships, total] = await Promise.all([
      this.prisma.membership.findMany({
        skip: offset,
        take: limit,
        where: {
          userId,
          status: MembershipStatus.ACTIVE,
        },
        include: {
          organization: {
            select: {
              id: true,
              name: true,
              slug: true,
              logo: true,
              isActive: true,
            },
          },
        },
        orderBy: { joinedAt: "asc" },
      }),
      this.prisma.membership.count({
        where: {
          userId,
          status: MembershipStatus.ACTIVE,
        },
      }),
    ]);

    return {
      data: memberships,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findMembershipByUserAndOrg(
    userId: string,
    organizationId: string
  ): Promise<IMembership | null> {
    return this.prisma.membership.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId,
        },
      },
    });
  }

  async updateMembership(
    id: string,
    updateMembershipDto: UpdateMembershipDto
  ): Promise<IMembership> {
    const existingMembership = await this.prisma.membership.findUnique({
      where: { id },
    });

    if (!existingMembership) {
      throw new NotFoundException("Membership not found");
    }

    const membership = await this.prisma.membership.update({
      where: { id },
      data: updateMembershipDto,
    });

    return membership;
  }

  async changeMemberRole(
    membershipId: string,
    newRole: string,
    updatedBy: string
  ): Promise<IMembership> {
    const membership = await this.prisma.membership.findUnique({
      where: { id: membershipId },
      include: {
        organization: true,
        user: true,
      },
    });

    if (!membership) {
      throw new NotFoundException("Membership not found");
    }

    // Validate role
    if (!Object.values(MembershipRole).includes(newRole as MembershipRole)) {
      throw new BadRequestException("Invalid role provided");
    }

    // Check if updater has permission (should be done via guard in real app)
    const updaterMembership = await this.findMembershipByUserAndOrg(
      updatedBy,
      membership.organizationId
    );

    if (
      !updaterMembership ||
      ![MembershipRole.OWNER, MembershipRole.ADMIN].includes(
        updaterMembership.role
      )
    ) {
      throw new ForbiddenException(
        "Insufficient permissions to change member role"
      );
    }

    // Prevent removing the last owner
    if (
      membership.role === MembershipRole.OWNER &&
      newRole !== MembershipRole.OWNER
    ) {
      const ownerCount = await this.prisma.membership.count({
        where: {
          organizationId: membership.organizationId,
          role: MembershipRole.OWNER,
          status: MembershipStatus.ACTIVE,
        },
      });

      if (ownerCount <= 1) {
        throw new BadRequestException(
          "Cannot remove the last owner of the organization"
        );
      }
    }

    const updatedMembership = await this.prisma.membership.update({
      where: { id: membershipId },
      data: { role: newRole as MembershipRole },
    });

    return updatedMembership;
  }

  async removeMembership(id: string): Promise<void> {
    const membership = await this.prisma.membership.findUnique({
      where: { id },
    });

    if (!membership) {
      throw new NotFoundException("Membership not found");
    }

    // Prevent removing the last owner
    if (membership.role === MembershipRole.OWNER) {
      const ownerCount = await this.prisma.membership.count({
        where: {
          organizationId: membership.organizationId,
          role: MembershipRole.OWNER,
          status: MembershipStatus.ACTIVE,
        },
      });

      if (ownerCount <= 1) {
        throw new BadRequestException(
          "Cannot remove the last owner of the organization"
        );
      }
    }

    await this.prisma.membership.update({
      where: { id },
      data: {
        status: MembershipStatus.LEFT,
        leftAt: new Date(),
      },
    });
  }

  async hasPermission(
    userId: string,
    organizationId: string,
    permission: string
  ): Promise<boolean> {
    const membership = await this.findMembershipByUserAndOrg(
      userId,
      organizationId
    );

    if (!membership || membership.status !== MembershipStatus.ACTIVE) {
      return false;
    }

    const rolePermissions = ROLE_PERMISSIONS[membership.role] || [];
    return rolePermissions.includes(permission);
  }
}
