import { User } from "@clerk/nextjs/server";
import { roleSchema } from "./zod-schemas";
import { IPrivateUserData, Role } from "@/types/types";
import { setPrivateMetadata } from "./clerk-user-data-utils";

export function isAdmin(user: User): boolean {
  try {
    const { role } = roleSchema.parse(user.privateMetadata);
    return role == Role.admin;
  } catch (err) {
    console.error(err)
    return false;
  }
}

export async function initializeSignupSuccessUserAsFreeTier () : Promise<void>{
  const userFreeTierData: IPrivateUserData = {
    role: Role.freeTier,
    creditConsumedCents: 0,
    youtubeVideosUploaded: 0
  }
  await setPrivateMetadata(userFreeTierData)
}
