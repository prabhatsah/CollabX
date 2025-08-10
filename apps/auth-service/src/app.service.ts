import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class AppService {
  private readonly logger = new Logger("Started auth-service");

  healthCheck() {
    const healthInfo = { status: "ok", timestamp: new Date().toISOString() };
    this.logger.log(`Health check: ${JSON.stringify(healthInfo)}`);
    return healthInfo;
  }
}
