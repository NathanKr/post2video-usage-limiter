import {
  getPrivateMetadata,
} from "@/logic/clerk-user-data-utils";
import { currentUser } from "@clerk/nextjs/server";

export default async function UserDataServerComponent() {
  const user = await currentUser();

  if (!user) return <p>user is empty</p>;

  const privateMetadata = await getPrivateMetadata(user);

  return (
    <div>
      <p>email : {user.emailAddresses[0].emailAddress}</p>
      <p>
        privateMetadata :{" "}
        {privateMetadata
          ? `creditConsumedCents : ${privateMetadata.creditConsumedCents} , youtubeVideosUploaded : ${privateMetadata.youtubeVideosUploaded} , role : ${privateMetadata.role}`
          : "N / A"}
      </p>
    </div>
  );
}
