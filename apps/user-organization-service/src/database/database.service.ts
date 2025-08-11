import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "../../prisma/generated/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    console.log("User-Organization Service: Database connected");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log("User-Organization Service: Database disconnected");
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === "test") {
      // Clean in reverse order due to foreign key constraints
      await this.auditLog.deleteMany();
      await this.invitation.deleteMany();
      await this.membership.deleteMany();
      await this.organization.deleteMany();
      await this.user.deleteMany();
    }
  }
}
