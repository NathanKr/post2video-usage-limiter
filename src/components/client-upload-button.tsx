"use client";

import {
  actionCanUploadYoutubeVideo,
  actionIncrementUploadByOne,
} from "@/actions/usage-limiter-actions";
import useNavigateOnUsageExceedLimit from "@/hooks/use-navigate-on-usage-exceed-limit";
import { useState } from "react";

const ClientUploadButton =  () => {
  const [canUpload, setCanUpload] = useState(true); //can be improved by correct one
  const { navigateOnUsageLimitExceeded } = useNavigateOnUsageExceedLimit(); // Use the custom hook

  const clickHandler = async () => {
    const uploadAllowed = await actionCanUploadYoutubeVideo();
    setCanUpload(uploadAllowed);

    if (!uploadAllowed) {
      navigateOnUsageLimitExceeded();
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
