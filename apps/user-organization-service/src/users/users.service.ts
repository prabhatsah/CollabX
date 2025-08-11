import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import {
  CreateUserDto,
  PaginationDto,
  UserStatus,
  IUser,
  IUserWithOrganizations,
} from "@app/common";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException("User with this email already exists");
      }

      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          status: UserStatus.ACTIVE,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findUsers(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const offset = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip: offset,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          memberships: {
            where: { status: "ACTIVE" },
            include: {
              organization: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  logo: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.user.count(),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findUserById(id: string): Promise<IUser> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getUserWithOrganizations(
    userId: string
  ): Promise<IUserWithOrganizations> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        memberships: {
          where: { status: "ACTIVE" },
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
        },
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const organizations = user.memberships
      .filter((membership) => membership.organization.isActive)
      .map((membership) => ({
        id: membership.organization.id,
        name: membership.organization.name,
        slug: membership.organization.slug,
        logo: membership.organization.logo,
        role: membership.role,
        joinedAt: membership.joinedAt,
        isActive: membership.organization.isActive,
      }));

    return {
      ...user,
      organizations,
    };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existingUser = await this.findUserById(id);

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await this.findUserById(id);

    await this.prisma.user.update({
      where: { id },
      data: { status: UserStatus.INACTIVE },
    });
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    });
  }
}
