import { Util } from "../util.js";
import { NoiseRemover } from "../noise_remover.js";

export class Character {
  constructor({
    characterId,
    firstName = "",
    lastName = "",
    language = "",
    avatar = null,
    textToSpeech = null,
    speechToText = null,
    prompt = null,
    errorNotificationMessages = {},
    extraContents = [],
    waitingFillMessages = [],
    waitingFillTime = 1000,
    waitingFillPercentage = 0.6,
  }) {
    this.characterId = characterId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.language = language;
    this.avatar = avatar;
    this.textToSpeech = textToSpeech;
    this.speechToText = speechToText;
    this.prompt = prompt;
    this.errorNotificationMessages = errorNotificationMessages;
    this.extraContents = extraContents;
    this.waitingFillMessages = waitingFillMessages;
    this.waitingFillTime = waitingFillTime;
    this.waitingFillPercentage = waitingFillPercentage;
  }

  static END_POINT_URL = "https://api.openai.com/v1/chat/completions";
  static ERROR_TERMINATE_RESPONSE = "ERROR: Terminate response.";
  static HTTP_ERROR_MESSAGE = "HTTP error:";

  init({ document }) {
    if (this.prompt !== null) {
      this.prompt.messages.splice(1); // Remove all chat history except the first system prompt
      this.prompt.historyManager.init();
    }
    this.avatar.init({ document: document });
    for (let extraContent of this.extraContents) {
      extraContent.init();
    }
    this.textToSpeech.init();
    this.speechToText.init();
  }

  addContent({ document }) {
    this.avatar.addAvatarContent({ document: document });
    for (let extraContent of this.extraContents) {
      extraContent.addContent({ document: document });
    }
  }

  // Get the full name of the character
  getFullName() {
    if (
      this.language == "日本語" ||
      this.language == "Japanese" ||
      this.language == "中文 (簡体)" ||
      this.language == "Chinese (Simplified)" ||
      this.language == "中文 (繁體)" ||
      this.language == "Chinese (Traditional)"
    ) {
      return this.lastName + " " + this.firstName;
    }
    return this.firstName + " " + this.lastName;
  }

  getCharacterLabel() {
    return this.getFullName() + " | " + this.language;
  }

  getPrompt() {
    return this.prompt.toMap();
  }

  preProcessText({ humanText, scene }) {
    if (
      !NoiseRemover.isEndedPeriod({
        language: this.language,
        text: humanText,
      })
    ) {
      humanText += this.prompt.period;
    }
    while (this.prompt.messages.length > 10) {
      this.prompt.messages.splice(1, 1);
    }
    this.prompt.pushMessage({
      sceneId: scene.sceneId,
      characterId: this.characterId,
      role: "user",
      content: humanText,
    });
    return humanText;
  }

  async fetch({ humanText, apiKey, scene }) {
    return await fetch(Character.END_POINT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + apiKey,
      },
      body: this.prompt.toJson(),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: Status: ${response.status}`);
        }
        return await response.json();
      })
      .catch((error) => {
        this.prompt.historyManager.recordError({
          sceneId: scene.sceneId,
          characterId: this.characterId,
          errorMessage: error.stack,
        });
        throw new Error(`Error in Character.fetch: ${error}`);
      })
      .then((json) => {
        return NoiseRemover.removeNoise({
          text: json.choices[0].message.content,
        });
      })
      .catch((error) => {
        return this.errorHandling({
          errorMessage: Character.HTTP_ERROR_MESSAGE,
          historyManager: this.prompt.historyManager,
          sceneId: scene.sceneId,
          occurredFunction: "Character.fetch",
          error: error,
        });
      });
  }

  async postProcessText({ characterText, document, scene }) {
    // Error Detection and replace the characterText to the notification message
    for (let key in this.errorNotificationMessages) {
      if (characterText.includes(key)) {
        characterText = Util.getElementRandomly({
          list: this.errorNotificationMessages[key],
        });
        break;
      }
    }

    return this.avatar
      .updateSentiment({ message: characterText })
      .then(() => {
        this.prompt.pushMessage({
          sceneId: scene.sceneId,
          characterId: this.characterId,
          role: "assistant",
          content: characterText,
        });
        return characterText;
      })
      .catch((error) => {
        return this.errorHandling({
          errorMessage: Character.ERROR_TERMINATE_RESPONSE,
          historyManager: this.prompt.historyManager,
          sceneId: scene.sceneId,
          occurredFunction: "Character.postProcessText",
          error: error,
        });
      });
  }

  async speak({ text, onSpeechEnd }) {
    this.avatar
      .speak({
        text: text,
        textToSpeech: this.textToSpeech,
        onSpeechEnd: onSpeechEnd,
      })
      .catch((error) => {
        throw new Error(`Error in Character.speak: ${error}`);
      });
  }

  errorHandling({
    errorMessage,
    historyManager,
    sceneId,
    occurredFunction,
    error,
  }) {
    if (errorMessage in this.errorNotificationMessages) {
      return Util.getElementRandomly({
        list: this.errorNotificationMessages[errorMessage],
      });
    } else {
      historyManager.recordError({
        sceneId: sceneId,
        characterId: this.characterId,
        errorMessage: error.stack,
      });
      throw new Error(`Unexpected error in ${occurredFunction}: ${error}`);
    }
  }

  waitingFillEnabled() {
    return (
      this.waitingFillMessages != null &&
      this.waitingFillMessages.length > 0 &&
      this.waitingFillTime > 0 &&
      this.waitingFillPercentage > 0.0
    );
  }

  characterId;
  firstName;
  lastName;
  language;

  avatar;
  textToSpeech;
  speechToText;

  prompt;
  errorNotificationMessages;
  extraContents;
  waitingFillMessages;
  waitingFillTime;
  waitingFillPercentage;
}
