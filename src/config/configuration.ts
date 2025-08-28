import { z } from 'zod';

const schema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends z.infer<typeof schema> {}
  }
}

export function init() {
  const parsed = schema.safeParse(process.env);
  if (parsed.success === false) {
    console.error(
      '❌ Invalid environment variables',
      parsed.error.flatten().fieldErrors,
    );
    throw new Error('Invalid environment variables');
  }
}

export default () => ({
  port: Number(process.env.PORT || 3000),
  nodeEnv: process.env.NODE_ENV,
});
