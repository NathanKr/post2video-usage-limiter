import { actionCanUploadYoutubeVideo } from "@/actions/usage-limiter-actions";
import ClientUploadButton from "@/components/client-upload-button";

export default async function UploadYoutubeVideoPage() {
  const canUpload = await actionCanUploadYoutubeVideo();

  return (
    <>
      <h2>UploadYoutubeVideo page</h2>
      <ClientUploadButton canUpload={canUpload} />
    </>
  );
}

