import { Module } from '@nestjs/common';
import { ShopUserModule } from './shop-user/shop-user.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import databaseConfig   from '../config/database.config';
import envSchema from './env.schema';
import {MongooseModule} from '@nestjs/mongoose';
import { getMongoDbConfig } from '../config/mongodb.config';
import { jwtConfig } from '../config/jwt.config';
import { rabbitMqOptions } from '../config/rabbitmq.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtConfig, rabbitMqOptions],
      validationSchema: envSchema
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig()
    ),
    ShopUserModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
