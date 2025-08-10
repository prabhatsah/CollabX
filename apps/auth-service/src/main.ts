import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle("Auth Service")
    .setDescription("Authentication microservice")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

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
        clientId: "auth-service",
        brokers: KAFKA_BROKERS,
      },
      consumer: {
        groupId: "auth-service-group",
      },
    },
  });

  await app.startAllMicroservices();

  const port = process.env.AUTH_SERVICE_PORT || 3001;
  await app.listen(port);

  console.log(`🔐 Auth Service running on port ${port}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
}
bootstrap();
