"use server";

import {
  canUploadYoutubeVideo,
  canConsumeCredit,
  incrementCostByAmount,
  incrementUploadByOne,
} from "@/logic/usage-limiter";
import { currentUser } from "@clerk/nextjs/server";

async function getCurrentUserOrThrow() {
  const user = await currentUser();
  if (!user) {
    throw new Error("User does not exist - you need to sign in");
  }
  return user;
}

export async function actionCanUploadYoutubeVideo(): Promise<boolean> {
  const user = await getCurrentUserOrThrow();

  return canUploadYoutubeVideo(user);
}

export async function actionCanConsumeCredit(): Promise<boolean> {
  const user = await getCurrentUserOrThrow();

  return canConsumeCredit(user);
}

export async function actionIncrementUploadByOne(): Promise<void> {
  const user = await getCurrentUserOrThrow();
  await incrementUploadByOne(user);
}

export async function actionIncrementCostByAmount(
  amount: number
): Promise<void> {
  const user = await getCurrentUserOrThrow();

  await incrementCostByAmount(user, amount);
}
