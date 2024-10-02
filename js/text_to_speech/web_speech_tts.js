import { TextToSpeech } from "./text_to_speech.js";

export class WebSpeechTTS extends TextToSpeech {
  constructor({ languageCode, voiceName, rate = 1.0, pitch = 1.0 }) {
    super({
      languageCode: languageCode,
      voiceName: voiceName,
      rate: rate,
      pitch: pitch,
    });
    this.webSpeechSynthesis = window.speechSynthesis;
    this.audio = null;
  }

  webSpeechSynthesis = null;

  init({ enabled = null } = {}) {
    if (enabled == null) {
      enabled = this.enabled;
    }
    this.stop();
    this.setEnabled({ value: enabled });
  }

  // The method to return whether the TTS is speaking.
  isSpeaking() {
    if (this.webSpeechSynthesis == null) {
      return false;
    }
    return this.webSpeechSynthesis.speaking;
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

    var utterance = new SpeechSynthesisUtterance();
    var voicename = this.voiceName;
    utterance.voice = this.webSpeechSynthesis
      .getVoices()
      .filter(function (voice) {
        return voice.name == voicename;
      })[0];
    utterance.volume = this.enabled ? 1 : 0;
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;
    utterance.lang = this.languageCode;
    utterance.text = text;

    // Make sure to bind the terminateSpeech function to the onEnd event handler.
    utterance.onend = () => {
      this.terminateSpeech({
        onSpeechEnd: onSpeechEnd,
      });
    };
    this.webSpeechSynthesis.speak(utterance);
    return true;
  }

  stopTTS() {
    if (this.webSpeechSynthesis == null) {
      return;
    }
    this.webSpeechSynthesis.cancel();
  }

  setEnabled({ value }) {
    super.setEnabled({ value: value });
    if (this.webSpeechSynthesis == null) {
      return;
    }
    this.stop();
  }
}
