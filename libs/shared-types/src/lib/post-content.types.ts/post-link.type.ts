import { PostCategory } from '../post-category.types';

export type  PostLink  = {
  postId?: number;
  linkURL: string;
  linkDescription?: string | null;
  postCategory: PostCategory;
}

export type PostLinkWithoutPostCategory = Omit<PostLink, 'postCategory'>
