import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SUPPORTTICKET_PACKAGE_NAME } from '@app/common/proto/support-ticket';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PROTO_PATHS } from '@app/common';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);

  const PORT = configService.get<string>('SUPPORT_TICKET_GRPC_SERVICE_PORT');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: PROTO_PATHS.SUPPORT_TICKET,
        package: SUPPORTTICKET_PACKAGE_NAME,
        url: `0.0.0.0:${PORT}`,
      },
    },
  );

  await app.listen();

  console.log(
    `🎟️ Support Ticket Service is up and running on gRPC port: ${PORT}, package: ${SUPPORTTICKET_PACKAGE_NAME}`,
  );
}
bootstrap();
