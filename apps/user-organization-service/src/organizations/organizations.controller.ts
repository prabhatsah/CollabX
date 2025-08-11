import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { OrganizationsService } from "./organizations.service";
import { CreateOrganizationDto, PaginationDto } from "@app/common";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";

@Controller("organizations")
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  async createOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto
  ) {
    return this.organizationsService.createOrganization(createOrganizationDto);
  }

  @Get()
  async findOrganizations(@Query() paginationDto: PaginationDto) {
    return this.organizationsService.findOrganizations(paginationDto);
  }

  @Get(":id")
  async findOrganizationById(@Param("id") id: string) {
    return this.organizationsService.findOrganizationById(id);
  }

  @Get(":id/members")
  async getOrganizationMembers(
    @Param("id") id: string,
    @Query() paginationDto: PaginationDto
  ) {
    return this.organizationsService.getOrganizationWithMembers(
      id,
      paginationDto
    );
  }

  @Get("slug/:slug")
  async findOrganizationBySlug(@Param("slug") slug: string) {
    return this.organizationsService.findOrganizationBySlug(slug);
  }

  @Patch(":id")
  async updateOrganization(
    @Param("id") id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto
  ) {
    return this.organizationsService.updateOrganization(
      id,
      updateOrganizationDto
    );
  }

  @Delete(":id")
  async deleteOrganization(@Param("id") id: string) {
    return this.organizationsService.deleteOrganization(id);
  }

  // Microservice patterns
  @MessagePattern("organization.findById")
  async findOrganizationByIdRpc(@Payload() data: { id: string }) {
    return this.organizationsService.findOrganizationById(data.id);
  }

  @MessagePattern("organization.findBySlug")
  async findOrganizationBySlugRpc(@Payload() data: { slug: string }) {
    return this.organizationsService.findOrganizationBySlug(data.slug);
  }
}
