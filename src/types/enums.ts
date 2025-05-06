export enum PageUrl {
  
  // -- not protected
  Home = "/",
  PageNotRestricted = "/page-not-restricted",

  // -- protected
  UseCredit = "/use-credit", // requires Permission.ConsumeCredit
  UploadYoutubeVideo = "/upload-youtube-video", // requires Permission.UploadYoutubeVideo
  UserProfile = "/user-profile",
  UserData = "/user-data",
  SignUpSuccess = "/signup/success",

  // -- protected by admin
  Admin = "/admin",

  // -- error pages
  ForbiddenPage = "/403",
  UsageLimitExceeded = "/usage-limit-exceeded",
}

export enum Permission{
  ConsumeCredit = "ConsumeCredit",
  UploadYoutubeVideo = "UploadYoutubeVideo"
}

export enum Role{
  admin = 'admin',
  freeTier = 'free-tier'
}