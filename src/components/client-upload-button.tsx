"use client";

import { useRouter } from "next/navigation";
import {
  actionCanUploadYoutubeVideo,
  actionIncrementUploadByOne,
} from "@/actions/usage-limiter-actions";
import { PageUrl } from "@/types/enums";
import { useState } from "react";

const ClientUploadButton =  () => {
  const [canUpload, setCanUpload] = useState(true); //can be improved by correct one
  const router = useRouter();

  const clickHandler = async () => {
    const uploadAllowed = await actionCanUploadYoutubeVideo();
    setCanUpload(uploadAllowed);

    if (!uploadAllowed) {
      router.push(PageUrl.UsageLimitExceeded);
      return;
    }
    await actionIncrementUploadByOne();
    // Optionally, you might want to trigger a refresh or navigate elsewhere after incrementing
  };

  return (
    <button onClick={clickHandler} disabled={!canUpload}>
      {canUpload ? "Simulate Upload Video" : "Upload Limit Reached"}
    </button>
  );
};

export default ClientUploadButton;
