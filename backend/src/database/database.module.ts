import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // uri: configService.get<string>('DATABASE_URL'),
        uri:'mongodb://mongodb:27017/nest-auth'
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}