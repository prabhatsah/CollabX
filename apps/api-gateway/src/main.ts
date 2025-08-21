import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GrpcToHttpExceptionFilter } from './common/filters/grpc-to-http.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const PORT = configService.get<string>('API_GATEWAY_PORT') || 3000;

  app.useGlobalFilters(new GrpcToHttpExceptionFilter());

  app.use(cookieParser.default());

  // Enable CORS for your frontend origin
  app.enableCors({
    origin: 'http://localhost:5555', //frontend url
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(PORT);

  console.log(`🪟 Api Gateway Service running on port: ${PORT}...`);
}
bootstrap();
