import { Util } from "../../util.js";
import { VideoAvatar } from "./video_avatar.js";

export class BufferedVideoAvatar extends VideoAvatar {
  constructor({
    baseUrl = "",
    idleVideoList = {},
    idleWaitingVideoList,
    speechVideoList = {},
    speechWaitingVideoList,
    defaultSentimentString = VideoAvatar.SENTIMENT_DEFAULT,
    waitingTime = 600000,
    numberToReturnToTalk = 1,
    noSentiment = false,
    videoType = "webm",
  }) {
    super({
      baseUrl: baseUrl,
      idleVideoList: idleVideoList,
      idleWaitingVideoList: idleWaitingVideoList,
      speechVideoList: speechVideoList,
      speechWaitingVideoList: speechWaitingVideoList,
      defaultSentimentString: defaultSentimentString,
      waitingTime: waitingTime,
      numberToReturnToTalk: numberToReturnToTalk,
      noSentiment: noSentiment,
      videoType: videoType,
    });
    this.idleVideoIndex = 0;
    this.speechVideoIndex = 0;
    this.lastVideoId = "";
  }

  init({ document }) {
    super.init({ document: document });
    this.sentimentString = this.defaultSentimentString;
    this._clearTimer();
    this.countToReturnToTalk = -1;
  }

  getVideoHTML({ videoId, videoSourceId, videoList, idPrefix = "" }) {
    var videoHTML = "";
    for (let sentiment in videoList) {
      for (var i = 0; i < videoList[sentiment].length; i++) {
        videoHTML += `<video id="${
          videoId +
          "_" +
          (idPrefix != "" ? idPrefix + "_" : "") +
          sentiment +
          "_" +
          i
        }" autoplay muted loop playsinline hidden>
          <source id="${
            videoSourceId +
            "_" +
            (idPrefix != "" ? idPrefix + "_" : "") +
            sentiment +
            "_" +
            i
          }" src="${this._getFullUrl({
          path: videoList[sentiment][i],
        })}" type="video/${this.videoType}" />
        </video>`;
      }
    }
    return videoHTML;
  }

  addAvatarContent({ document }) {
    Util.showLoadingModalDialog({
      document: document,
      title: "Loading avatar data...",
      message: "Please wait while the avatar data is loaded.",
    });
    const avatarElement = document.getElementById("avatar");
    avatarElement.innerHTML =
      this.getVideoHTML({
        videoId: VideoAvatar.IDLE_VIDEO_ID,
        videoSourceId: VideoAvatar.IDLE_VIDEO_SOURCE_ID,
        videoList: this.idleVideoList,
      }) +
      this.getVideoHTML({
        videoId: VideoAvatar.SPEECH_VIDEO_ID,
        videoSourceId: VideoAvatar.SPEECH_VIDEO_SOURCE_ID,
        videoList: this.speechVideoList,
      });
    if (this._hasIdleWaitingVideoList()) {
      avatarElement.innerHTML += this.getVideoHTML({
        videoId: VideoAvatar.IDLE_VIDEO_ID,
        videoSourceId: VideoAvatar.IDLE_VIDEO_SOURCE_ID,
        videoList: this.idleWaitingVideoList,
        idPrefix: "waiting",
      });
    }
    if (this._hasSpeechWaitingVideoList()) {
      avatarElement.innerHTML += this.getVideoHTML({
        videoId: VideoAvatar.SPEECH_VIDEO_ID,
        videoSourceId: VideoAvatar.SPEECH_VIDEO_SOURCE_ID,
        videoList: this.speechWaitingVideoList,
        idPrefix: "waiting",
      });
    }
    Util.closeModalDialog({ document: document });
    this._updateAvatarContent({ document: document });
    this._setCharacterTimer({ document: document, avatar: this });
    this.startIdleAnimation({ document: document, avatar: this });
  }

  // Change Character Animation for Waiting Mode.
  // Because of this method will be called by the Global scope, "characterManager" is used instead of "this" (TODO: should be corrected).
  waitingTimer({ document, avatar }) {
    avatar._clearTimer();
    avatar.countToReturnToTalk = avatar.numberToReturnToTalk;
    avatar._updateAvatarContent({ document: document });
    avatar.startIdleAnimation({ document: document, avatar: avatar });
  }

  async updateSentiment({ message }) {
    this._clearTimer();
    if (this.countToReturnToTalk > 0) {
      this.countToReturnToTalk -= 1;
      if (this.countToReturnToTalk <= 0) {
        this._updateAvatarContent({ document: document });
      }
    }

    if (this.noSentiment) {
      this.sentimentString = this.defaultSentimentString;
      return;
    }

    try {
      let result = await this.sentiment.analyze({ text: message });
      this.sentimentString = this._getSentimentString({
        score: result,
      });
    } catch (error) {
      // From this object historyManager is not accessible, so the exception is thrown with the error message.
      throw new Error(`Error in VideoAvatar.updateSentiment: ${error}`);
    }
  }

  // Remove content from the document.
  removeAvatarContent({ document }) {
    this._clearTimer();
    super.removeAvatarContent({ document: document });
  }

  _updateAvatarContent({ document }) {
    if (this.countToReturnToTalk > 0) {
      this.speechVideoIndex = Util.getIndexRandomly({
        list: this.speechWaitingVideoList[this.sentimentString],
      });
      this.idleVideoIndex = Util.getIndexRandomly({
        list: this.idleWaitingVideoList[this.sentimentString],
      });
      return;
    }
    this.speechVideoIndex = Util.getIndexRandomly({
      list: this.speechVideoList[this.sentimentString],
    });
    this.idleVideoIndex = Util.getIndexRandomly({
      list: this.idleVideoList[this.sentimentString],
    });
  }

  startIdleAnimation({ document, avatar }) {
    avatar._updateAvatarContent({ document: document });
    var prefix = avatar.countToReturnToTalk > 0 ? "waiting_" : "";
    var newVideoId =
      VideoAvatar.IDLE_VIDEO_ID +
      "_" +
      prefix +
      avatar.sentimentString +
      "_" +
      avatar.idleVideoIndex;
    var elm = document.getElementById(newVideoId);
    elm.hidden = false;
    elm.play();
    if (avatar.lastVideoId != "" && avatar.lastVideoId != newVideoId) {
      document.getElementById(avatar.lastVideoId).hidden = true;
    }
    avatar.lastVideoId = newVideoId;
    if (avatar.countToReturnToTalk <= 0) {
      avatar._setCharacterTimer({
        avatar: avatar,
      });
    }
  }

  startSpeechAnimation({ document }) {
    this._updateAvatarContent({ document: document });
    var prefix = this.countToReturnToTalk > 0 ? "waiting_" : "";
    var newVideoId =
      VideoAvatar.SPEECH_VIDEO_ID +
      "_" +
      prefix +
      this.sentimentString +
      "_" +
      this.speechVideoIndex;
    var elm = document.getElementById(newVideoId);
    elm.hidden = false;
    elm.play();
    if (this.lastVideoId != "") {
      document.getElementById(this.lastVideoId).hidden = true;
    }
    this.lastVideoId = newVideoId;
  }

  idleVideoIndex;
  speechVideoIndex;
  lastVideoId;
}
