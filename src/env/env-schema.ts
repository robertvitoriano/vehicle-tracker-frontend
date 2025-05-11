import { z } from "zod";

export const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_GOOGLE_API_KEY: z.string(),
  VITE_API_TOKEN: z.string(),
});
