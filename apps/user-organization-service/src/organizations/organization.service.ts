import { Injectable } from '@nestjs/common';
import { OrganizationCreateDto } from '../shared/dto/organizationCreate.dto';
import { PrismaService } from '../database/prisma.service';
import {
  Organization,
  Prisma,
} from 'apps/user-organization-service/prisma/generated/client';

@Injectable()
export class OrganizationService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrganization(
    dto: OrganizationCreateDto,
    tx: Prisma.TransactionClient,
  ): Promise<Organization> {
    const { createdBy, organizationName } = dto;
    const slug = this.generateSlug(organizationName);

    const res = await tx.organization.create({
      data: {
        name: organizationName,
        createdById: createdBy,
        slug,
      },
    });

    return res;
  }

  //==================== Helper =========================

  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // remove special chars
      .replace(/\s+/g, '-') // replace spaces with -
      .replace(/-+/g, '-'); // remove multiple dashes
  }
}
