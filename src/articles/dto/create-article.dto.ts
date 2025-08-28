import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    description: 'article title',
    example: 'my first article',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'user content',
    example: 'this is the content of the article',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
