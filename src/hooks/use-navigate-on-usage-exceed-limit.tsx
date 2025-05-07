import { useRouter } from "next/navigation";
import { PageUrl } from "@/types/enums";

const useNavigateOnUsageExceedLimit = () => {
  const router = useRouter();

  const navigateOnUsageLimitExceeded = () => {
    router.push(PageUrl.UsageLimitExceeded);
  };

  return { navigateOnUsageLimitExceeded };
};

export default useNavigateOnUsageExceedLimit;