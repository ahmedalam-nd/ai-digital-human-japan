import { Util } from "../../util.js";
import { Avatar } from "../avatar.js";
import { CircularAudioWave } from "./circular-audio-wave.js";

class CircularAudioAvatar extends Avatar {
  constructor({ mode = null } = {}) {
    super({ baseUrl: "" });
    this.mode = mode;
  }

  mode;
  wave;

  static sampleFileName = "./js/avatar/circular_audio_avatar/sample.mp3";

  init({ document }) {
    super.init({ document: document });
    Util.loadScript({
      document: document,
      src: "https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js",
      defer: true,
    }).then(() => {
      const avatarElement = document.getElementById("avatar");
      avatarElement.innerHTML = `<div id="chart-container" style="width: 100vw; height: 50vh; transform: translateY(30%);"></div>`;
      const chartContainer = document.getElementById("chart-container");
      if (this.mode == "sunburst") {
        this.wave = new CircularAudioWave(chartContainer, {
          mode: "sunburst",
        });
      } else {
        this.wave = new CircularAudioWave(chartContainer);
      }
      this.wave.loadAudio(CircularAudioAvatar.sampleFileName, false, true);
    });
  }

  addAvatarContent({ document }) {
    this.init({ document: document });
    if (window.onresize == null) {
      var self = this;
      window.onresize = () => {
        self.init({ document: document });
      };
    }
  }

  // Remove content from the document.
  removeAvatarContent({ document }) {
    super.removeAvatarContent({ document: document });
    if (this.wave != null) {
      delete this.wave;
    }
    if (window.onresize != null) {
      window.onresize = null;
    }
  }

  async updateSentiment({ message }) {}

  startIdleAnimation({ document, avatar }) {}

  startSpeechAnimation({ document }) {}
}

export var circularAudioAvatar = new CircularAudioAvatar();
export var circularAudioAvatarSunburst = new CircularAudioAvatar({
  mode: "sunburst",
});
