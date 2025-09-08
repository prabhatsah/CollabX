import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GrpcToHttpExceptionFilter } from './common/filters/grpc-to-http.filter';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const PORT = configService.get<string>('API_GATEWAY_PORT') || 3000;
  const FRONTEND_URL =
    configService.get<string>('NEXT_FRONTEND_URL') || 'http://localhost:5555';

  app.useGlobalFilters(new GrpcToHttpExceptionFilter());

  app.use(cookieParser.default());

  // Enable CORS for your frontend origin
  app.enableCors({
    origin: FRONTEND_URL, //frontend url
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip properties not in DTO
      forbidNonWhitelisted: true, // throw error if extra properties exist
      transform: true, // transform payloads to DTO instances
      // exceptionFactory: (errors) => {
      //   return new BadRequestException(errors);
      // },
    }),
  );

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('CollabX API')
    .setDescription('API documentation for CollabX services')
    .setVersion('1.0')
    .addBearerAuth() // enables JWT auth header
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT);

  console.log(`🪟 Api Gateway Service running on port: ${PORT}...`);
}
bootstrap();
