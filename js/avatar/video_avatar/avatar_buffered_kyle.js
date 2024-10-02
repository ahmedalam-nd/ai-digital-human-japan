import { VideoAvatar } from "./video_avatar.js";
import { BufferedVideoAvatar } from "./buffered_video_avatar.js";

export const avatarBufferedKyle = new BufferedVideoAvatar({
  baseUrl: "./video/",
  idleVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "Kyle_idle000_happy.webm",
      "Kyle_idle001_happy.webm",
      "Kyle_idle002_happy.webm",
      "Kyle_idle003_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "Kyle_idle000_default.webm",
      "Kyle_idle001_default.webm",
      "Kyle_idle002_default.webm",
      "Kyle_idle003_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "Kyle_idle000_neutral.webm",
      "Kyle_idle001_neutral.webm",
      "Kyle_idle002_neutral.webm",
      "Kyle_idle003_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "Kyle_idle000_sad.webm",
      "Kyle_idle001_sad.webm",
      "Kyle_idle002_sad.webm",
      "Kyle_idle003_sad.webm",
    ],
  },
  idleWaitingVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: ["Kyle_waitingidle000_happy.webm"],
    [VideoAvatar.SENTIMENT_DEFAULT]: ["Kyle_waitingidle000_default.webm"],
    [VideoAvatar.SENTIMENT_NEUTRAL]: ["Kyle_waitingidle000_neutral.webm"],
    [VideoAvatar.SENTIMENT_SAD]: ["Kyle_waitingidle000_sad.webm"],
  },
  speechVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "Kyle_talk000_happy.webm",
      "Kyle_talk001_happy.webm",
      "Kyle_talk002_happy.webm",
      "Kyle_talk003_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "Kyle_talk000_default.webm",
      "Kyle_talk001_default.webm",
      "Kyle_talk002_default.webm",
      "Kyle_talk003_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "Kyle_talk000_neutral.webm",
      "Kyle_talk001_neutral.webm",
      "Kyle_talk002_neutral.webm",
      "Kyle_talk003_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "Kyle_talk000_sad.webm",
      "Kyle_talk001_sad.webm",
      "Kyle_talk002_sad.webm",
      "Kyle_talk003_sad.webm",
    ],
  },
  speechWaitingVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: ["Kyle_talk000_happy.webm"],
    [VideoAvatar.SENTIMENT_DEFAULT]: ["Kyle_talk000_default.webm"],
    [VideoAvatar.SENTIMENT_NEUTRAL]: ["Kyle_talk000_neutral.webm"],
    [VideoAvatar.SENTIMENT_SAD]: ["Kyle_talk000_sad.webm"],
  },
});
