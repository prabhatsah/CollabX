import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtWrapperModule } from "apps/auth-service/src/jwt/jwt.module";
import { PasswordModule } from "../password/password.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "../database/database.module";
import { KafkaProducersModule } from "../kafka/kafka-producers.module";
import { EmailModule } from "../notification/email.module";
import { PassportModule } from "@nestjs/passport";
import { KafkaConsumersModule } from "../kafka/kafka-consumers.module";
import { UserOrganizationClientModule } from "../user-organziation-client/user-organziation-client.module";

@Module({
  imports: [
    JwtWrapperModule,
    PasswordModule,
    PrismaModule,
    KafkaConsumersModule,
    KafkaProducersModule,
    EmailModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    UserOrganizationClientModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
