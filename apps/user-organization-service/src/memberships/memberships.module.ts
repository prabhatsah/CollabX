import { Module, forwardRef } from "@nestjs/common";
import { MembershipsController } from "./memberships.controller";
import { MembershipsService } from "./memberships.service";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [MembershipsController],
  providers: [MembershipsService],
  exports: [MembershipsService],
})
export class MembershipsModule {}
