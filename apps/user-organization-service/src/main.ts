import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { PROTO_PATHS } from '@app/common';

dotenv.config({ path: '.env' });

async function bootstrap() {
  const PORT = process.env.USER_ORG_GRPC_SERVICE_PORT || 3002;
  const USER_ORG_GRPC_PACKAGE = process.env.UER_ORG_GRPC_PACKAGE || 'userorg';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: PROTO_PATHS.USER_ORG,
        package: USER_ORG_GRPC_PACKAGE,
        url: `0.0.0.0:${PORT}`,
      },
    },
  );

  //Global velidation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen();
  console.log(
    `🔐 User-Organization service is up and running on port: ${PORT}...`,
  );
}
bootstrap();
