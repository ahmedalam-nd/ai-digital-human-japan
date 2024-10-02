import { Util } from "../util.js";

export class BackgroundManager {
  constructor({
    document = null,
    backgroundList,
    language = "English",
    defaultBackgroundIndex = 0,
  }) {
    this.document = document;
    this.backgroundList = backgroundList;
    if (
      defaultBackgroundIndex >= 0 &&
      defaultBackgroundIndex < backgroundList.length
    ) {
      this.changeBackground({
        index: defaultBackgroundIndex,
        language: language,
      });
    } else {
      this.changeBackground({
        index: Util.getIndexRandomly({ list: this.backgroundList }),
        language: language,
      });
    }
    this.createBackgroundList({ language: language });
  }

  document = null;
  backgroundIndex = -1;
  static LIST_ID = "backgroundList";

  backgroundList = [];

  clearBackground() {
    if (this.document.getElementById("avatar_background_iframe") != null) {
      this.document
        .getElementById("avatar_background")
        .removeChild(this.document.getElementById("avatar_background_iframe"));
    }
    if (this.document.getElementById("avatar_background") != null) {
      this.document.getElementById("avatar_background").style.backgroundImage =
        "none";
    }
    if (this.document.getElementById("avatar_background_video") != null) {
      this.document
        .getElementById("avatar_background")
        .removeChild(this.document.getElementById("avatar_background_video"));
    }
  }

  changeBackground({ index, language = "English" }) {
    if (index == this.backgroundIndex) {
      return;
    }
    this.backgroundIndex = index;
    if (this.document == null) {
      return;
    }
    // Nothing happen, if the item is null because of the delimiter specified in the list.
    if (this.backgroundList[index] == null) {
      return;
    }

    this.clearBackground();
    this.updateBackground({ language: language });
  }

  updateBackground({ language }) {
    var newBackground = this.backgroundList[this.backgroundIndex];
    if (newBackground.type == "iframe") {
      let iframeTag = this.document.createElement("iframe");
      iframeTag.id = "avatar_background_iframe";
      iframeTag.loading = "lazy";
      iframeTag.src = newBackground.url;
      iframeTag.allowfullscreen = "true";
      iframeTag.reffererPolicy = "no-referrer-when-downgrade";
      iframeTag.frameBorder = "0";
      iframeTag.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      this.document.getElementById("avatar_background").appendChild(iframeTag);
    } else if (newBackground.type == "image") {
      this.document.getElementById("avatar_background").style.backgroundImage =
        newBackground.url;
    } else if (newBackground.type == "video") {
      let videoTag = this.document.createElement("video");
      videoTag.id = "avatar_background_video";
      videoTag.autoplay = "autoplay";
      videoTag.loop = "loop";
      videoTag.muted = "muted";
      videoTag.src = newBackground.url;
      videoTag.allowfullscreen = "true";
      videoTag.reffererPolicy = "no-referrer-when-downgrade";
      videoTag.frameBorder = "0";
      videoTag.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      this.document.getElementById("avatar_background").appendChild(videoTag);
    } else if (newBackground.type == "camera") {
      let videoTag = this.document.createElement("video");
      videoTag.id = "avatar_background_video";
      videoTag.autoplay = "autoplay";
      videoTag.loop = "loop";
      videoTag.muted = "muted";
      videoTag.allowfullscreen = "true";
      videoTag.reffererPolicy = "no-referrer-when-downgrade";
      videoTag.frameBorder = "0";
      videoTag.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      this.document.getElementById("avatar_background").appendChild(videoTag);
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then(function (stream) {
            videoTag.srcObject = stream;
            videoTag.play();
          });
      }
    }

    this.document.getElementById("avatar").style.backdropFilter =
      newBackground.backdropFilter;

    // Update the Tour List according to the background index
    this.getCurrentBackground().createTourList({
      document: this.document,
      language: language,
    });
  }

  createBackgroundList({ language }) {
    if (this.document == null) {
      return;
    }
    let targetList = [];
    for (let i = 0; i < this.backgroundList.length; i++) {
      targetList.push(this.backgroundList[i].getName({ language: language }));
    }
    Util.createList({
      document: this.document,
      listId: BackgroundManager.LIST_ID,
      targetList: targetList,
      selectedIndex: this.backgroundIndex,
    });
  }

  getCurrentBackground() {
    return this.backgroundList[this.backgroundIndex];
  }

  changeLanguage({ language }) {
    this.createBackgroundList({ language: language });
    this.getCurrentBackground().createTourList({
      document: this.document,
      language: language,
    });
  }
}
