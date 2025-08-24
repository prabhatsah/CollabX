import { PROTO_PATHS, SERVICE_NAMES } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAMES.AUDIT_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: configService.get<string>('AUDIT_GRPC_PACKAGE') || 'audit',
            protoPath: PROTO_PATHS.AUDIT,
            url: `${configService.get<string>('AUDIT_GRPC_SERVICE_HOST')}:${configService.get<string>('AUDIT_GRPC_SERVICE_PORT')}`,
          },
        }),
      },
    ]),
  ],
  controllers: [AuditController],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}
