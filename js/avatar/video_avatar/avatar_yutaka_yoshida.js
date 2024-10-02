import { VideoAvatar } from "./video_avatar.js";

export const avatarYutakaYoshida = new VideoAvatar({
  baseUrl: "./video/",
  idleVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "TBYoshida_idle000_happy.webm",
      "TBYoshida_idle001_happy.webm",
      "TBYoshida_idle002_happy.webm",
      "TBYoshida_idle003_happy.webm",
      "TBYoshida_idle004_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "TBYoshida_idle000_default.webm",
      "TBYoshida_idle001_default.webm",
      "TBYoshida_idle002_default.webm",
      "TBYoshida_idle003_default.webm",
      "TBYoshida_idle004_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "TBYoshida_idle000_neutral.webm",
      "TBYoshida_idle001_neutral.webm",
      "TBYoshida_idle002_neutral.webm",
      "TBYoshida_idle003_neutral.webm",
      "TBYoshida_idle004_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "TBYoshida_idle000_sad.webm",
      "TBYoshida_idle001_sad.webm",
      "TBYoshida_idle002_sad.webm",
      "TBYoshida_idle003_sad.webm",
      "TBYoshida_idle004_sad.webm",
    ],
  },
  idleWaitingVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: ["TBYoshida_waitingidle000_happy.webm"],
    [VideoAvatar.SENTIMENT_DEFAULT]: ["TBYoshida_waitingidle000_default.webm"],
    [VideoAvatar.SENTIMENT_NEUTRAL]: ["TBYoshida_waitingidle000_neutral.webm"],
    [VideoAvatar.SENTIMENT_SAD]: ["TBYoshida_waitingidle000_sad.webm"],
  },
  speechVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "TBYoshida_talk000_happy.webm",
      "TBYoshida_talk001_happy.webm",
      "TBYoshida_talk002_happy.webm",
      "TBYoshida_talk003_happy.webm",
      "TBYoshida_talk004_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "TBYoshida_talk000_default.webm",
      "TBYoshida_talk001_default.webm",
      "TBYoshida_talk002_default.webm",
      "TBYoshida_talk003_default.webm",
      "TBYoshida_talk004_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "TBYoshida_talk000_neutral.webm",
      "TBYoshida_talk001_neutral.webm",
      "TBYoshida_talk002_neutral.webm",
      "TBYoshida_talk003_neutral.webm",
      "TBYoshida_talk004_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "TBYoshida_talk000_sad.webm",
      "TBYoshida_talk001_sad.webm",
      "TBYoshida_talk002_sad.webm",
      "TBYoshida_talk003_sad.webm",
      "TBYoshida_talk004_sad.webm",
    ],
  },
  speechWaitingVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: ["TBYoshida_waitingtalk000_happy.webm"],
    [VideoAvatar.SENTIMENT_DEFAULT]: ["TBYoshida_waitingtalk000_default.webm"],
    [VideoAvatar.SENTIMENT_NEUTRAL]: ["TBYoshida_waitingtalk000_neutral.webm"],
    [VideoAvatar.SENTIMENT_SAD]: ["TBYoshida_waitingtalk000_sad.webm"],
  },
});
