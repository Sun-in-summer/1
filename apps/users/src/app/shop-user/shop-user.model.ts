import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserRole } from '@guitar/shared-types';
import  {Document} from 'mongoose';



@Schema({
  collection: 'users',
})
export class ShopUserModel extends Document implements User {
   @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  firstname: string;

  @Prop({
    required: true,
  })
  lastname: string;

  @Prop({
    required: true,
  })
  birthDate: Date;

  @Prop()
  avatar: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole

  @Prop({
    required: true,
  })
  passwordHash: string;

  @Prop({
    required: true,
    type: Boolean,
    default: true,
  })
  isSubscribed: boolean;




}

export const ShopUserSchema = SchemaFactory.createForClass(ShopUserModel);

