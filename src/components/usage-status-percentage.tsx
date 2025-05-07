import { getPrivateMetadata } from "@/logic/clerk-user-data-utils";
import { MAX_CREDIT_CENTS, MAX_UPLOADS } from "@/logic/constants";
import { currentUser } from "@clerk/nextjs/server";

const getStyle = (percentage: number) => {
  return { color: percentage < 100 ? "green" : "red" };
};

export default async function UsageStatusPercentage() {
  const user = await currentUser();

  if (!user) return <p>user is empty</p>;

  const privateData = await getPrivateMetadata(user);

  if (!privateData) return <p>privateData is empty</p>;

  const { youtubeVideosUploaded, creditConsumedCents } = privateData;
  const youtubeVideosUploadedPercentag = Math.round(
    (100 * youtubeVideosUploaded) / MAX_UPLOADS
  );
  const creditConsumedPercentage = Math.round(
    (100 * creditConsumedCents) / MAX_CREDIT_CENTS
  );

  return (
    <>
      <h2>Usage Status</h2>
      <p style={getStyle(youtubeVideosUploadedPercentag)}>youtube upload used : {youtubeVideosUploadedPercentag} [%]</p>
      <p style={getStyle(creditConsumedPercentage)}> credit consumed :{creditConsumedPercentage} [%]</p>
    </>
  );
}
