import { TextToSpeech } from "./text_to_speech.js";

export class GoogleTTS extends TextToSpeech {
  constructor({
    languageCode,
    voiceName,
    rate = 1.0,
    pitch = 1.0,
    apiKey,
    audioEncoding = "MP3",
    ssmlDict = {},
  }) {
    super({
      languageCode: languageCode,
      voiceName: voiceName,
      rate: rate,
      pitch: pitch,
    });
    this.apiKey = apiKey;
    this.audioEncoding = audioEncoding;
    this.ssmlDict = ssmlDict;
  }

  static googleUrl =
    "https://texttospeech.googleapis.com/v1/text:synthesize?key=";
  apiKey;
  audioEncoding; // https://cloud.google.com/text-to-speech/docs/reference/rest/v1/AudioConfig#AudioEncoding
  ssmlDict;

  async getAudioBase64({ text }) {
    let data = {
      input: {},
      voice: {
        languageCode: this.languageCode,
        name: this.voiceName,
      },
      audioConfig: {
        audioEncoding: this.audioEncoding,
        speaking_rate: this.rate,
        pitch: this.pitch,
      },
    };
    if (this.ssmlDict != null && Object.keys(this.ssmlDict).length > 0) {
      for (const oldS in this.ssmlDict) {
        text = text.replace(new RegExp(oldS, "g"), this.ssmlDict[oldS]);
      }
      data["input"]["ssml"] = "<speak>" + text + "</speak>";
    } else {
      data["input"]["text"] = text;
    }

    const otherparam = {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
      method: "POST",
    };
    const url = GoogleTTS.googleUrl + this.apiKey;

    return fetch(url, otherparam)
      .then((data) => {
        return data.json();
      })
      .catch((error) => {
        throw new Error(`Error in GoogleTTS.getAudioBase64: ${error}`);
      })
      .then((json) => {
        return json.audioContent;
      })
      .catch((error) => {
        throw new Error(`Error in GoogleTTS.getAudioBase64: ${error}`);
      });
  }

  // The main method to speak the text.
  async speak({ text, onSpeechEnd }) {
    if (
      !super.speak({
        text: text,
        onSpeechEnd: onSpeechEnd,
      })
    ) {
      return false;
    }

    this.getAudioBase64({ text: text })
      .then((audioBase64) => {
        this.audio.src = window.URL.createObjectURL(
          this._base64ToBlob({ base64: audioBase64 })
        );
      })
      .catch((error) => {
        throw new Error(`Error in GoogleTTS.speak: ${error}`);
      });

    this.audio.muted = !this.enabled;

    // Make sure to bind the terminateSpeech function to the onEnd event handler.
    this.audio.onloadedmetadata = (e) => {
      this.audioTimer = setTimeout(() => {
        this.terminateSpeech({
          onSpeechEnd: onSpeechEnd,
        });
      }, this.audio.duration * 1000);
    };
    this.audio.onplay = () => {
      this.playing = true;
    };
    this.audio.onended = () => {
      this.playing = false;
    };
    this.audio.onpause = () => {
      this.playing = false;
    };
    this.audio.play();
    return true;
  }
}
