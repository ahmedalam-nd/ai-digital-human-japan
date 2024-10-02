export class SpeechToText {
  constructor({ languageCode = "en" } = {}) {
    this.speaking = false;
    this.enabled = true;
    this.languageCode = languageCode;
  }

  languageCode;
  speaking;
  enabled;
  static onTextResult;

  init({ enabled = null } = {}) {
    if (enabled == null) {
      enabled = this.enabled;
    }
    this.speaking = false;
    this.stop();
    this.setEnabled({ value: enabled });
  }

  setEnabled({ value }) {
    this.enabled = value;
    if (value) {
      this.start();
    } else {
      this.stop();
    }
  }

  // This method should be implemented in the child classes.
  start() {
    throw new Error("Not implemented");
  }

  // This method should be implemented in the child classes.
  stop() {
    throw new Error("Not implemented");
  }

  // This method should be implemented in the child classes.
  terminate() {
    throw new Error("Not implemented");
  }
}
