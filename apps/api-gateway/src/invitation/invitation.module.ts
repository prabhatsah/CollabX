import { Module } from '@nestjs/common';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PROTO_PATHS, SERVICE_NAMES } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAMES.USER_ORG_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package:
              configService.get<string>('USER_ORG_GRPC_PACKAGE') || 'userorg',
            protoPath: PROTO_PATHS.USER_ORG,
            url: `${configService.get<string>('USER_ORG_GRPC_SERVICE_HOST')}:${configService.get<number>('USER_ORG_GRPC_SERVICE_PORT')}`,
          },
        }),
      },
    ]),
    AuthModule,
  ],
  controllers: [InvitationController],
  providers: [InvitationService],
})
export class InvitationModule {}
