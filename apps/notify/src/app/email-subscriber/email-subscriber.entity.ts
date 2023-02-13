import { Entity } from '@guitar/core';
import { Subscriber } from '@guitar/shared-types';


export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public id: string;
  public firstname: string;
  public lastname: string;
  public email: string;
  public userId: string;
  public isSubscribed: boolean;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.id = entity.id ?? '';
    this.firstname = entity.firstname;
    this.lastname = entity.lastname;
    this.email = entity.email;
    this.userId = entity.userId;
    this.isSubscribed = entity.isSubscribed;

  }

  public toObject():EmailSubscriberEntity {
    return {...this};
  }
}
