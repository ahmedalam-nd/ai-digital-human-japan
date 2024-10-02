export class TextToSpeech {
  constructor({ languageCode, voiceName, rate = 1.0, pitch = 1.0 }) {
    this.languageCode = languageCode;
    this.voiceName = voiceName;
    this.rate = rate;
    this.pitch = pitch;
    this.init();
  }

  languageCode;
  voiceName;
  rate;
  pitch;
  onSpeechEnd;
  enabled = true;

  audio;
  playing = false;
  audioTimer = null;

  init({ enabled = null } = {}) {
    if (enabled == null) {
      enabled = this.enabled;
    }
    this.stop();

    if (this.audioTimer != null) {
      this.audioTimer = clearTimeout(this.audioTimer);
    }
    this.audio = new Audio();
    this.setEnabled({ value: enabled });
  }

  // The method to return whether the TTS is speaking.
  isSpeaking() {
    return this.playing;
  }

  // This method must be overridden by the subclass.
  // Return whether the TTS can be used.
  async speak({ text, onSpeechEnd }) {
    if (this.isSpeaking()) {
      return false;
    }
    this.onSpeechEnd = onSpeechEnd;
    return true;
  }

  // The method to stop the TTS.
  stopTTS() {
    this.audio.pause();
  }

  stop() {
    if (!this.isSpeaking()) {
      return;
    }
    if (this.onSpeechEnd == null) {
      return;
    }
    this.stopTTS();
    this.terminateSpeech({
      onSpeechEnd: this.onSpeechEnd,
    });
  }

  setEnabled({ value }) {
    this.enabled = value;
    if (this.audio == null) {
      return;
    }
    this.audio.muted = !this.enabled;
  }

  terminateSpeech({ onSpeechEnd }) {
    if (onSpeechEnd != null) {
      onSpeechEnd.call();
    }
  }

  // Base64 → Blob
  _base64ToBlob({ base64 }) {
    var bin = atob(base64.replace(/^.*,/, ""));
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
    }
    return new Blob([buffer.buffer], { type: "audio/wav" });
  }
}
