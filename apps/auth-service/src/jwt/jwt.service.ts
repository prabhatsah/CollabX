// services/token.service.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../database/database.service";

export interface TokenPayload {
  sub: string; // authUserId
  email: string;
  organizationId?: string;
  role?: string;
  type: "access" | "refresh";
}

export interface GeneratedTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class JwtTokenService {
  constructor(
    public readonly jwtService: JwtService, // Made public for decoding in auth.service
    private readonly prisma: PrismaService
  ) {}

  /**
   * Generate tokens without organization context (for multi-org selection)
   */
  async generateTokens(
    authUserId: string,
    email: string
  ): Promise<GeneratedTokens> {
    const payload: TokenPayload = {
      sub: authUserId,
      email,
      type: "access",
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: "15m" });

    const refreshPayload: TokenPayload = {
      sub: authUserId,
      email,
      type: "refresh",
    };

    const refreshToken = this.jwtService.sign(refreshPayload, {
      expiresIn: "7d",
    });

    // Store refresh token in database
    await this.storeRefreshToken(refreshToken, authUserId);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Decode the JWT token without validation
   */
  decode(token: string): any {
    try {
      // This does NOT validate signature, it just decodes the payload
      return this.jwtService.decode(token);
    } catch (error) {
      throw new Error("Invalid token format");
    }
  }

  /**
   * Generate tokens with organization context (for single-org or after org selection)
   */
  async generateTokensWithOrg(
    authUserId: string,
    email: string,
    organizationId: string,
    role: string
  ): Promise<GeneratedTokens> {
    const payload: TokenPayload = {
      sub: authUserId,
      email,
      organizationId,
      role,
      type: "access",
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: "15m" });

    const refreshPayload: TokenPayload = {
      sub: authUserId,
      email,
      organizationId,
      role,
      type: "refresh",
    };

    const refreshToken = this.jwtService.sign(refreshPayload, {
      expiresIn: "7d",
    });

    // Store refresh token in database
    await this.storeRefreshToken(refreshToken, authUserId);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Validate and decode JWT token
   */
  async validateToken(token: string): Promise<TokenPayload> {
    try {
      const payload = this.jwtService.verify(token) as TokenPayload;

      // Check if user still exists
      const authUser = await this.prisma.authUser.findUnique({
        where: { id: payload.sub },
      });

      if (!authUser) {
        throw new UnauthorizedException("User not found");
      }

      return payload;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }

  /**
   * Validate refresh token from database
   */
  async validateRefreshToken(refreshToken: string) {
    let payload;
    try {
      payload = this.jwtService.verify(refreshToken);
    } catch (error) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException("Refresh token expired or invalid");
    }

    return storedToken;
  }

  /**
   * Store refresh token in database
   */
  private async storeRefreshToken(
    refreshToken: string,
    authUserId: string
  ): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: authUserId,
        expiresAt,
      },
    });
  }

  /**
   * Invalidate all refresh tokens for a user
   */
  async invalidateAllUserTokens(authUserId: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: { userId: authUserId },
    });
  }

  /**
   * Invalidate specific refresh token
   */
  async invalidateRefreshToken(refreshToken: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
  }

  /**
   * Clean up expired tokens (can be called by cron job)
   */
  async cleanupExpiredTokens(): Promise<number> {
    const result = await this.prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    return result.count;
  }
}
