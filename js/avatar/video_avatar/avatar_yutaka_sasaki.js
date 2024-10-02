import { VideoAvatar } from "./video_avatar.js";

export const avatarYutakaSasaki = new VideoAvatar({
  baseUrl: "./video/",
  idleVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "sasaki000_idle000_happy.webm",
      "sasaki000_idle001_happy.webm",
      "sasaki000_idle002_happy.webm",
      "sasaki000_idle003_happy.webm",
      "sasaki000_idle004_happy.webm",
      "sasaki000_idle005_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "sasaki000_idle000_default.webm",
      "sasaki000_idle001_default.webm",
      "sasaki000_idle002_default.webm",
      "sasaki000_idle003_default.webm",
      "sasaki000_idle004_default.webm",
      "sasaki000_idle005_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "sasaki000_idle000_neutral.webm",
      "sasaki000_idle001_neutral.webm",
      "sasaki000_idle002_neutral.webm",
      "sasaki000_idle003_neutral.webm",
      "sasaki000_idle004_neutral.webm",
      "sasaki000_idle005_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "sasaki000_idle000_sad.webm",
      "sasaki000_idle001_sad.webm",
      "sasaki000_idle002_sad.webm",
      "sasaki000_idle003_sad.webm",
      "sasaki000_idle004_sad.webm",
      "sasaki000_idle005_sad.webm",
    ],
  },
  idleWaitingVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: ["sasaki000_walkidle000_happy.webm"],
    [VideoAvatar.SENTIMENT_DEFAULT]: ["sasaki000_walkidle000_default.webm"],
    [VideoAvatar.SENTIMENT_NEUTRAL]: ["sasaki000_walkidle000_neutral.webm"],
    [VideoAvatar.SENTIMENT_SAD]: ["sasaki000_walkidle000_sad.webm"],
  },
  speechVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "sasaki000_talk000_happy.webm",
      "sasaki000_talk001_happy.webm",
      "sasaki000_talk002_happy.webm",
      "sasaki000_talk003_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "sasaki000_talk000_default.webm",
      "sasaki000_talk001_default.webm",
      "sasaki000_talk002_default.webm",
      "sasaki000_talk003_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "sasaki000_talk000_neutral.webm",
      "sasaki000_talk001_neutral.webm",
      "sasaki000_talk002_neutral.webm",
      "sasaki000_talk003_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "sasaki000_talk000_sad.webm",
      "sasaki000_talk001_sad.webm",
      "sasaki000_talk002_sad.webm",
      "sasaki000_talk003_sad.webm",
    ],
  },
  speechWaitingVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: ["sasaki000_walktalk000_happy.webm"],
    [VideoAvatar.SENTIMENT_DEFAULT]: ["sasaki000_walktalk000_default.webm"],
    [VideoAvatar.SENTIMENT_NEUTRAL]: ["sasaki000_walktalk000_neutral.webm"],
    [VideoAvatar.SENTIMENT_SAD]: ["sasaki000_walktalk000_sad.webm"],
  },
});
