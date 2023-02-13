import { CRUDRepository } from '@guitar/core';
import { Comment } from '@guitar/shared-types';
import { ProductCommentEntity } from './product-comment.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductCommentRepository implements CRUDRepository<ProductCommentEntity, number, Comment> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: ProductCommentEntity): Promise<Comment> {
    const {commentText, productId, userId, pros, cons} = item.toObject();
    return this.prisma.comment.create({
      data: {
        commentText,
        userId,
        pros,
        cons,
        product: {
          connect: { id: productId }
        }
      }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id,
      }
    });
  }

  public findById(id: number): Promise<Comment | null> {
    return this.prisma.comment.findFirst({
      where: {
        id
      }
    });
  }

  public find(id: number, page?: number, commentsCount?: number): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {
        productId: id
      },
      take: commentsCount,
      skip: (page-1)*commentsCount,
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  public update(id: number, item: ProductCommentEntity): Promise<Comment> {
    return this.prisma.comment.update({
      where: {
        id
      },
      data: { ...item.toObject(), id }
    });
  }
}
