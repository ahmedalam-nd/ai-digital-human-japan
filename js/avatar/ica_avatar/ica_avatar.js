import { Util } from "../../util.js";
import { Avatar } from "../avatar.js";
import { icasdk } from "./icasdk.js";

export class ICAAvatar extends Avatar {
  constructor({
    baseUrl = "127.0.0.1",
    port = "80",
    canvasSize = { width: 1920, height: 1200 },
    webcamSize = ICAAvatar.MSI_WEBCAM_RESOLUTION,
    fps = 24,
    bitrate = 500000,
    imitateExpressionEnabled = true,
    lookAtEnabled = true,
    lookatCoordinatesBounderies = ICAAvatar.MSI_LAPTOP_COORDINATES_BOUNDERIES_FOR_MSI_WEBCAM,
    cameraDetectionInterval = 1000,
    cameraUpdateThreshold = null,
    states = {
      [ICAAvatar.STATE_IDLE]: "idle",
      [ICAAvatar.STATE_LISTEN]: "listen",
      [ICAAvatar.STATE_TALK]: "talk",
    },
    currentState = ICAAvatar.STATE_IDLE,
    facialProfiles = {
      [ICAAvatar.SENTIMENT_HAPPY]: "Hina_Joy",
      [ICAAvatar.SENTIMENT_DEFAULT]: "Hina_Neutral",
      [ICAAvatar.SENTIMENT_SAD]: "Hina_Sad",
    },
    animationEnabled = true,
    animationPools = {
      [ICAAvatar.STATE_IDLE]: "idle",
      [ICAAvatar.STATE_LISTEN]: "listen",
      [ICAAvatar.STATE_TALK]: "talk",
    },
    animationTime = { min: 20000, max: 40000 },
  }) {
    super({ baseUrl: baseUrl });
    this.port = port;
    this.canvasSize = canvasSize;
    this.webcamSize = webcamSize;
    this.fps = fps;
    this.bitrate = bitrate;
    this.states = states;
    this.currentState = currentState;
    this.facialProfiles = facialProfiles;
    this.currentSentimentString = ICAAvatar.SENTIMENT_DEFAULT;
    this.animationEnabled = animationEnabled;
    this.animationPools = animationPools;
    this.animationTime = animationTime;
    this.imitateExpressionEnabled = imitateExpressionEnabled;
    this.lookAtEnabled = lookAtEnabled;
    this.lookatCoordinatesBounderies = lookatCoordinatesBounderies;
    this.lookatCoordinates = { x: 0.0, y: 0.0 };
    this.cameraDetectionInterval = cameraDetectionInterval;
    this.cameraUpdateThreshold = cameraUpdateThreshold;
  }

  static BUFFALO_WEBCAM_RESOLUTION = { width: 1920, height: 1080 };
  static MSI_WEBCAM_RESOLUTION = { width: 1280, height: 720 };

  static MSI_LAPTOP_COORDINATES_BOUNDERIES_FOR_MSI_WEBCAM = {
    left: -10.0,
    right: 8.0,
    top: -13.0,
    bottom: 23.0,
  };

  static MSI_LAPTOP_COORDINATES_BOUNDERIES_FOR_BUFFALO_WEBCAM = {
    left: -15.0,
    right: 11.0,
    top: -10.0,
    bottom: 27.0,
  };

  static KIOSK_COORDINATES_BOUNDERIES_FOR_BUFFALO_WEBCAM = {
    left: -15.0,
    right: 15.0,
    top: -5.0,
    bottom: 60.0,
  };

  static STATE_IDLE = "idle";
  static STATE_LISTEN = "listen";
  static STATE_TALK = "talk";
  static SENTIMENT_HAPPY = "happy";
  static SENTIMENT_DEFAULT = "default";
  static SENTIMENT_SAD = "sad";

  _resizeCanvas({ document }) {
    if (this.ica == null) {
      this.init({ document: document });
      return;
    }
    window.onresize = null;
    this.canvasSize = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
    this.remoteVideo.width = this.canvasSize.width;
    this.remoteVideo.height = this.canvasSize.height;

    const config = {
      width: this.canvasSize.width,
      height: this.canvasSize.height,
      fps: this.fps,
      bitrate: this.bitrate,
    };
    try {
      this.ica.SetScreenStreamingSettings(config);
    } catch (error) {
      throw new Error(`Error in ICAAvatar._resizeCanvas: ${error}`);
    }
    this._registerWindowOnsizeEvent({ document: document });
  }

  init({ document }) {
    super.init({ document: document });
    this.canvasSize = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
    const avatarElement = document.getElementById("avatar");
    avatarElement.innerHTML = `<video id="${ICAAvatar.REMOTEVIDEO_ID}" width=${this.canvasSize.width} height=${this.canvasSize.height} playsinline autoplay tabindex="-1" muted controls></video>
    <br><video id="${ICAAvatar.WEBCAMVIDEO_ID}" width=${this.webcamSize.width} height=${this.webcamSize.height} playsinline autoplay tabindex="-1" muted hidden></video>`;
    this.remoteVideo = document.getElementById(ICAAvatar.REMOTEVIDEO_ID);
    this.webcamVideo = document.getElementById(ICAAvatar.WEBCAMVIDEO_ID);
    this.initConnect();
    Util.loadScript({
      document: document,
      src: "./js/avatar/ica_avatar/face-api.min.js",
      defer: true,
    }).then(() => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(
          "/js/avatar/ica_avatar/models"
        ),
        faceapi.nets.faceLandmark68Net.loadFromUri(
          "/js/avatar/ica_avatar/models"
        ),
        faceapi.nets.faceRecognitionNet.loadFromUri(
          "/js/avatar/ica_avatar/models"
        ),
        faceapi.nets.faceExpressionNet.loadFromUri(
          "/js/avatar/ica_avatar/models"
        ),
      ])
        .catch((error) => {
          throw new Error(`Error in ICAAvatar.init: ${error}`);
        })
        .then(() => {
          this.initVideoStream();
        })
        .catch((error) => {
          throw new Error(`Error in ICAAvatar.init: ${error}`);
        });
    });
  }

  addAvatarContent({ document }) {
    this.init({ document: document });
    this._registerWindowOnsizeEvent({ document: document });
  }

  _registerWindowOnsizeEvent({ document }) {
    if (window.onresize != null) {
      return;
    }
    var self = this;
    window.onresize = () => {
      self._resizeCanvas({ document: document });
    };
  }

  // Remove content from the document.
  removeAvatarContent({ document }) {
    super.removeAvatarContent({ document: document });
    this.closeConnection();
    this.closeVideoStream();
    window.onresize = null;
  }

  closeConnection() {
    if (this.ica != null) {
      this.ica.disconnect();
      this.ica = null;
    }
  }

  initConnect() {
    try {
      this.closeConnection();
      this.ica = new icasdk.ICA(this.remoteVideo);
      this.ica.command.onICAMessage = function (data) {
        console.log(data);
      };
      this.ica.onConnected = function () {
        console.log("onConnected!!!");
      };
      this.ica.onDisconnected = function () {
        console.log("onDisconnected!!!");
      };
      this.ica.onConnectionError = function () {
        console.log("onConnectionError!!!");
      };
      this.ica.connect(this.baseUrl, this.port, {
        width: this.canvasSize.width,
        height: this.canvasSize.height,
        fps: this.fps,
        bitrate: this.bitrate,
      });
    } catch (error) {
      throw new Error(`Error in ICAAvatar.initConnect: ${error}`);
    }
  }

  closeVideoStream() {
    if (this.webcamVideo != null && this.webcamVideo.srcObject != null) {
      this.webcamVideo.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
    }
    if (document.getElementById("faceapi-canvas") != null) {
      document.getElementById("faceapi-canvas").remove();
    }
    if (this.cameraDetectionIntervalId != null) {
      clearInterval(this.cameraDetectionIntervalId);
    }
    if (this.animationTimerId != null) {
      clearTimeout(this.animationTimerId);
    }
  }

  initVideoStream() {
    this.closeVideoStream();

    const self = this;
    this.webcamVideo.addEventListener("play", () => {
      this._setCameraDetectionIntervalId({
        self: self,
        interval: self.cameraDetectionInterval,
      });
      this._setAnimationTimer({
        self: self,
        min: self.animationTime.min,
        max: self.animationTime.max,
      });
    });

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          self.webcamVideo.srcObject = stream;
          self.webcamVideo.play();
        })
        .catch((error) => {
          throw new Error(`Error in ICAAvatar.initVideoStream: ${error}`);
        });
    }
  }

  _setCameraDetectionIntervalId({ self, interval }) {
    if (!self.imitateExpressionEnabled && !self.lookAtEnabled) {
      return;
    }
    if (self.cameraDetectionIntervalId != null) {
      clearInterval(self.cameraDetectionIntervalId);
    }
    self.cameraDetectionIntervalId = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(self.webcamVideo, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      if (self.imitateExpressionEnabled) {
        self.updateFacialExpression({ detections: detections });
      }
      if (self.lookAtEnabled) {
        self.lookAtDetectedCoordinates({ detections: detections });
      }
    }, interval);
  }

  _setAnimationTimer({ self, min, max }) {
    if (!self.animationEnabled) {
      return;
    }
    if (self.animationTimerId != null) {
      clearTimeout(self.animationTimerId);
    }
    self.animationTimerId = setTimeout(() => {
      const animationPool = self.animationPools[self.currentState];
      if (animationPool == null) {
        return;
      }
      self.ica.command
        .SendPlayAnimationPool(animationPool)
        .then((result) => {
          self._setAnimationTimer({ self: self, min: min, max: max });
        })
        .catch((error) => {
          throw new Error(`Error in ICAAvatar.initVideoStream: ${error}`);
        });
    }, Util.getRandomInt({ min: min, max: max }));
  }

  async updateFacialExpression({ detections }) {
    var sentimentString = ICAAvatar.SENTIMENT_DEFAULT;
    if (detections.length != 0) {
      const expression = detections[0].expressions;
      var largestNegativeExpression = expression.angry;
      if (largestNegativeExpression < expression.disgusted) {
        largestNegativeExpression = expression.disgusted;
      }
      if (largestNegativeExpression < expression.fearful) {
        largestNegativeExpression = expression.fearful;
      }
      if (largestNegativeExpression < expression.sad) {
        largestNegativeExpression = expression.sad;
      }
      var largestPositiveExpression = expression.happy;
      if (largestPositiveExpression < expression.surprised) {
        largestPositiveExpression = expression.surprised;
      }
      sentimentString = this._getSentimentString({
        score: largestPositiveExpression - largestNegativeExpression,
      });
    }
    if (sentimentString == this.currentSentimentString) {
      return;
    }
    this.currentSentimentString = sentimentString;
    this.ica.command
      .SendUpdateAvatarFacialProfile(this.facialProfiles[sentimentString])
      .then((result) => {})
      .catch((error) => {
        throw new Error(`Error in ICAAvatar.updateFacialExpression: ${error}`);
      });
  }

  updateState({ state }) {
    if (this.currentState == state) {
      return;
    }
    this.currentState = state;
    this.ica.command
      .SendSwitchState(this.states[state])
      .then((data) => {})
      .catch((error) => {
        throw new Error(`Error in ICAAvatar.updateState: ${error}`);
      });
  }

  lookAtDetectedCoordinates({ detections }) {
    const newLookatCoordinates = this.convertDetectionToLookatCoordinates({
      detections: detections,
    });
    if (
      newLookatCoordinates == null ||
      (this.lookatCoordinates != null &&
        this.cameraUpdateThreshold != null &&
        Math.abs(this.lookatCoordinates.x - newLookatCoordinates.x) <
          this.cameraUpdateThreshold &&
        Math.abs(this.lookatCoordinates.y - newLookatCoordinates.y) <
          this.cameraUpdateThreshold)
    ) {
      this.updateState({ state: ICAAvatar.STATE_IDLE });
      return;
    }
    this.updateState({ state: ICAAvatar.STATE_LISTEN });
    this.lookatCoordinates.x = newLookatCoordinates.x;
    this.lookatCoordinates.y = newLookatCoordinates.y;
    var lookAtParam = {
      type: 1,
      delayTime: 0.0,
      durationTime: 2.0,
      coordinates: [[newLookatCoordinates.y, newLookatCoordinates.x]],
      loopTimes: 1,
      random: true,
      backToFront: false,
    };
    const self = this;
    this.ica.command.SendLookAtAssetList().then((result) => {
      if (result.success == false) {
        return;
      }

      // get look at parameter
      var paramName = undefined;
      if (result.assets !== undefined && result.assets.length > 0) {
        paramName = result.assets[0];
      }

      this.ica.command
        .SendLookAt(
          lookAtParam.type,
          lookAtParam.delayTime,
          lookAtParam.durationTime,
          lookAtParam.coordinates,
          lookAtParam.loopTimes,
          lookAtParam.random,
          lookAtParam.backToFront,
          paramName
        )
        .then((result) => {})
        .catch((error) => {
          throw new Error(
            `Error in ICAAvatar.updateFacialExpression: ${error}`
          );
        });
    });
  }

  convertDetectionToLookatCoordinates({ detections }) {
    if (detections.length == 0) {
      return null;
    }
    const detection = detections[0];
    const face = detection.detection.box;
    const revertX = this.webcamSize.width - face.x; // detected face x is from right to left

    const boxcenterPercentX =
      ((face.width - revertX) / 2 + revertX) / this.webcamSize.width;
    const boxcenterPercentY =
      ((face.height - face.y) / 2 + face.y) / this.webcamSize.height;

    const lookatX =
      (this.lookatCoordinatesBounderies.right -
        this.lookatCoordinatesBounderies.left) *
        boxcenterPercentX +
      this.lookatCoordinatesBounderies.left;
    const lookatY =
      (this.lookatCoordinatesBounderies.bottom -
        this.lookatCoordinatesBounderies.top) *
        boxcenterPercentY +
      this.lookatCoordinatesBounderies.top;

    return { x: lookatX, y: lookatY };
  }

  // ICA avtar replicate the sentiment of the user so no need to update the sentiment according to the message
  async updateSentiment({ message }) {}

  startIdleAnimation({ document, avatar }) {}

  startSpeechAnimation({ document }) {
    this.updateState({ state: ICAAvatar.STATE_TALK });
  }

  async speak({ text, textToSpeech, onSpeechEnd }) {
    textToSpeech
      .speak({
        text: text,
        onSpeechEnd: onSpeechEnd,
      })
      .catch((error) => {
        throw new Error(`Error in ICAAvatar.speak: ${error}`);
      });
  }

  port;
  canvasSize;
  webcamSize;
  fps;
  bitrate;
  states;
  currentState;
  facialProfiles;
  currentSentimentString;
  animationEnabled;
  animationPools;
  animationTime;
  animationTimerId;
  imitateExpressionEnabled;
  lookAtEnabled;
  lookatCoordinates;
  lookatCoordinatesBounderies;
  cameraDetectionInterval;

  remoteVideo;
  ica;
  webcamVideo;
  cameraDetectionIntervalId;

  static SENTIMENT_HAPPY = "happy";
  static SENTIMENT_DEFAULT = "default";
  static SENTIMENT_SAD = "sad";

  static REMOTEVIDEO_ID = "remoteVideo";
  static WEBCAMVIDEO_ID = "webcamVideo";

  _getSentimentString({ score }) {
    if (score >= 0) {
      return ICAAvatar.SENTIMENT_HAPPY;
    }
    if (score >= -0.25) {
      return ICAAvatar.SENTIMENT_DEFAULT;
    }
    return ICAAvatar.SENTIMENT_SAD;
  }
}
