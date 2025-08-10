import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtTokenService } from "./jwt.service";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || "less_secret",
      signOptions: { expiresIn: "7d" },
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService, JwtModule],
})
export class JwtWrapperModule {}
