import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ArticlesQueryDto {
  @ApiProperty({
    description: 'Search term for title and content',
    required: false,
    example: 'meeting',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Page number for pagination',
    required: false,
    example: '1',
  })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    example: '10',
  })
  @IsOptional()
  @IsNumberString()
  limit?: string;
}
