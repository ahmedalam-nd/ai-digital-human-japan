import { TextToSpeech } from "./text_to_speech.js";

export class ICloneNoTTS extends TextToSpeech {
  constructor({ icaAvatar }) {
    super({
      languageCode: "",
      voiceName: "",
    });
    this.icaAvatar = icaAvatar;
  }

  static messageEraseDuration = 10000;

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
    this.icaAvatar.ica.command.onSpeakCompleted = null;
    this.icaAvatar.remoteVideo.muted = !this.enabled;
    this.icaAvatar.ica.command
      .SendSpeak(text)
      .then((result) => {
        this.icaAvatar.ica.command.onSpeakCompleted = () => {
          this.terminateSpeech({
            onSpeechEnd: onSpeechEnd,
          });
        };
      })
      .catch((error) => {
        throw new Error(`Error in ICloneNoTTS.speak: ${error}`);
      });

    return true;
  }
}
