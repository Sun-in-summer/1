
import {Comment} from '@guitar/shared-types';

export class ProductCommentEntity implements  Comment {
  public commentText: string;
  public productId: number;
  public userId: string;
  public commentId?: number;
  public pros: string;
  public cons: string;

  constructor (productComment: Comment) {
    this.fillEntity(productComment);

  }

  public toObject() {
    return {...this};
  }



  public fillEntity(productComment: Comment) {
    this.commentText = productComment.commentText,
    this.productId = productComment.productId,
    this.userId = productComment.userId,
    this.pros = productComment.pros,
    this.cons = productComment.cons,
    this.commentId = productComment.commentId
  }

}
