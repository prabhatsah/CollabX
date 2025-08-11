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
import { UsersService } from "./users.service";
import {
  CreateUserDto,
  PaginationDto,
  GetUserByEmailDto,
  GetUserOrganizationsDto,
} from "@app/common";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // HTTP endpoints for API Gateway
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async findUsers(@Query() paginationDto: PaginationDto) {
    return this.usersService.findUsers(paginationDto);
  }

  @Get(":id")
  async findUserById(@Param("id") id: string) {
    return this.usersService.findUserById(id);
  }

  @Get(":id/organizations")
  async getUserOrganizations(@Param("id") id: string) {
    return this.usersService.getUserWithOrganizations(id);
  }

  @Patch(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    return this.usersService.deleteUser(id);
  }

  // Microservice patterns for inter-service communication
  @MessagePattern("user.findByEmail")
  async findUserByEmail(@Payload() data: GetUserByEmailDto) {
    return this.usersService.findUserByEmail(data.email);
  }

  @MessagePattern("user.findWithOrganizations")
  async findUserWithOrganizations(@Payload() data: GetUserOrganizationsDto) {
    return this.usersService.getUserWithOrganizations(data.userId);
  }

  @MessagePattern("user.create")
  async createUserFromEvent(@Payload() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }
}
