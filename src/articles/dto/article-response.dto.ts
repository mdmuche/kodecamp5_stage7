import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ArticleResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  content: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<ArticleResponseDto>) {
    Object.assign(this, partial);
  }
}
