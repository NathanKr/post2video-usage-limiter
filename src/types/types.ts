// export interface IPrivateUserData {
//     creditConsumedCents: number;
//     youtubeVideosUploaded: number;
//   }

import { privateUserDataSchema } from "@/logic/zod-schemas";
import { z } from "zod";

export type IPrivateUserData = z.infer<typeof privateUserDataSchema>;
  