import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleResponseDto } from './dto/article-response.dto';
import { ArticlesQueryDto } from './dto/articles-query.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async createArticle(createArticle: CreateArticleDto) {
    const article = await this.prisma.article.create({
      data: {
        ...createArticle,
      },
    });
    return new ArticleResponseDto(article);
  }

  async findAll(articlesQueryDto: ArticlesQueryDto) {
    function buildPaginationArgs(query: ArticlesQueryDto) {
      const page = Number(query?.page ?? 1);
      const take = Number(query?.limit ?? 10);
      const skip = (page - 1) * take;
      return { take, skip };
    }
    const articles = await this.prisma.article.findMany({
      ...buildPaginationArgs(articlesQueryDto),
    });
    return articles.map((article) => new ArticleResponseDto(article));
  }

  async findById(id: string) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Article with id: ${id} not found`);
    }
    return new ArticleResponseDto(article);
  }

  async updateArticle(id: string, updateArticleDto: UpdateArticleDto) {
    await this.findById(id); // throws 404 if not exists
    const updatedArticle = await this.prisma.article.update({
      where: { id },
      data: {
        ...updateArticleDto,
      },
    });
    return new ArticleResponseDto(updatedArticle);
  }

  async deleteArticle(id: string) {
    await this.findById(id); // throws 404 if not exists
    await this.prisma.article.delete({ where: { id } });
    return {
      success: true,
      message: `Article with id: ${id} deleted successfully`,
    };
  }
}
