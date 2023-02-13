import { ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';


export const jwtOptions = registerAs('jwt', () => ({
  accessSecret: process.env.JWT_AT_SECRET,
}));


export async function getJWTConfig(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwt.accessSecret'),
    signOptions: {expiresIn: process.env.JWT_AT_EXPIRES_IN, algorithm: 'HS256'},
  };
}
