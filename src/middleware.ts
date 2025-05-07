import {
  clerkMiddleware,
  createRouteMatcher,
  clerkClient,
} from "@clerk/nextjs/server";
import { isAdmin } from "./logic/clerk-user-data-helper-utils";
import { NextResponse } from "next/server";
import { PageUrl } from "./types/enums";
import { hasUsagePermission } from "./logic/permissions-utils";

const isPublicRoute = createRouteMatcher([
  PageUrl.Home,
  PageUrl.PageNotRestricted,
]);
const isAdminRoute = createRouteMatcher([PageUrl.Admin]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect(); // -- if not login redirect to sign in otherwise contine

    // --- come here means user is logged in
    const { userId } = await auth();
    const client = await clerkClient();

    const user = await client.users.getUser(userId!); // userId can not be null after auth.protect()

    const isUploadYoutubeVideo = createRouteMatcher([
      PageUrl.UploadYoutubeVideo,
    ]);
    const isUseCredit = createRouteMatcher([PageUrl.UseCredit]);

    let pageNeedUsagePermission = null;
    if (isUploadYoutubeVideo(req)) {
      pageNeedUsagePermission = PageUrl.UploadYoutubeVideo;
    } else if (isUseCredit(req)) {
      pageNeedUsagePermission = PageUrl.UseCredit;
    }

    if (
      pageNeedUsagePermission &&
      !(await hasUsagePermission(user, pageNeedUsagePermission))
    ) {
      return NextResponse.redirect(
        new URL(PageUrl.UsageLimitExceeded, req.url)
      );
    }

    if (isAdminRoute(req)) {
      if (!isAdmin(user)) {
        return NextResponse.redirect(new URL(PageUrl.ForbiddenPage, req.url));
      }
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
