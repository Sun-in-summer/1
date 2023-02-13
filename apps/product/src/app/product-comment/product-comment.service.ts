import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Comment } from '@guitar/shared-types';
import { ProductCommentRepository} from './product-comment.repository'
import { ProductCommentEntity } from './product-comment.entity';
import {  CreateCommentDto } from './dto/create-comment.dto';
import { CommentError } from './product-comment.enum';


@Injectable()
export class ProductCommentService {

  constructor (
    private readonly productCommentRepository: ProductCommentRepository
  ){}

  async create(dto: CreateCommentDto, userId: string): Promise <Comment> {

    const commentEntity = new ProductCommentEntity({...dto, userId});

    return this.productCommentRepository.create(commentEntity);

  }

  async update (commentId: number,  dto: CreateCommentDto, userId: string ): Promise <Comment> {
     const existComment = await this.productCommentRepository.findById(commentId);

          if(!existComment) {
      throw new NotFoundException(CommentError.NotFound)
     }

     if (existComment.userId !== userId) {
      throw new UnauthorizedException(CommentError.NoPermission);
     }

     const updatedData =await new ProductCommentEntity({...existComment, ...dto});

     return this.productCommentRepository.update(commentId, updatedData);

  }

  async delete (commentId: number, userId: string): Promise <void> {
    const existComment = await this.productCommentRepository.findById(commentId);
    if (!existComment) {
     throw new NotFoundException(CommentError.NotFound);
    }
     if (existComment.userId !== userId ){
      throw new UnauthorizedException(CommentError.NoPermission);
    }
    this.productCommentRepository.destroy(commentId);
  }




  async getComment(commentId: number): Promise <Comment> {
    return  this.productCommentRepository.findById(commentId);

  }

  async getCommentsByPostId(postId: number, page?: number, commentsCount?: number) : Promise <Comment[]> {
    return  this.productCommentRepository.find(postId, page, commentsCount);

  }

  async deleteByPostId (postId: number): Promise <void> {
    const comments = await this.getCommentsByPostId(postId);
    comments.forEach((comment) => this.productCommentRepository.destroy(comment.commentId));
  }

  async updateComment(commentId: number, dto: CreateCommentDto) : Promise <Comment> {
   const existComment = await this.productCommentRepository.findById(commentId);

    if (!existComment) {
     throw new NotFoundException(CommentError.NotFound);
    }
    if (existComment.userId !== dto.userId ){
      throw new UnauthorizedException(CommentError.NoPermission);
    }
      return this.productCommentRepository.update(commentId, new ProductCommentEntity(dto));
  }

}

