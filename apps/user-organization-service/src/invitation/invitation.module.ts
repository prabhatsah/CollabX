import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';
import { KafkaModule } from '../kafka/kafka.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, PROTO_PATHS } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    KafkaModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: configService.get<string>('AUTH_GRPC_PACKAGE') || 'auth',
            protoPath: PROTO_PATHS.AUTH,
            url: `${configService.get<string>('AUTH_GRPC_SERVICE_HOST')}:${configService.get<number>('AUTH_GRPC_SERVICE_PORT')}`,
          },
        }),
      },
    ]),
  ],
  controllers: [InvitationController],
  providers: [InvitationService],
})
export class InvitationModule {}
