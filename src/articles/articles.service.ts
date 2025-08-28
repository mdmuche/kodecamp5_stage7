import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  createArticle(data: CreateArticleDto) {
    return this.prisma.article.create({ data });
  }

  findAll() {
    return this.prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Article with id: ${id} not found`);
    }
    return article;
  }

  async updateArticle(id: string, data: UpdateArticleDto) {
    await this.findById(id); // throws 404 if not exists
    return this.prisma.article.update({ where: { id }, data });
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
