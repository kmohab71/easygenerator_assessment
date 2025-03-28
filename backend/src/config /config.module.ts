import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            validationSchema: Joi.object({
                PORT: Joi.number().default(3000),
                DATABASE_URL: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION: Joi.string().default('15m'),
                JWT_REFRESH_SECRET: Joi.string().required(),
                JWT_REFRESH_EXPIRATION: Joi.string().default('7d'),
            }),
        }),
    ],
})
export class AppConfigModule {}