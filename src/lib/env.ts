import { z } from 'zod';

const envVariables = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string(),
  BASE_URL: z.string(),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
});

type EnvVariables = z.infer<typeof envVariables>;
//      ^?

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVariables {}
  }
}
