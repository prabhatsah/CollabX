import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { OrganizationModule } from '../organizations/organization.module';
import { MembershipModule } from '../memberships/membership.module';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [OrganizationModule, MembershipModule, PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
