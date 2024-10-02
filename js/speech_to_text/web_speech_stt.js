import { SpeechToText } from "./speech_to_text.js";

export class WebSpeechSTT extends SpeechToText {
  constructor({ languageCode = "en" } = {}) {
    super({ languageCode: languageCode });
  }

  recognizer;

  start() {
    if (!this.recognizer) {
      var SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition != null) {
        this.recognizer = new SpeechRecognition();
      }
    }
    if (!this.recognizer) {
      console.log("Speech recognition is not supported by this browser.");
      return;
    }
    this.recognizer.lang = this.languageCode;
    this.stop();
    if (this.speaking) {
      return;
    }
    if (!this.enabled) {
      return;
    }

    if (!this.recognizer.onresult) {
      this.recognizer.onresult = (event) => {
        this.recognizer.stop();
        if (this.speaking) {
          return;
        }
        for (var i = event.resultIndex; i < event.results.length; i++) {
          if (!event.results[i].isFinal) continue;
          const { transcript } = event.results[i][0];
          console.log(`Recognised: ${transcript}`);
          if (transcript != "") {
            SpeechToText.onTextResult.call(undefined, {
              humanText: transcript,
            });
          }
          return;
        }
      };
    }

    if (!this.recognizer.onend) {
      this.recognizer.onend = () => {
        if (this.speaking) {
          return;
        }
        this.start();
      };
    }

    try {
      this.recognizer.start();
    } catch (e) {
      this.recognizer.stop();
      console.log("Error: " + e);
    }
  }

  stop() {
    if (!this.recognizer) {
      return;
    }
    this.recognizer.abort();
    this.recognizer.stop();
  }

  terminate() {
    this.stop();
    if (!this.recognizer) {
      return;
    }
    this.recognizer.onend = null;
    this.recognizer.onresult = null;
    delete this.recognizer;
  }
}
