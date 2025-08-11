import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { MembershipsService } from "../memberships/memberships.service";
import {
  CreateOrganizationDto,
  PaginationDto,
  IOrganization,
  IOrganizationWithMembers,
  MembershipRole,
  OrganizationPlan,
} from "@app/common";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly membershipsService: MembershipsService
  ) {}

  async createOrganization(
    createOrganizationDto: CreateOrganizationDto
  ): Promise<IOrganization> {
    try {
      // Check if slug is unique
      const existingOrg = await this.prisma.organization.findUnique({
        where: { slug: createOrganizationDto.slug },
      });

      if (existingOrg) {
        throw new ConflictException(
          "Organization with this slug already exists"
        );
      }

      // Check if user exists
      const user = await this.prisma.user.findUnique({
        where: { id: createOrganizationDto.createdById },
      });

      if (!user) {
        throw new NotFoundException("Creator user not found");
      }

      // Create organization with transaction
      const result = await this.prisma.$transaction(async (tx) => {
        // Create organization
        const organization = await tx.organization.create({
          data: {
            ...createOrganizationDto,
            plan: createOrganizationDto.plan || OrganizationPlan.FREE,
            maxMembers: createOrganizationDto.maxMembers || 10,
          },
        });

        // Add creator as owner
        await tx.membership.create({
          data: {
            userId: createOrganizationDto.createdById,
            organizationId: organization.id,
            role: MembershipRole.OWNER,
          },
        });

        return organization;
      });

      return result;
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new Error(`Failed to create organization: ${error.message}`);
    }
  }

  async findOrganizations(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const offset = (page - 1) * limit;

    const [organizations, total] = await Promise.all([
      this.prisma.organization.findMany({
        skip: offset,
        take: limit,
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
        include: {
          createdBy: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
          _count: {
            select: {
              memberships: {
                where: { status: "ACTIVE" },
              },
            },
          },
        },
      }),
      this.prisma.organization.count({
        where: { isActive: true },
      }),
    ]);

    return {
      data: organizations,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOrganizationById(id: string): Promise<IOrganization> {
    const organization = await this.prisma.organization.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!organization) {
      throw new NotFoundException("Organization not found");
    }

    return organization;
  }

  async findOrganizationBySlug(slug: string): Promise<IOrganization> {
    const organization = await this.prisma.organization.findUnique({
      where: { slug },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!organization) {
      throw new NotFoundException("Organization not found");
    }

    return organization;
  }

  async getOrganizationWithMembers(
    id: string,
    paginationDto: PaginationDto
  ): Promise<IOrganizationWithMembers> {
    const organization = await this.findOrganizationById(id);

    const { page = 1, limit = 10 } = paginationDto;
    const offset = (page - 1) * limit;

    const [memberships, memberCount] = await Promise.all([
      this.prisma.membership.findMany({
        skip: offset,
        take: limit,
        where: {
          organizationId: id,
          status: "ACTIVE",
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              profileImage: true,
            },
          },
        },
        orderBy: { joinedAt: "asc" },
      }),
      this.prisma.membership.count({
        where: {
          organizationId: id,
          status: "ACTIVE",
        },
      }),
    ]);

    const members = memberships.map((membership) => ({
      id: membership.user.id,
      email: membership.user.email,
      firstName: membership.user.firstName,
      lastName: membership.user.lastName,
      profileImage: membership.user.profileImage,
      role: membership.role,
      joinedAt: membership.joinedAt,
      isActive: true,
    }));

    return {
      ...organization,
      members,
      memberCount,
    };
  }

  async updateOrganization(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto
  ): Promise<IOrganization> {
    await this.findOrganizationById(id);

    // Check slug uniqueness if provided
    if (updateOrganizationDto.slug) {
      const existingOrg = await this.prisma.organization.findFirst({
        where: {
          slug: updateOrganizationDto.slug,
          NOT: { id },
        },
      });

      if (existingOrg) {
        throw new ConflictException(
          "Organization with this slug already exists"
        );
      }
    }

    const organization = await this.prisma.organization.update({
      where: { id },
      data: updateOrganizationDto,
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return organization;
  }

  async deleteOrganization(id: string): Promise<void> {
    await this.findOrganizationById(id);

    await this.prisma.organization.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async validateOrganizationAccess(
    userId: string,
    organizationId: string
  ): Promise<boolean> {
    const membership = await this.prisma.membership.findFirst({
      where: {
        userId,
        organizationId,
        status: "ACTIVE",
      },
    });

    return !!membership;
  }
}
