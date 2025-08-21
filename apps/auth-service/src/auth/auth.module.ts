import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../database/prisma.module';
import { PasswordModule } from '../password/password.module';
import { JwtWrapperModule } from '../jwt/jwt.module';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [PrismaModule, PasswordModule, JwtWrapperModule, KafkaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
