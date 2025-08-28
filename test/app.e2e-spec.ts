interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';

describe('Articles E2E', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();

    prisma = app.get(PrismaService);

    await prisma.clearDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /articles -> creates article', async () => {
    const res = await request(app.getHttpServer())
      .post('/articles')
      .send({ title: 'hello', content: 'world' })
      .expect(201);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: Article = res.body;

    expect(body.id).toBeDefined();
    expect(body.title).toBe('hello');
  });

  it('GET /articles -> returns array', async () => {
    const res = await request(app.getHttpServer()).get('/articles').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /articles/:id -> returns article', async () => {
    const article = await prisma.article.create({
      data: { title: 'A', content: 'B' },
    });

    const res = await request(app.getHttpServer())
      .get(`/articles/${article.id}`)
      .expect(200);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: Article = res.body;

    expect(body.id).toBe(article.id);
    expect(body.title).toBe('A');
    expect(body.content).toBe('B');
  });

  it('PUT /articles/:id -> updates article', async () => {
    const article = await prisma.article.create({
      data: { title: 'Old Title', content: 'Old Content' },
    });

    const res = await request(app.getHttpServer())
      .put(`/articles/${article.id}`)
      .send({ title: 'New Title', content: 'New Content' })
      .expect(200);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: Article = res.body;

    expect(body.id).toBe(article.id);
    expect(body.title).toBe('New Title');
    expect(body.content).toBe('New Content');
  });

  it('DELETE /articles/:id -> delete article', async () => {
    const article = await prisma.article.create({
      data: { title: 'Title to delete', content: 'Content to delete' },
    });

    const res = await request(app.getHttpServer())
      .delete(`/articles/${article.id}`)
      .expect(200);

    expect(res.body).toMatchObject({
      success: true,
      message: `Article with id: ${article.id} deleted successfully`,
    });

    // verify if it was actually removed
    await request(app.getHttpServer())
      .get(`/articles/${article.id}`)
      .expect(404);
  });
});
