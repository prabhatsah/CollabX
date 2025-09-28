import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { SessionMiddleware } from './middleware/session.middleware';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [SessionModule],
  providers: [SessionMiddleware],
})
export class CommonModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .exclude(
        { path: 'auth/(.*)', method: RequestMethod.ALL },
        { path: 'signup', method: RequestMethod.POST },
        { path: 'healthCheck', method: RequestMethod.GET },
        { path: 'accept-invitation', method: RequestMethod.POST },
      )
      .forRoutes('*'); // everything else is protected
  }
}
