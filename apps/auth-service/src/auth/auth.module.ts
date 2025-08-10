import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtWrapperModule } from "libs/common/jwt/src/jwt.module";
import { PasswordModule } from "../password/password.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { DatabaseModule } from "../database/database.module";
import { KafkaProducersModule } from "../kafka/kafka-producers.module";
import { EmailModule } from "../notification/email.module";
import { PassportModule } from "@nestjs/passport";
import { KafkaConsumersModule } from "../kafka/kafka-consumers.module";

@Module({
  imports: [
    JwtWrapperModule,
    PasswordModule,
    DatabaseModule,
    KafkaConsumersModule,
    KafkaProducersModule,
    EmailModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
