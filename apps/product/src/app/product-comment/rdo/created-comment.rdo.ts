import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';


export class CreatedCommentRdo {
  @ApiProperty({
    description: 'The text of the comment.',
    required: true,
  })
  @Expose()
  public commentText: string;

  @ApiProperty({
    description: 'The id of the post for comment.',
    required: true,
  })
  @Expose()
  public postId: number;

  @ApiProperty({
    description: 'The commentId.',

  })
  @Expose()
  public commentId: string;

  @ApiProperty({
    description: 'The userId.',

  })
  @Expose()
  public userId: string;

}
