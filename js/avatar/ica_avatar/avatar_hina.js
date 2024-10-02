import { ICAAvatar } from "./ica_avatar.js";

export const avatarHina = new ICAAvatar({
  baseUrl: "127.0.0.1",
  port: "80",
  canvasSize: { width: 1920, height: 1200 },
  fps: 24,
  bitrate: 500000,
  webcamSize: ICAAvatar.MSI_WEBCAM_RESOLUTION,
  lookatCoordinatesBounderies:
    ICAAvatar.MSI_LAPTOP_COORDINATES_BOUNDERIES_FOR_MSI_WEBCAM,
  imitateExpressionEnabled: false,
  lookAtEnabled: false,
  animationEnabled: false,
  states: {
    [ICAAvatar.STATE_IDLE]: "idle",
    [ICAAvatar.STATE_LISTEN]: "listen",
    [ICAAvatar.STATE_TALK]: "talk",
  },
  facialProfiles: {
    [ICAAvatar.SENTIMENT_HAPPY]: "Hina_Joy",
    [ICAAvatar.SENTIMENT_DEFAULT]: "Hina_Neutral",
    [ICAAvatar.SENTIMENT_SAD]: "Hina_Sad",
  },
});
