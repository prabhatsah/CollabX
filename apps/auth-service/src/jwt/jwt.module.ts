import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtTokenService } from "./jwt.service";
import { PrismaModule } from "../database/database.module";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || "less_secret",
      signOptions: { expiresIn: "7d" },
    }),
    PrismaModule,
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService, JwtModule],
})
export class JwtWrapperModule {}
