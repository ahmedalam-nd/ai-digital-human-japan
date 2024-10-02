export class Avatar {
  constructor({ baseUrl = "" } = {}) {
    this.baseUrl = baseUrl;
  }

  baseUrl;

  init({ document }) {}

  async speak({ text, textToSpeech, onSpeechEnd }) {
    textToSpeech
      .speak({
        text: text,
        onSpeechEnd: onSpeechEnd,
      })
      .catch((error) => {
        throw new Error(`Error in Avatar.speak: ${error}`);
      });
  }

  async updateSentiment({ message }) {
    throw new Error("This method is abstract.");
  }

  // Add content to the document.
  addAvatarContent({ document }) {
    throw new Error("This method is abstract.");
  }

  // Remove content from the document.
  removeAvatarContent({ document }) {
    document.getElementById("avatar").innerHTML = "";
  }

  startIdleAnimation({ document, avatar }) {
    throw new Error("This method is abstract.");
  }

  startSpeechAnimation({ document }) {
    throw new Error("This method is abstract.");
  }
}
