import { UnauthorizedException } from '@nestjs/common';
import { Post } from '@guitar/shared-types';

export const validatePostUserId = (post: Post, user ) => {

  if (post.userId !== user.sub) {
    throw new UnauthorizedException()
  }
}
