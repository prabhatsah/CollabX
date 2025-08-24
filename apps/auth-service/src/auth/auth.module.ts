import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../database/prisma.module';
import { PasswordModule } from '../password/password.module';
import { JwtWrapperModule } from '../jwt/jwt.module';
import { KafkaModule } from '../kafka/kafka.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PROTO_PATHS, SERVICE_NAMES } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { USER_ORG_SERVICE_NAME } from '@app/common/proto/user-org';

@Module({
  imports: [
    PrismaModule,
    PasswordModule,
    JwtWrapperModule,
    KafkaModule,
    ClientsModule.registerAsync([
      {
        name: USER_ORG_SERVICE_NAME,
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
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
