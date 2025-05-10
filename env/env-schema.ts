import { z } from "zod";

export const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_GOOGLE_API_URL: z.string(),
  VITE_API_TOKEN: z.string(),
  VITE_MAP_ID: z.string(),
});
