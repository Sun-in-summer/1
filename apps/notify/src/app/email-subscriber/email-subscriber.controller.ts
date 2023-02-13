import { Controller} from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent } from '@guitar/shared-types';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { NewPostsDto } from './dto/new-posts.dto';




@Controller()
export class EmailSubscriberController {

  constructor (
    private readonly subscriberService: EmailSubscriberService,

  ){}

  @EventPattern({cmd: CommandEvent.AddSubscriber})
  public async create (subscriber: CreateSubscriberDto) {
    return this.subscriberService.addSubscriber(subscriber);
  }

  @EventPattern({cmd: CommandEvent.AddPosts})
  public async addPosts(dto: NewPostsDto) {
    return this.subscriberService.sendNewPosts(dto);
  }

  @EventPattern({cmd: CommandEvent.DeleteSubscriber})
  public async deleteSubscriber(subscriber: CreateSubscriberDto) {
    return this.subscriberService.informSubscriberAboutDeleting(subscriber);
  }

}

