import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a new article',
  })
  createArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.createArticle(createArticleDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retrieve all articles',
  })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Retrieve an article by ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found',
  })
  findById(@Param('id') id: string) {
    return this.articlesService.findById(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Article not found',
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found',
  })
  updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.updateArticle(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Delete an article',
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found',
  })
  deleteArticle(@Param('id') id: string) {
    return this.articlesService.deleteArticle(id);
  }
}
