import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { createClient, RedisClientType } from 'redis';

@Global()
@Module({
  providers: [
    // {
    //   provide: 'REDIS_CLIENT',
    //   useFactory: async () => {
    //     const client = new Redis({
    //       host: process.env.REDIS_HOST || 'redis',
    //       port: Number(process.env.REDIS_PORT) || 6379,
    //     });

    //     client.on('connect', () => {
    //       console.log('✅ Connected to Redis');
    //     });

    //     client.on('error', (err) => {
    //       console.error('❌ Redis error:', err);
    //     });

    //     return client;
    //   },
    // },

    {
      provide: 'REDIS_CLIENT',
      useFactory: async (): Promise<RedisClientType> => {
        // Parse env vars with fallback values
        const host = process.env.REDIS_HOST || 'localhost';
        const port = Number(process.env.REDIS_PORT) || 6379;
        const username = process.env.REDIS_USERNAME || 'default';
        const password = process.env.REDIS_PASSWORD || 'default';

        // Create typed Redis client
        const client: RedisClientType = createClient({
          username,
          password,
          socket: {
            host,
            port,
          },
        });

        // const client = createClient({
        //   username: process.env.REDIS_USERNAME || 'default',
        //   password: process.env.REDIS_PASSWORD || 'default',
        //   socket: {
        //     host: process.env.REDIS_HOST || 'localhost',
        //     port: process.env.REDIS_PORT || '6379',
        //   },
        // });

        // Error handler
        client.on('error', (err: unknown) => {
          console.error('Redis Client Error', err);
        });

        await client.connect();
        console.log('✅ Connected to Cloud Redis');

        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
