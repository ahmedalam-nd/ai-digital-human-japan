import { Character } from "./character.js";
import { Util } from "../util.js";

export class AOAICharacter extends Character {
  constructor({
    characterId,
    firstName,
    lastName,
    language,
    avatar,
    apiKey,
    textToSpeech,
    speechToText,
    prompt,
    errorNotificationMessages,
    extraContents,
    waitingFillMessages,
  }) {
    super({
      characterId: characterId,
      firstName: firstName,
      lastName: lastName,
      language: language,
      avatar: avatar,
      textToSpeech: textToSpeech,
      speechToText: speechToText,
      prompt: prompt,
      errorNotificationMessages: errorNotificationMessages,
      extraContents: extraContents,
      waitingFillMessages: waitingFillMessages,
    });
    this.apiKey = apiKey;
  }

  static END_POINT_URL =
    "https://aoai-dh-trials.openai.azure.com/openai/deployments/af01-gp4/chat/completions?api-version=2024-02-15-preview";

  async fetch({ humanText, apiKey, scene }) {
    return await fetch(AOAICharacter.END_POINT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "api-key": this.apiKey,
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
        throw new Error(`Error in AOAICharacter.fetch: ${error}`);
      })
      .then((json) => {
        return json.choices[0].message.content;
      })
      .catch((error) => {
        return this.errorHandling({
          errorMessage: AOAICharacter.HTTP_ERROR_MESSAGE,
          historyManager: this.prompt.historyManager,
          sceneId: scene.sceneId,
          occurredFunction: "AOAICharacter.fetch",
          error: error,
        });
      });
  }
}
