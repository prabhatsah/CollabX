import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { UserOrgService } from '../user-org/user-org.service';
import { AuthService } from '../auth/auth.service';
import { VerifyTokenRequest } from '@app/common';
import { ApiResponseDto } from '@app/common/dto/response.dto';
import Redis from 'ioredis';
import { GetSessionResponse } from '@app/common/proto/user-org';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(
    @Inject(forwardRef(() => UserOrgService))
    private readonly userOrgService: UserOrgService,
    private readonly authService: AuthService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  private getRedisKey(userId: string) {
    return `session:${userId}`;
  }

  async getSession(request: { accessToken: string }) {
    // Verify access token
    const authRes = await this.authService.verifyToken(request);
    this.logger.log(`Access token valid: ${authRes.valid}`);

    const redisKey = this.getRedisKey(authRes.authUserId);

    // Check if session cached
    const cached = await this.redis.get(redisKey);
    if (cached) {
      this.logger.log(`Serving session from Redis for ${authRes.authUserId}`);
      return ApiResponseDto.success(
        JSON.parse(cached),
        'Session fetched (cached)',
      );
    }

    // Fetch from user-org service
    const userSession = await this.userOrgService.getSession({
      authUserId: authRes.authUserId,
    });

    this.logger.log(
      `Session fetched from user-org: ${userSession.userInfo?.email}`,
    );

    // Step 4: Cache in Redis with TTL 60 min
    await this.redis.set(redisKey, JSON.stringify(userSession), 'EX', 60 * 50);

    return ApiResponseDto.success(userSession, 'Session fetched');
  }

  async updateCurrOrgByToken(accessToken: string, orgId: string) {
    const { authUserId } = await this.authService.verifyToken({ accessToken });

    return await this.updateCurrentOrg(authUserId, orgId);
  }

  async updateCurrentOrg(
    userId: string,
    orgId: string,
    updateDefaultOrg: boolean,
  ) {
    const redisKey = this.getRedisKey(userId);

    const cached = await this.redis.get(redisKey);
    if (!cached) {
      throw new Error('No session found in cache');
    }

    const session = JSON.parse(cached) as GetSessionResponse;

    // Find the organization by ID
    const newCurrentOrg = session.organizations.find((org) => org.id === orgId);

    if (!newCurrentOrg) {
      this.logger.error(`User doesn't belong to this organziation: ${orgId}`);

      throw new RpcException({
        code: status.NOT_FOUND,
        message: "User doesn't belong to this organziation",
      });
    }

    session.currentOrg = newCurrentOrg;

    // Don't update defaultOrg when only switching org
    if (updateDefaultOrg) session.defaultOrg = newCurrentOrg;

    await this.redis.set(redisKey, JSON.stringify(session), 'EX', 60 * 15);

    return ApiResponseDto.success(session, 'Organization switched');
  }

  // Clear session by token
  async clearSessionByToken(accessToken: string) {
    const { authUserId } = await this.authService.verifyToken({ accessToken });

    await this.clearSession(authUserId);
  }

  // Clear session by auth user id
  async clearSession(authUserId: string) {
    const redisKey = this.getRedisKey(authUserId);
    await this.redis.del(redisKey);
  }
}
