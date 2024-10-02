import { Sentiment } from "../../sentiment.js";
import { Util } from "../../util.js";
import { apiKeys } from "../../apikeys.js";
import { Avatar } from "../avatar.js";

export class VideoAvatar extends Avatar {
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
    super({ baseUrl: baseUrl });
    this.idleVideoList = idleVideoList;
    this.idleWaitingVideoList = idleWaitingVideoList;
    this.speechVideoList = speechVideoList;
    this.speechWaitingVideoList = speechWaitingVideoList;
    this.defaultSentimentString = defaultSentimentString;
    this.sentimentString = defaultSentimentString;
    this.waitingTime = waitingTime;
    this.waitingTimerId = null;
    this.numberToReturnToTalk = numberToReturnToTalk;
    this.countToReturnToTalk = -1;
    this.noSentiment = noSentiment;
    this.videoType = videoType;
  }

  init({ document }) {
    super.init({ document: document });
    this.sentimentString = this.defaultSentimentString;
    this._clearTimer();
    this.countToReturnToTalk = -1;
  }

  addAvatarContent({ document }) {
    document.getElementById(
      "avatar"
    ).innerHTML = `<video id="idle_video" autoplay muted loop playsinline>
          <source id="idle_video_source" src="" type="video/${this.videoType}" />
        </video>
        <video id="speech_video" autoplay muted loop playsinline hidden>
          <source id="speech_video_source" src="" type="video/${this.videoType}" />
        </video>`;
    this._updateAvatarContent({ document: document });
    this._setCharacterTimer({ document: document, avatar: this });
  }

  // Change Character Animation for Waiting Mode.
  // Because of this method will be called by the Global scope, "characterManager" is used instead of "this" (TODO: should be corrected).
  waitingTimer({ document, avatar }) {
    avatar._clearTimer();
    avatar._updateVideoSrc({
      document: document,
      videoElementId: VideoAvatar.IDLE_VIDEO_ID,
      videoSrcElementId: VideoAvatar.IDLE_VIDEO_SOURCE_ID,
      newSrc: avatar._getRandomIdleWaitingVideo(),
    });
    avatar._updateVideoSrc({
      document: document,
      videoElementId: VideoAvatar.SPEECH_VIDEO_ID,
      videoSrcElementId: VideoAvatar.SPEECH_VIDEO_SOURCE_ID,
      newSrc: avatar._getRandomSpeechWaitingVideo(),
    });
    avatar.countToReturnToTalk = avatar.numberToReturnToTalk;
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
    this._updateVideoSrc({
      document: document,
      videoElementId: VideoAvatar.IDLE_VIDEO_ID,
      videoSrcElementId: VideoAvatar.IDLE_VIDEO_SOURCE_ID,
      newSrc: this._getRandomIdleVideoList(),
    });
    this._updateVideoSrc({
      document: document,
      videoElementId: VideoAvatar.SPEECH_VIDEO_ID,
      videoSrcElementId: VideoAvatar.SPEECH_VIDEO_SOURCE_ID,
      newSrc: this._getRandomSpeechVideo(),
    });
  }

  startIdleAnimation({ document, avatar }) {
    if (avatar.countToReturnToTalk <= 0) {
      avatar._updateAvatarContent({ document: document });
    }
    let elm = document.getElementById(VideoAvatar.IDLE_VIDEO_ID);
    elm.hidden = false;
    elm.play();
    document.getElementById(VideoAvatar.SPEECH_VIDEO_ID).hidden = true;
    avatar._setCharacterTimer({ document: document, avatar: avatar });
  }

  startSpeechAnimation({ document }) {
    if (this.countToReturnToTalk <= 0) {
      this._updateAvatarContent({ document: document });
    }
    var elm = document.getElementById(VideoAvatar.SPEECH_VIDEO_ID);
    elm.hidden = false;
    elm.play();
    document.getElementById(VideoAvatar.IDLE_VIDEO_ID).hidden = true;
  }

  static IDLE_VIDEO_ID = "idle_video";
  static IDLE_VIDEO_SOURCE_ID = "idle_video_source";
  static SPEECH_VIDEO_ID = "speech_video";
  static SPEECH_VIDEO_SOURCE_ID = "speech_video_source";

  idleVideoList;
  idleWaitingVideoList;
  speechVideoList;
  speechWaitingVideoList;

  sentiment = new Sentiment({ apiKey: apiKeys.google_sentiment_analysis });
  defaultSentimentString;
  sentimentString;
  waitingTime;
  waitingTimerId;
  numberToReturnToTalk;
  countToReturnToTalk;
  noSentiment;
  videoType;

  static SENTIMENT_HAPPY = "happy";
  static SENTIMENT_DEFAULT = "default";
  static SENTIMENT_NEUTRAL = "neutral";
  static SENTIMENT_SAD = "sad";

  _hasIdleWaitingVideoList() {
    return (
      this.idleWaitingVideoList != null && this.idleWaitingVideoList.length > 0
    );
  }

  _hasSpeechWaitingVideoList() {
    return (
      this.speechWaitingVideoList != null &&
      this.speechWaitingVideoList.length > 0
    );
  }

  _setCharacterTimer({ document, avatar }) {
    if (
      avatar.waitingTime <= 0 ||
      avatar.numberToReturnToTalk <= 0 ||
      !avatar._hasIdleWaitingVideoList() ||
      !avatar._hasSpeechWaitingVideoList()
    ) {
      return;
    }
    avatar.waitingTimerId = setTimeout(
      avatar.waitingTimer.bind(undefined, {
        document: document,
        avatar: avatar,
      }),
      avatar.waitingTime
    );
  }

  _getSentimentString({ score }) {
    if (score >= 0.25) {
      return VideoAvatar.SENTIMENT_HAPPY;
    }
    if (score >= 0.0) {
      return VideoAvatar.SENTIMENT_DEFAULT;
    }
    if (score >= -0.25) {
      return VideoAvatar.SENTIMENT_NEUTRAL;
    }
    return VideoAvatar.SENTIMENT_SAD;
  }

  _clearTimer() {
    if (this.waitingTimerId != null || this.waitingTimerId >= 0) {
      clearTimeout(this.waitingTimerId);
      this.waitingTimerId = null;
    }
  }

  _getFullUrl({ path }) {
    return this.baseUrl + path;
  }

  _getRandomIdleVideoList() {
    return this._getFullUrl({
      path: Util.getElementRandomly({
        list: this.idleVideoList[this.sentimentString],
      }),
    });
  }

  _getRandomIdleWaitingVideo() {
    return this._getFullUrl({
      path: Util.getElementRandomly({
        list: this.idleWaitingVideoList[this.sentimentString],
      }),
    });
  }

  _getRandomSpeechVideo() {
    return this._getFullUrl({
      path: Util.getElementRandomly({
        list: this.speechVideoList[this.sentimentString],
      }),
    });
  }

  _getRandomSpeechWaitingVideo() {
    return this._getFullUrl({
      path: Util.getElementRandomly({
        list: this.speechWaitingVideoList[this.sentimentString],
      }),
    });
  }

  _updateVideoSrc({ document, videoElementId, videoSrcElementId, newSrc }) {
    if (document == null) {
      return;
    }
    var videoSrcElement = document.getElementById(videoSrcElementId);
    if (videoSrcElement.getAttribute("src") == newSrc) {
      return;
    }
    videoSrcElement.setAttribute("src", newSrc);
    document.getElementById(videoElementId).load();
  }
}
