import { Module } from '@nestjs/common';
import { ProductCommentRepository } from './product-comment.repository';
import { ProductCommentController } from './product-comment.controller';
import { ProductCommentService } from './product-comment.service';

@Module({
  controllers: [ProductCommentController],
  providers: [ProductCommentService, ProductCommentRepository],
  exports: [ProductCommentService, ProductCommentRepository]
})
export class ProductCommentModule {}
