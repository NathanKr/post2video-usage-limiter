import { User } from "@clerk/nextjs/server";
import { roleSchema } from "./zod-schemas";
import { Role } from "@/types/types";

export function isAdmin(user: User): boolean {
  try {
    const { role } = roleSchema.parse(user.privateMetadata);
    return role == Role.admin;
  } catch (err) {
    console.error(err)
    return false;
  }
}
