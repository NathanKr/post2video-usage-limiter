'use client';

import { useRouter } from 'next/navigation';
import { actionIncrementUploadByOne } from "@/actions/usage-limiter-actions";
import { PageUrl } from "@/types/enums";
import { FC } from 'react';

interface IProps{
  canUpload : boolean
}

const ClientUploadButton : FC<IProps>= ({ canUpload })=> {
  const router = useRouter();

  const clickHandler = async () => {
    if (!canUpload) {
      router.push(PageUrl.UsageLimitExceeded);
      return;
    }
    await actionIncrementUploadByOne();
    // Optionally, you might want to trigger a refresh or navigate elsewhere after incrementing
  };

  return (
    <button onClick={clickHandler} disabled={!canUpload}>
      {canUpload ? 'Simulate Upload Video' : 'Upload Limit Reached'}
    </button>
  );
}


export default ClientUploadButton;