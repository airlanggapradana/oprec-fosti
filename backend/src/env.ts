import {z} from "zod";

const envSchema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  ADMIN_USERNAME: z.string(),
  ADMIN_PASSWORD: z.string(),
  SERVICE_ID: z.string(),
  TEMPLATE_ID: z.string(),
  PUBLIC_KEY: z.string(),
});

export const env = envSchema.parse(process.env!)
