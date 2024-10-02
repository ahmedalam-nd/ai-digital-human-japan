import { VideoAvatar } from "./video_avatar.js";

export const avatarAtsushiSeto = new VideoAvatar({
  baseUrl: "./video/",
  idleVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "Seto_000_idle000_happy.webm",
      "Seto_000_idle001_happy.webm",
      "Seto_000_idle002_happy.webm",
      "Seto_000_idle003_happy.webm",
      "Seto_000_idle004_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "Seto_000_idle000_default.webm",
      "Seto_000_idle001_default.webm",
      "Seto_000_idle002_default.webm",
      "Seto_000_idle003_default.webm",
      "Seto_000_idle004_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "Seto_000_idle000_neutral.webm",
      "Seto_000_idle001_neutral.webm",
      "Seto_000_idle002_neutral.webm",
      "Seto_000_idle003_neutral.webm",
      "Seto_000_idle004_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "Seto_000_idle000_sad.webm",
      "Seto_000_idle001_sad.webm",
      "Seto_000_idle002_sad.webm",
      "Seto_000_idle003_sad.webm",
      "Seto_000_idle004_sad.webm",
    ],
  },
  idleWaitingVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: ["Seto_000_waitingidle000_happy.webm"],
    [VideoAvatar.SENTIMENT_DEFAULT]: ["Seto_000_waitingidle000_default.webm"],
    [VideoAvatar.SENTIMENT_NEUTRAL]: ["Seto_000_waitingidle000_neutral.webm"],
    [VideoAvatar.SENTIMENT_SAD]: ["Seto_000_waitingidle000_sad.webm"],
  },
  speechVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "Seto_000_talk000_happy.webm",
      "Seto_000_talk001_happy.webm",
      "Seto_000_talk002_happy.webm",
      "Seto_000_talk003_happy.webm",
      "Seto_000_talk004_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "Seto_000_talk000_default.webm",
      "Seto_000_talk001_default.webm",
      "Seto_000_talk002_default.webm",
      "Seto_000_talk003_default.webm",
      "Seto_000_talk004_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "Seto_000_talk000_neutral.webm",
      "Seto_000_talk001_neutral.webm",
      "Seto_000_talk002_neutral.webm",
      "Seto_000_talk003_neutral.webm",
      "Seto_000_talk004_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "Seto_000_talk000_sad.webm",
      "Seto_000_talk001_sad.webm",
      "Seto_000_talk002_sad.webm",
      "Seto_000_talk003_sad.webm",
      "Seto_000_talk004_sad.webm",
    ],
  },
  speechWaitingVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: ["Seto_000_waitingtalk000_happy.webm"],
    [VideoAvatar.SENTIMENT_DEFAULT]: ["Seto_000_waitingtalk000_default.webm"],
    [VideoAvatar.SENTIMENT_NEUTRAL]: ["Seto_000_waitingtalk000_neutral.webm"],
    [VideoAvatar.SENTIMENT_SAD]: ["Seto_000_waitingtalk000_sad.webm"],
  },
});
