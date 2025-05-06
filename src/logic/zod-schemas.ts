import { Role } from "@/types/enums";
import { z } from "zod";

export const roleSchema = z.object({ role: z.nativeEnum(Role) });

export const privateUserDataSchema = z
  .object({
    creditConsumedCents: z.number().min(0),
    youtubeVideosUploaded: z.number().min(0),
  })
  .merge(roleSchema);
