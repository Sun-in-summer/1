import {User, UserRole} from '@guitar/shared-types';
import {genSalt, compare, hash} from 'bcrypt';
import { SALT_ROUNDS } from './shop-user.constant';



export class ShopUserEntity implements User {
  public _id: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public birthDate: Date;
  public avatar: string;
  public role: UserRole;
  public passwordHash: string;
  public isSubscribed: boolean;

  constructor (shopUser: User) {
    this.fillEntity(shopUser);
  }

  public toObject() {
    return {...this};
  }

  public async setPassword(password: string) : Promise <ShopUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt)
    return this;
  }

  public async comparePassword( password: string) : Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public fillEntity(shopUser: User) {
    this._id =shopUser._id;
    this.avatar = shopUser.avatar;
    this.birthDate =shopUser.birthDate;
    this.email =shopUser.email;
    this.firstname=shopUser.firstname;
    this.lastname = shopUser.lastname;
    this.passwordHash = shopUser.passwordHash;
    this.role = shopUser.role;
    this.isSubscribed = shopUser.isSubscribed;
  }
}
