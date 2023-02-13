export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');
export const USER_EMAIL_NOT_VALID = 'The email is not valid';



export const SortTypeMap = {
  'likes': {
    likes: 'desc'
  },
  'comments': {
    comments: {
      _count: 'desc'
    }
  },
  'date': {
    date: 'desc'
  }
}

