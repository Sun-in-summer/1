import { Module } from '@nestjs/common';
import { ShopUserModule } from '../shop-user/shop-user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { getJwtConfig } from '../../config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule } from '@nestjs/microservices';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';
import { RABBITMQ_SERVICE } from './auth.constant';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';

@Module({
  imports: [
    ShopUserModule,
    PassportModule,
    RefreshTokenModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
      }
  ])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    JwtRefreshStrategy
  ],
})
export class AuthModule {}
