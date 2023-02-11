
import { PostCategory } from '../post-category.types';

export type PostQuote = {
  postId?: number
  quoteText: string
  quoteAuthor: string
  postCategory: PostCategory;
}

export type PostQuoteWithoutPostCategory = Omit<PostQuote, 'postCategory'>
