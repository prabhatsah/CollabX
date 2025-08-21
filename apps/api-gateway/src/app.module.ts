import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SignupModule } from './signup/signup.module';
import { HealthModule } from './health/health.module';
import { SessionModule } from './session/session.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { SessionService } from './session/session.service';
import { UserOrgService } from './user-org/user-org.service';
import { AuthService } from './auth/auth.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    SessionModule,
    SignupModule,
    HealthModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .exclude(
//         { path: 'auth/(.*)', method: RequestMethod.ALL },
//         { path: 'signup', method: RequestMethod.POST },
//         { path: 'healthCheck', method: RequestMethod.GET },
//         { path: 'session/(.*)', method: RequestMethod.ALL },
//       )
//       .forRoutes('*');
//   }
// }
export class AppModule {}
