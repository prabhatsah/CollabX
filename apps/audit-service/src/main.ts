import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PROTO_PATHS } from '@app/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Create a temporary application context to resolve ConfigService
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);

  const PORT = configService.get<string>('AUDIT_GRPC_SERVICE_PORT');
  const AUDIT_GRPC_PACKAGE =
    configService.get<string>('AUDIT_GRPC_PACKAGE') || 'audit';

  // Now create the microservice with correct config
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: PROTO_PATHS.AUDIT,
        package: AUDIT_GRPC_PACKAGE,
        url: `0.0.0.0:${PORT}`,
      },
    },
  );

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen();

  console.log(
    `📃 Audit Service is up and running on gRPC port: ${PORT}, package: ${AUDIT_GRPC_PACKAGE}`,
  );
}

bootstrap();
