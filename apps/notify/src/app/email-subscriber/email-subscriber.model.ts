import  {Document} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subscriber } from '@guitar/shared-types';


const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers'

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements Subscriber {
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
    type: String,
  })
  userId: string

  @Prop({
    type: Boolean,
  })
  isSubscribed: boolean


}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);

