import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { PROTO_PATHS } from '@app/common';

dotenv.config({ path: '.env' });

async function bootstrap() {
  const PORT = process.env.AUTH_GRPC_SERVICE_PORT || '3001';
  const AUTH_GRPC_PACKAGE = process.env.AUTH_GRPC_PACKAGE || 'auth';

  //Exposing gRPC server on port and package
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: PROTO_PATHS.AUTH, // join(__dirname, '../auth.proto'),
        package: AUTH_GRPC_PACKAGE,
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

  console.log(`🔐 Auth Service service is up and running on port: ${PORT}`);
}
bootstrap();
