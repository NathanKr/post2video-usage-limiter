import { PageUrl } from "@/types/enums";
import { canUploadYoutubeVideo, canUseCredit } from "./usage-limiter";



export async function hasUsagePermission(page: PageUrl): Promise<boolean> {
  switch (page) {
    case PageUrl.UploadYoutubeVideo:
      return await canUploadYoutubeVideo();

    case PageUrl.UseCredit:
      return await canUseCredit();

    default:
      return true;
  }
}
