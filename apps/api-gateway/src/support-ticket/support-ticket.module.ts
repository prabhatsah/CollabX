import { Module } from '@nestjs/common';
import { SupportTicketController } from './support-ticket.controller';
import { SupportTicketService } from './support-ticket.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  SUPPORT_TICKET_SERVICE_NAME,
  SUPPORTTICKET_PACKAGE_NAME,
} from '@app/common/proto/support-ticket';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PROTO_PATHS } from '@app/common';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SUPPORT_TICKET_SERVICE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: SUPPORTTICKET_PACKAGE_NAME,
            protoPath: PROTO_PATHS.SUPPORT_TICKET,
            url: `${configService.get<string>('SUPPORT_TICKET_GRPC_SERVICE_HOST')}:${configService.get<number>('SUPPORT_TICKET_GRPC_SERVICE_PORT')}`,
          },
        }),
      },
    ]),
  ],
  controllers: [SupportTicketController],
  providers: [SupportTicketService],
})
export class SupportTicketModule {}
