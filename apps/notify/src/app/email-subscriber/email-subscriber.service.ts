import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EMAIL_SUBSCRIBER_EXISTS, EMAIL_SUBSCRIBER_NOT_EXIST } from './email-subscriber.constant';
import { MailService } from '../mail/mail.service';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { NewPostsDto } from './dto/new-posts.dto';


@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly mailService: MailService,
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email, isSubscribed } = subscriber;

    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      throw new Error(EMAIL_SUBSCRIBER_EXISTS);
    }

    if (!isSubscribed) {
      return;
    }

    this.mailService.sendNotifyNewSubscriber(subscriber);

    return this.emailSubscriberRepository
      .create(new EmailSubscriberEntity(subscriber));
  }

   public async sendNewPosts(dto: NewPostsDto) {
    const users = await this.emailSubscriberRepository.find();
    const emails = users.map((user) => user.email);
    this.mailService.sendNewPostNotification(emails, dto);
  }


  public async informSubscriberAboutDeleting(subscriber: CreateSubscriberDto){
    const { email, isSubscribed } = subscriber;

    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

     if (!existsSubscriber) {
      throw new Error(EMAIL_SUBSCRIBER_NOT_EXIST);
    }

    if (isSubscribed) {
      return;
    }

    this.mailService.informSubscriber(subscriber);

  }


}
