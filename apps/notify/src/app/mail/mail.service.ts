import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { Subscriber } from '@guitar/shared-types';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, EMAIL_ADD_POST_SUBJECT, EMAIL_DELETE_SUBSCRIBER_SUBJECT } from './mail.constant';
import { NewPostsDto } from '../email-subscriber/dto/new-posts.dto';


@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
  ) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber)  {

    await this.mailerService.sendMail({
        to: subscriber.email ,
        subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
        template: './add-subscriber',
        context: {
          user: `${subscriber.firstname} ${subscriber.lastname}`,
          email: `${subscriber.email}`
        }

    })
 }

  public async sendNewPostNotification(emails: string[], dto: NewPostsDto) {
    const ids =[...dto.postIds]
    await this.mailerService.sendMail({
      to: emails,
      subject: EMAIL_ADD_POST_SUBJECT,
      template: './add-post',
      context: {
        posts: `${ids} `
      }
    })
  }

  public async informSubscriber(subscriber: Subscriber)  {

    await this.mailerService.sendMail({
        to: subscriber.email ,
        subject: EMAIL_DELETE_SUBSCRIBER_SUBJECT,
        template: './delete-subscriber',
        context: {
          user: `${subscriber.firstname} ${subscriber.lastname}`,
          email: `${subscriber.email}`
        }

    })
 }
}
