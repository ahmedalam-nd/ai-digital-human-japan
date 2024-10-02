import { VideoAvatar } from "./video_avatar.js";

export const avatarHanakoToyosu = new VideoAvatar({
  baseUrl: "./video/",
  idleVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "InnovationDays_female_000_idle000_happy.webm",
      "InnovationDays_female_000_idle001_happy.webm",
      "InnovationDays_female_000_idle002_happy.webm",
      "InnovationDays_female_000_idle003_happy.webm",
      "InnovationDays_female_000_idle004_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "InnovationDays_female_000_idle000_default.webm",
      "InnovationDays_female_000_idle001_default.webm",
      "InnovationDays_female_000_idle002_default.webm",
      "InnovationDays_female_000_idle003_default.webm",
      "InnovationDays_female_000_idle004_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "InnovationDays_female_000_idle000_neutral.webm",
      "InnovationDays_female_000_idle001_neutral.webm",
      "InnovationDays_female_000_idle002_neutral.webm",
      "InnovationDays_female_000_idle003_neutral.webm",
      "InnovationDays_female_000_idle004_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "InnovationDays_female_000_idle000_sad.webm",
      "InnovationDays_female_000_idle001_sad.webm",
      "InnovationDays_female_000_idle002_sad.webm",
      "InnovationDays_female_000_idle003_sad.webm",
      "InnovationDays_female_000_idle004_sad.webm",
    ],
  },
  idleWaitingVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "InnovationDays_female_000_waitingidle000_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "InnovationDays_female_000_waitingidle000_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "InnovationDays_female_000_waitingidle000_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "InnovationDays_female_000_waitingidle000_sad.webm",
    ],
  },
  speechVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "InnovationDays_female_000_talk000_happy.webm",
      "InnovationDays_female_000_talk001_happy.webm",
      "InnovationDays_female_000_talk002_happy.webm",
      "InnovationDays_female_000_talk003_happy.webm",
      "InnovationDays_female_000_talk004_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "InnovationDays_female_000_talk000_default.webm",
      "InnovationDays_female_000_talk001_default.webm",
      "InnovationDays_female_000_talk002_default.webm",
      "InnovationDays_female_000_talk003_default.webm",
      "InnovationDays_female_000_talk004_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "InnovationDays_female_000_talk000_neutral.webm",
      "InnovationDays_female_000_talk001_neutral.webm",
      "InnovationDays_female_000_talk002_neutral.webm",
      "InnovationDays_female_000_talk003_neutral.webm",
      "InnovationDays_female_000_talk004_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "InnovationDays_female_000_talk000_sad.webm",
      "InnovationDays_female_000_talk001_sad.webm",
      "InnovationDays_female_000_talk002_sad.webm",
      "InnovationDays_female_000_talk003_sad.webm",
      "InnovationDays_female_000_talk004_sad.webm",
    ],
  },
  speechWaitingVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "InnovationDays_female_000_waitingtalk000_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "InnovationDays_female_000_waitingtalk000_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "InnovationDays_female_000_waitingtalk000_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "InnovationDays_female_000_waitingtalk000_sad.webm",
    ],
  },
});
