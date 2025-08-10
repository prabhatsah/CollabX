import { NestFactory } from "@nestjs/core";
import { UserOrganizationServiceModule } from "./user-organization-service.module";

async function bootstrap() {
  const app = await NestFactory.create(UserOrganizationServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
