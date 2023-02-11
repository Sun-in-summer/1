import { PostCategory } from '../post-category.types';

export type PostVideo ={
  postId?: number
  postTitle: string
  videoLink: string
  postCategory: PostCategory;
}

export type PostVideoWithoutPostCategory = Omit<PostVideo, 'postCategory'>
