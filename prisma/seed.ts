import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.article.createMany({
    data: [
      { title: 'first article', content: 'first content' },
      { title: 'second article', content: 'second content' },
    ],
  });

  console.log('database seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
