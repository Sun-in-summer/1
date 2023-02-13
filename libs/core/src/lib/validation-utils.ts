import { UnauthorizedException } from '@nestjs/common';
import { Product } from '@guitar/shared-types';

export const validateProductUserId = (product: Product, user ) => {

  if (product.userId !== user.sub) {
    throw new UnauthorizedException()
  }
}
