// export interface IPrivateUserData {
//     creditConsumedCents: number;
//     youtubeVideosUploaded: number;
//     role : Role
//   }

import { privateUserDataSchema } from "@/logic/zod-schemas";
import { z } from "zod";

export type IPrivateUserData = z.infer<typeof privateUserDataSchema>;
export type UserUsage = Omit<IPrivateUserData,"role">

export enum Role{
    admin = 'admin',
    freeTier = 'free-tier'
}
  