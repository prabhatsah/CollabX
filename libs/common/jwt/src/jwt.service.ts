import { MembershipRole } from "@app/common";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export interface JwtPayloadPreliminary {
  sub: string;
  email: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  orgId: string;
  // organizations: Array<{ orgId: string; role: MembershipRole }>;
}

export interface TokenResponse {
  accessToken: string;
  expiresIn: string;
}

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  generatePreliminary(
    payloadPreliminary: JwtPayloadPreliminary
  ): TokenResponse {
    const accessToken = this.jwtService.sign(payloadPreliminary);

    return {
      accessToken,
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    };
  }

  generate(payload: JwtPayload): TokenResponse {
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    };
  }

  verify(token: string): JwtPayload {
    return this.jwtService.verify(token);
  }

  decode(token: string): JwtPayload | null {
    try {
      return this.jwtService.decode(token) as JwtPayload;
    } catch {
      return null;
    }
  }
}
