import { TextToSpeech } from "./text_to_speech.js";

export class OpenAITTS extends TextToSpeech {
  // Whichever voice: alloy, echo, fable, onyx, nova, or shimmer
  constructor({ model = "tts-1", voiceName, rate = 1.0, apiKey }) {
    super({
      languageCode: "",
      voiceName: voiceName,
      rate: rate,
    });
    this.model = model;
    this.apiKey = apiKey;
  }

  model;
  static openaiUrl = "https://api.openai.com/v1/audio/speech";
  apiKey;

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

    let data = {
      model: this.model,
      input: text,
      voice: this.voiceName,
      response_format: "mp3",
      speed: this.rate,
    };

    const otherparam = {
      headers: {
        Accept: "audio/mpeg",
        "content-type": "application/json",
        Authorization: "Bearer " + this.apiKey,
      },
      method: "POST",
      body: JSON.stringify(data),
      responseType: "arraybuffer",
    };

    fetch(OpenAITTS.openaiUrl, otherparam)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch" + response.statusText);
        }
        return response.arrayBuffer();
      })
      .then((res) => {
        try {
          // const buffer = Buffer.from(res.data);
          this.audio = new Audio(
            window.URL.createObjectURL(
              new Blob([res], {
                type: "audio/mpeg",
              })
            )
          );
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
        } catch (e) {
          console.log(e);
        }
      })
      .catch((error) => {
        throw new Error(`Error in OpenAITTS.speak: ${error}`);
      });
    return true;
  }
}
