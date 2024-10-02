import { GoogleTTS } from "./google_tts.js";

export class GoogleTTSCircularAudioWave extends GoogleTTS {
  constructor({
    languageCode,
    voiceName,
    rate,
    pitch,
    apiKey,
    audioEncoding = "MP3",
    ssmlDict,
    circularAudioWave,
  }) {
    super({
      languageCode: languageCode,
      voiceName: voiceName,
      rate: rate,
      pitch: pitch,
      apiKey: apiKey,
      audioEncoding: audioEncoding,
      ssmlDict: ssmlDict,
    });
    this.circularAudioWave = circularAudioWave;
  }

  circularAudioWave;

  // The main method to speak the text.
  async speak({ text, onSpeechEnd }) {
    if (this.isSpeaking()) {
      return false;
    }
    this.onSpeechEnd = onSpeechEnd;

    try {
      var blob = await this.getAudioBlob({ text: text });
    } catch (error) {
      throw new Error(`Error in GoogleTTSCircularAudioWave.speak: ${error}`);
    }
    this.circularAudioWave.wave.loadFromTTS(
      window.URL.createObjectURL(blob),
      onSpeechEnd,
      !this.enabled
    );
    return true;
  }

  setEnabled({ value }) {
    this.enabled = value;
    if (this.circularAudioWave == null || this.circularAudioWave.wave == null) {
      return;
    }
    if (!this.enabled) {
      this.circularAudioWave.wave.muteSourceNode();
    } else {
      this.circularAudioWave.wave.unmuteSourceNode();
    }
  }
}
