import { VideoAvatar } from "./video_avatar.js";

export const avatarNanaco = new VideoAvatar({
  waitingTime: 0, // Make it 0 to avoid waiting mode
  baseUrl: "./video/",
  idleVideoList: {
    [VideoAvatar.SENTIMENT_DEFAULT]: ["Nanaco_000_idle.webm"],
  },
  speechVideoList: {
    [VideoAvatar.SENTIMENT_DEFAULT]: ["Nanaco_000_talk.webm"],
  },
  noSentiment: true,
});
