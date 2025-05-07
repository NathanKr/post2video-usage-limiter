import { getPrivateMetadata } from "@/logic/clerk-user-data-utils";
import { MAX_CREDIT_CENTS, MAX_UPLOADS } from "@/logic/constants";
import { currentUser } from "@clerk/nextjs/server";

export default async function UsageStatusPercentage() {
  const user = await currentUser();

  if (!user) return <p>user is empty</p>;

  const privateData = await getPrivateMetadata(user);

  if (!privateData) return <p>privateData is empty</p>;

  const { youtubeVideosUploaded, creditConsumedCents } = privateData;

  return (
    <>
      <h2>Usage Status</h2>
      <p>
        youtube upload used :{" "}
        {Math.round((100 * youtubeVideosUploaded) / MAX_UPLOADS)} [%]
      </p>
      <p>
        credit used :{" "}
        {Math.round((100 * creditConsumedCents) / MAX_CREDIT_CENTS)} [%]
      </p>
    </>
  );
}
