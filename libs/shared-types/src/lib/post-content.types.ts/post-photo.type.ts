import { PostCategory } from '../post-category.types';

export type PostPhoto= {
  postId?: number
  photoLink: string
  postCategory: PostCategory;
}

export type PostPhotoWithoutPostCategory = Omit<PostPhoto, 'postCategory'>

