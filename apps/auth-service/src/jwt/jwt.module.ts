import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt.service';
import { PrismaModule } from '../database/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     JwtModule.register({
//       global: true,
//       secret: process.env.JWT_SECRET || 'less_secret',
//       signOptions: { expiresIn: '7d' },
//     }),
//     PrismaModule,
//   ],
//   providers: [JwtTokenService],
//   exports: [JwtTokenService, JwtModule],
// })
// export class JwtWrapperModule {}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') || 'less_secret',
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN') || '1d',
        },
      }),
    }),
    PrismaModule,
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService, JwtModule],
})
export class JwtWrapperModule {}
