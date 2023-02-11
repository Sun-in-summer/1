import { PostCategory } from '../post-category.types';

export type PostText ={
  postId?: number
  postTitle: string
  previewText: string
  postText: string
  postCategory: PostCategory;
}

export type PostTextWithoutPostCategory = Omit<PostText, 'postCategory'>
