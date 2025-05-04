import {
  getPrivateMetadata,
  getUser,
  setPrivateMetadata,
} from "@/logic/clerk-user-data-utils";
import { IPrivateUserData } from "@/types/types";

export default async function UserDataServerComponent() {
  const user = await getUser();

  if (!user) return <p>user is empty</p>;

  const userData: IPrivateUserData = {
    creditConsumedCents: 10,
    youtubeVideosUploaded: 10,
  };
  await setPrivateMetadata(userData);
  const privateMetadata = await getPrivateMetadata();

  return (
    <div>
      <p>email : {user.emailAddresses[0].emailAddress}</p>
      <p>
        privateMetadata :{" "}
        {privateMetadata
          ? `creditLeftCents : ${privateMetadata.creditConsumedCents} , numYoutubeVideoUploadLeft : ${privateMetadata.youtubeVideosUploaded}`
          : "N / A"}
      </p>
    </div>
  );
}
