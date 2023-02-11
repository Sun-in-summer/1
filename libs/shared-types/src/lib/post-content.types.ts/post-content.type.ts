// import { PostCategory } from '../post-category.types';

import { PostLink } from './post-link.type';
import { PostPhoto } from './post-photo.type';
import { PostQuote } from './post-quote.type';
import { PostText } from './post-text.type';
import { PostVideo } from './post-video.type';


export type PostContent  = PostVideo | PostLink | PostPhoto | PostQuote | PostText
