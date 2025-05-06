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
  youtubeVideosUploaded: number
): Promise<void> {
  const privateUserData = await getPrivateMetadata();

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
  creditConsumedCents: number
): Promise<void> {
  const privateUserData = await getPrivateMetadata();

  if (!privateUserData) {
    throw new Error("Unexpected empty privateData");
  }

  privateUserData.creditConsumedCents = creditConsumedCents;

  await setPrivateMetadata(privateUserData);
}

export const canUseCredit = async (): Promise<boolean> => {
  const privateData = await getPrivateMetadata();

  if (!privateData) return false;

  return privateData.creditConsumedCents < MAX_CREDIT_CENTS;
};

export const canUploadYoutubeVideo = async (): Promise<boolean> => {
  const privateData = await getPrivateMetadata();

  if (!privateData) return false;

  return privateData.youtubeVideosUploaded < MAX_UPLOADS;
};

export const incrementCostByAmount = async (amount: number): Promise<void> => {
  const hasCredit = await canUseCredit();

  if (!hasCredit) {
    throw new Error("credit usage exceeded");
  }

  const privateData = await getPrivateMetadata();

  if (!privateData) {
    throw new Error("Can not increment for empty privateData ");
  }

  privateData.creditConsumedCents += amount;

  await setPrivateMetadata(privateData);
};

export const incrementUploadByOne = async (): Promise<void> => {
  const canUpload = await canUploadYoutubeVideo();

  if (!canUpload) {
    throw new Error("upload video is not allowed - usage exceeded");
  }

  const privateData = await getPrivateMetadata();

  if (!privateData) {
    throw new Error("Can not increment for empty privateData ");
  }

  privateData.youtubeVideosUploaded++;

  await setPrivateMetadata(privateData);
};

