import { TextToSpeech } from "./text_to_speech.js";

export class Sbv2TTS extends TextToSpeech {
  // Whichever voice: alloy, echo, fable, onyx, nova, or shimmer
  constructor({ model, voiceName, port = 5000 }) {
    super({
      languageCode: "",
      voiceName: voiceName,
    });
    this.model = model;
    this.port = port;
    //this.url = `http://127.0.0.1:${this.port}/voice`
    //this.url = `http://20.115.45.221:${this.port}/voice` // Azure CPU machine
    this.url = `http://20.97.204.65:${this.port}/voice`; // Azure GPU machine
  }

  model;
  port;
  url;

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

    let data = new URLSearchParams({
      text: text,
      encoding: "utf-8",
      model_id: this.model,
      //speaker_id: this.voiceName,
      sdp_ratio: 0.2,
      noise: 0.6,
      noisew: 0.8,
      language: "JP",
      auto_split: true,
      split_interval: 0.5,
      assist_text: "",
      assist_text_weight: 1,
      style: "Neutral",
      style_weight: 5,
    });

    const otherparam = {
      headers: {
        Accept: "audio/mpeg",
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
      responseType: "arraybuffer",
    };

    fetch(this.url + "?" + data.toString(), otherparam)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch" + response.statusText);
        }
        return response.arrayBuffer();
      })
      .then((res) => {
        try {
          // const buffer = Buffer.from(res.data);
          var oBlob = new Blob([res], {
            type: "audio/mpeg",
          });

          var blobUrl = window.URL.createObjectURL(oBlob);
          if (this.isSpeaking()) {
            this.audio.pause();
          }
          this.audio = new Audio(blobUrl);
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
            this.isplaying = true;
          };
          this.audio.onended = () => {
            this.isplaying = false;
          };
          this.audio.onpause = () => {
            this.isplaying = false;
          };
          this.audio.play();
        } catch (e) {
          console.log(e);
        }
      })
      .catch((error) => {
        throw new Error(`Error in Sbv2TTS.speak: ${error}`);
      });
    return true;
  }
}
