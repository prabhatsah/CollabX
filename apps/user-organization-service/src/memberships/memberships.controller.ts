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
import { MembershipsService } from "./memberships.service";
import { CreateMembershipDto, PaginationDto } from "@app/common";
import { UpdateMembershipDto } from "./dto/update-membership.dto";
import { AddMemberDto } from "./dto/add-member.dto";

@Controller("memberships")
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Post()
  async createMembership(@Body() createMembershipDto: CreateMembershipDto) {
    return this.membershipsService.createMembership(createMembershipDto);
  }

  @Post("add-member")
  async addMember(@Body() addMemberDto: AddMemberDto) {
    return this.membershipsService.addMemberToOrganization(addMemberDto);
  }

  @Get("organization/:orgId")
  async getOrganizationMemberships(
    @Param("orgId") orgId: string,
    @Query() paginationDto: PaginationDto
  ) {
    return this.membershipsService.findMembershipsByOrganization(
      orgId,
      paginationDto
    );
  }

  @Get("user/:userId")
  async getUserMemberships(
    @Param("userId") userId: string,
    @Query() paginationDto: PaginationDto
  ) {
    return this.membershipsService.findMembershipsByUser(userId, paginationDto);
  }

  @Patch(":id")
  async updateMembership(
    @Param("id") id: string,
    @Body() updateMembershipDto: UpdateMembershipDto
  ) {
    return this.membershipsService.updateMembership(id, updateMembershipDto);
  }

  @Patch(":id/role")
  async changeMemberRole(
    @Param("id") id: string,
    @Body() data: { role: string; updatedBy: string }
  ) {
    return this.membershipsService.changeMemberRole(
      id,
      data.role,
      data.updatedBy
    );
  }

  @Delete(":id")
  async removeMembership(@Param("id") id: string) {
    return this.membershipsService.removeMembership(id);
  }

  // Microservice patterns
  @MessagePattern("membership.create")
  async createMembershipRpc(@Payload() data: CreateMembershipDto) {
    return this.membershipsService.createMembership(data);
  }

  @MessagePattern("membership.findByUserAndOrg")
  async findMembershipRpc(
    @Payload() data: { userId: string; organizationId: string }
  ) {
    return this.membershipsService.findMembershipByUserAndOrg(
      data.userId,
      data.organizationId
    );
  }
}
