import { VideoAvatar } from "./video_avatar.js";

export const avatarTomomiDosaka = new VideoAvatar({
  baseUrl: "./video/",
  idleVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "character000_idle000_happy.webm",
      "character000_idle001_happy.webm",
      "character000_idle002_happy.webm",
      "character000_idle003_happy.webm",
      "character000_idle004_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "character000_idle000_default.webm",
      "character000_idle001_default.webm",
      "character000_idle002_default.webm",
      "character000_idle003_default.webm",
      "character000_idle004_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "character000_idle000_neutral.webm",
      "character000_idle001_neutral.webm",
      "character000_idle002_neutral.webm",
      "character000_idle003_neutral.webm",
      "character000_idle004_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "character000_idle000_sad.webm",
      "character000_idle001_sad.webm",
      "character000_idle002_sad.webm",
      "character000_idle003_sad.webm",
      "character000_idle004_sad.webm",
    ],
  },
  idleWaitingVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: ["character000_waitingidle000_happy.webm"],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "character000_waitingidle000_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "character000_waitingidle000_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: ["character000_waitingidle000_sad.webm"],
  },
  speechVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "character000_talk000_happy.webm",
      "character000_talk001_happy.webm",
      "character000_talk002_happy.webm",
      "character000_talk003_happy.webm",
      "character000_talk004_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "character000_talk000_default.webm",
      "character000_talk001_default.webm",
      "character000_talk002_default.webm",
      "character000_talk003_default.webm",
      "character000_talk004_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "character000_talk000_neutral.webm",
      "character000_talk001_neutral.webm",
      "character000_talk002_neutral.webm",
      "character000_talk003_neutral.webm",
      "character000_talk004_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "character000_talk000_sad.webm",
      "character000_talk001_sad.webm",
      "character000_talk002_sad.webm",
      "character000_talk003_sad.webm",
      "character000_talk004_sad.webm",
    ],
  },
  speechWaitingVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: ["character000_waitingtalk000_happy.webm"],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "character000_waitingtalk000_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "character000_waitingtalk000_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: ["character000_waitingtalk000_sad.webm"],
  },
  waitingTime: 300000,
});
