import { Module } from '@nestjs/common';
import { ProductCommentModule } from '../product-comment/product-comment.module';
import { ProductItemRepository } from './product-item.repository';
import { ProductItemController } from './product-item.controller';
import { ProductItemService } from './product-item.service';
import { RABBITMQ_SERVICE } from './product-item.constant';
import {ClientsModule} from '@nestjs/microservices';
import {ConfigService} from '@nestjs/config';
import { getRabbitMqConfig } from '../config/rabbitmq.config';

@Module({
  controllers: [ProductItemController],
  providers: [ProductItemService, ProductItemRepository],
  imports: [
    ProductCommentModule,
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      },
      ])
  ],
  exports: [ProductItemRepository]

})
export class ProductItemModule {}
