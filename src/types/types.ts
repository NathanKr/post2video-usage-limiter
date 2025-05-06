import { privateUserDataSchema } from "@/logic/zod-schemas";
import { z } from "zod";

export type IPrivateUserData = z.infer<typeof privateUserDataSchema>;
export type UserUsage = Omit<IPrivateUserData,"role">

