import { PostCategory } from './post-category.types';
import { Comment } from './comment.interface';
import { PostLink, PostLinkWithoutPostCategory } from './post-content.types.ts/post-link.type';
import { PostPhoto, PostPhotoWithoutPostCategory } from './post-content.types.ts/post-photo.type';
import { PostQuote, PostQuoteWithoutPostCategory } from './post-content.types.ts/post-quote.type';
import { PostText, PostTextWithoutPostCategory } from './post-content.types.ts/post-text.type';
import { PostVideo, PostVideoWithoutPostCategory } from './post-content.types.ts/post-video.type';
import { PostContent } from './post-content.types.ts/post-content.type';


export interface Post {
  postId?: number;
  originalPostId?: number;
  userId: string;
  originalUserId?: string;
  postCategory: PostCategory ;
  isDraft: boolean;
  isRepost?: boolean;
  tagsList?: string[];
  commentsCount: number;
  comments?: Comment[];
  repostsCount: number;
  likes: string[];
  likesCount: number;
  createdAt?: Date;
  publishedAt?: Date;
  updatedAt?: Date;
  postContent?: PostContent;
}

export interface ExtendedPost extends Post {
  link?: PostLink | PostLinkWithoutPostCategory
  photo?: PostPhoto | PostPhotoWithoutPostCategory
  quote?: PostQuote |PostQuoteWithoutPostCategory
  text?: PostText |PostTextWithoutPostCategory
  video?: PostVideo | PostVideoWithoutPostCategory
}


