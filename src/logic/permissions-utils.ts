import { PageUrl } from "@/types/enums";
import { canUploadYoutubeVideo, canUseCredit } from "./usage-limiter";
import { User } from "@clerk/nextjs/server";



export async function hasUsagePermission(user: User,page: PageUrl): Promise<boolean> {
  switch (page) {
    case PageUrl.UploadYoutubeVideo:
      return await canUploadYoutubeVideo(user);

    case PageUrl.UseCredit:
      return await canUseCredit(user);

    default:
      return true;
  }
}
