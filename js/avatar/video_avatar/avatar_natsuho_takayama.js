import { VideoAvatar } from "./video_avatar.js";

export const avatarNatsuhoTakayama = new VideoAvatar({
  baseUrl: "./video/",
  idleVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "character001_idle000_happy.webm",
      "character001_idle001_happy.webm",
      "character001_idle002_happy.webm",
      "character001_idle003_happy.webm",
      "character001_idle004_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "character001_idle000_default.webm",
      "character001_idle001_default.webm",
      "character001_idle002_default.webm",
      "character001_idle003_default.webm",
      "character001_idle004_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "character001_idle000_neutral.webm",
      "character001_idle001_neutral.webm",
      "character001_idle002_neutral.webm",
      "character001_idle003_neutral.webm",
      "character001_idle004_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "character001_idle000_sad.webm",
      "character001_idle001_sad.webm",
      "character001_idle002_sad.webm",
      "character001_idle003_sad.webm",
      "character001_idle004_sad.webm",
    ],
  },
  idleWaitingVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: ["character001_waitingidle000_happy.webm"],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "character001_waitingidle000_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "character001_waitingidle000_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: ["character001_waitingidle000_sad.webm"],
  },
  speechVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "character001_talk000_happy.webm",
      "character001_talk001_happy.webm",
      "character001_talk002_happy.webm",
      "character001_talk003_happy.webm",
      "character001_talk004_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "character001_talk000_default.webm",
      "character001_talk001_default.webm",
      "character001_talk002_default.webm",
      "character001_talk003_default.webm",
      "character001_talk004_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "character001_talk000_neutral.webm",
      "character001_talk001_neutral.webm",
      "character001_talk002_neutral.webm",
      "character001_talk003_neutral.webm",
      "character001_talk004_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "character001_talk000_sad.webm",
      "character001_talk001_sad.webm",
      "character001_talk002_sad.webm",
      "character001_talk003_sad.webm",
      "character001_talk004_sad.webm",
    ],
  },
  speechWaitingVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: ["character001_waitingtalk000_happy.webm"],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "character001_waitingtalk000_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "character001_waitingtalk000_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: ["character001_waitingtalk000_sad.webm"],
  },
  waitingTime: 300000,
  numberToReturnToTalk: 3,
});
