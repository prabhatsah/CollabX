import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PROTO_PATHS, SERVICE_NAMES } from '@app/common';
import { UserOrgController } from './user-org.controller';
import { UserOrgService } from './user-org.service';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [
    //client to call gRPC endpoints of user-org-service
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
    forwardRef(() => SessionModule),
  ],
  controllers: [UserOrgController],
  providers: [UserOrgService],
  exports: [UserOrgService],
})
export class UserOrgModule {}
