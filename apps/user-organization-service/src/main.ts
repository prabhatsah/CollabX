import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {
  BaseRpcExceptionFilter,
  MicroserviceOptions,
  Transport,
} from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "@app/common";

async function bootstrap() {
  // Create HTTP application
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Microservice setup
  const brokerEnv = configService.get<string>("KAFKA_BROKERS");
  if (!brokerEnv) {
    throw new Error("KAFKA_BROKERS env variable is missing");
  }

  const KAFKA_BROKERS = brokerEnv.split(",").map((b) => b.trim());
  console.log("KAFKA_BROKERS", KAFKA_BROKERS);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: "user-organization-service",
        brokers: KAFKA_BROKERS,
      },
      consumer: {
        groupId: "user-organization-group",
      },
    },
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // Global filters
  app.useGlobalFilters(new HttpExceptionFilter(), new BaseRpcExceptionFilter());

  // Enable CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:3000",
    ],
    credentials: true,
  });

  // Start all microservices
  await app.startAllMicroservices();

  const port = process.env.USER_ORG_SERVICE_PORT || 3009;
  await app.listen(port);

  console.log(`🔐 User Organization Service running on port ${port}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle("User Organization Service")
    .setDescription("User Organization microservice")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);
}
bootstrap();
