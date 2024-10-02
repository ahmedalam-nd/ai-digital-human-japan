import { VideoAvatar } from "./video_avatar.js";

export const avatarTaroShinagawa = new VideoAvatar({
  baseUrl: "./video/",
  idleVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "InnovationDays_male_003_idle000_happy.webm",
      "InnovationDays_male_003_idle001_happy.webm",
      "InnovationDays_male_003_idle002_happy.webm",
      "InnovationDays_male_003_idle003_happy.webm",
      "InnovationDays_male_003_idle004_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "InnovationDays_male_003_idle000_default.webm",
      "InnovationDays_male_003_idle001_default.webm",
      "InnovationDays_male_003_idle002_default.webm",
      "InnovationDays_male_003_idle003_default.webm",
      "InnovationDays_male_003_idle004_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "InnovationDays_male_003_idle000_neutral.webm",
      "InnovationDays_male_003_idle001_neutral.webm",
      "InnovationDays_male_003_idle002_neutral.webm",
      "InnovationDays_male_003_idle003_neutral.webm",
      "InnovationDays_male_003_idle004_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "InnovationDays_male_003_idle000_sad.webm",
      "InnovationDays_male_003_idle001_sad.webm",
      "InnovationDays_male_003_idle002_sad.webm",
      "InnovationDays_male_003_idle003_sad.webm",
      "InnovationDays_male_003_idle004_sad.webm",
    ],
  },
  idleWaitingVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "InnovationDays_male_003_waitingidle000_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "InnovationDays_male_003_waitingidle000_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "InnovationDays_male_003_waitingidle000_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "InnovationDays_male_003_waitingidle000_sad.webm",
    ],
  },
  speechVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "InnovationDays_male_003_talk000_happy.webm",
      "InnovationDays_male_003_talk001_happy.webm",
      "InnovationDays_male_003_talk002_happy.webm",
      "InnovationDays_male_003_talk003_happy.webm",
      "InnovationDays_male_003_talk004_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "InnovationDays_male_003_talk000_default.webm",
      "InnovationDays_male_003_talk001_default.webm",
      "InnovationDays_male_003_talk002_default.webm",
      "InnovationDays_male_003_talk003_default.webm",
      "InnovationDays_male_003_talk004_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "InnovationDays_male_003_talk000_neutral.webm",
      "InnovationDays_male_003_talk001_neutral.webm",
      "InnovationDays_male_003_talk002_neutral.webm",
      "InnovationDays_male_003_talk003_neutral.webm",
      "InnovationDays_male_003_talk004_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "InnovationDays_male_003_talk000_sad.webm",
      "InnovationDays_male_003_talk001_sad.webm",
      "InnovationDays_male_003_talk002_sad.webm",
      "InnovationDays_male_003_talk003_sad.webm",
      "InnovationDays_male_003_talk004_sad.webm",
    ],
  },
  speechWaitingVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "InnovationDays_male_003_waitingtalk000_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "InnovationDays_male_003_waitingtalk000_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "InnovationDays_male_003_waitingtalk000_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "InnovationDays_male_003_waitingtalk000_sad.webm",
    ],
  },
});
