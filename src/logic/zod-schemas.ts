import { z } from "zod";

export const privateUserDataSchema = z.object({
  creditConsumedCents: z.number().min(0),
  youtubeVideosUploaded: z.number().min(0),
});
