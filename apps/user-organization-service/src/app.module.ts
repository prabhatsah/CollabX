import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { SERVICE_NAMES } from "@app/common";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.development", ".env"],
    }),
    ClientsModule.register([
      {
        name: SERVICE_NAMES.AUTH_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST || "localhost",
          port: 3001,
        },
      },
    ]),
    UserOrgModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
