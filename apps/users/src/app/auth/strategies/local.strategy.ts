import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ShopUserEntity } from '../../shop-user/shop-user.entity';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(
    private authService: AuthService
  ){
    super({
      usernameField: USERNAME_FIELD_NAME
    });
  }

  public async validate(email:string, password: string) : Promise<ShopUserEntity>{
    return this.authService.verifyUser({email, password});
  }
}
