import { VideoAvatar } from "./video_avatar.js";

export const avatarHanakoToyosuReal = new VideoAvatar({
  waitingTime: 0, // Make it 0 to avoid waiting mode
  baseUrl: "./video/",
  idleVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "InnovationDays_female_000_real_idle003_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "InnovationDays_female_000_real_idle003_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "InnovationDays_female_000_real_idle003_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "InnovationDays_female_000_real_idle003_sad.webm",
    ],
  },
  speechVideoList: {
    [VideoAvatar.SENTIMENT_HAPPY]: [
      "InnovationDays_female_000_real_talk000_happy.webm",
    ],
    [VideoAvatar.SENTIMENT_DEFAULT]: [
      "InnovationDays_female_000_real_talk000_default.webm",
    ],
    [VideoAvatar.SENTIMENT_NEUTRAL]: [
      "InnovationDays_female_000_real_talk000_neutral.webm",
    ],
    [VideoAvatar.SENTIMENT_SAD]: [
      "InnovationDays_female_000_real_talk000_sad.webm",
    ],
  },
});
