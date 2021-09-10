import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    PostsModule,
    ConfigModule.forRoot({
      validationSchema: {
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        PORT: Joi.number(),
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
