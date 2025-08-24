import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PROTO_PATHS, SERVICE_NAMES } from '@app/common';

@Module({
  imports: [
    //client to call gRPC endpoints of auth-service
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAMES.AUTH_SERVICE,
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
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
