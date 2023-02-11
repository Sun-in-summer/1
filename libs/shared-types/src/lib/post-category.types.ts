export const PostCategoryObject = {
  Video: 'Video',
  Text: 'Text',
  Quote: 'Quote',
  Photo: 'Photo',
  Link: 'Link'
};

export type PostCategory = keyof typeof PostCategoryObject;
