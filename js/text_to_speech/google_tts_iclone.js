import { GoogleTTS } from "./google_tts.js";

export class GoogleTTSIClone extends GoogleTTS {
  constructor({
    languageCode,
    voiceName,
    rate,
    pitch,
    apiKey,
    ssmlDict,
    icaAvatar,
  }) {
    super({
      languageCode: languageCode,
      voiceName: voiceName,
      rate: rate,
      pitch: pitch,
      apiKey: apiKey,
      audioEncoding: "MP3",
      ssmlDict: ssmlDict,
    });
    this.icaAvatar = icaAvatar;
  }

  static messageEraseDuration = 10000;

  // The main method to speak the text.
  async speak({ text, onSpeechEnd }) {
    if (this.isSpeaking()) {
      return false;
    }
    this.onSpeechEnd = onSpeechEnd;
    this.icaAvatar.ica.command.onSpeakCompleted = null;

    var audioData;
    try {
      audioData = await this.getAudioBase64({ text: text });
    } catch (error) {
      throw new Error(`Error in GoogleTTSIClone.speak: ${error}`);
    }
    this.icaAvatar.remoteVideo.muted = !this.enabled;
    this.icaAvatar.ica.command
      .SendVoice(audioData, "mp3")
      .then((result) => {
        this.icaAvatar.ica.command.onSpeakCompleted = () => {
          this.terminateSpeech({
            onSpeechEnd: onSpeechEnd,
          });
        };
      })
      .catch((error) => {
        throw new Error(`Error in GoogleTTSIClone.speak: ${error}`);
      });
  }
}
