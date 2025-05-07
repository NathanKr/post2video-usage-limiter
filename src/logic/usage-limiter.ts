import { User } from "@clerk/nextjs/server";
import {
  getPrivateMetadata,
  setPrivateMetadata,
} from "./clerk-user-data-utils";
import { MAX_CREDIT_CENTS, MAX_UPLOADS } from "./constants";

/**
 * pre condition : privateUserData exist
 * @param youtubeVideosUploaded
 */
export async function updateYoutubeVideosUploaded(
  user: User,
  youtubeVideosUploaded: number
): Promise<void> {
  const privateUserData = await getPrivateMetadata(user);

  if (!privateUserData) {
    throw new Error("Unexpected empty privateData");
  }

  privateUserData.youtubeVideosUploaded = youtubeVideosUploaded;

  await setPrivateMetadata(privateUserData);
}

/**
 * pre condition : privateUserData exist
 * @param creditConsumedCents
 */
export async function updateCreditConsumedCents(
  user: User,
  creditConsumedCents: number
): Promise<void> {
  const privateUserData = await getPrivateMetadata(user);

  if (!privateUserData) {
    throw new Error("Unexpected empty privateData");
  }

  privateUserData.creditConsumedCents = creditConsumedCents;

  await setPrivateMetadata(privateUserData);
}

export const canUseCredit = async (user: User,): Promise<boolean> => {
  const privateData = await getPrivateMetadata(user);

  if (!privateData) return false;

  const {creditConsumedCents} = privateData

  const res = creditConsumedCents < MAX_CREDIT_CENTS;
  console.log(
    `canUseCredit . res : ${res} , creditConsumedCents : ${creditConsumedCents} , MAX_CREDIT_CENTS : ${MAX_CREDIT_CENTS}  `
  );

  return res;
};

export const canUploadYoutubeVideo = async (user: User,): Promise<boolean> => {
  const privateData = await getPrivateMetadata(user);

  if (!privateData) return false;

  const {youtubeVideosUploaded} = privateData
  const res = youtubeVideosUploaded < MAX_UPLOADS;
  console.log(
    `canUploadYoutubeVideo . res : ${res} , youtubeVideosUploaded : ${youtubeVideosUploaded} , MAX_UPLOADS : ${MAX_UPLOADS}  `
  );
  return res;
};

export const incrementCostByAmount = async (user: User,amount: number): Promise<void> => {
  const hasCredit = await canUseCredit(user);

  if (!hasCredit) {
    throw new Error("credit usage exceeded");
  }

  const privateData = await getPrivateMetadata(user);

  if (!privateData) {
    throw new Error("Can not increment for empty privateData ");
  }

  privateData.creditConsumedCents += amount;

  await setPrivateMetadata(privateData);
};

export const incrementUploadByOne = async (user: User): Promise<void> => {
  const canUpload = await canUploadYoutubeVideo(user);

  if (!canUpload) {
    throw new Error("upload video is not allowed - usage exceeded");
  }

  const privateData = await getPrivateMetadata(user);

  if (!privateData) {
    throw new Error("Can not increment for empty privateData ");
  }

  privateData.youtubeVideosUploaded++;

  await setPrivateMetadata(privateData);
};
