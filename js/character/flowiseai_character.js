import { Character } from "./character.js";

export class FlowiseAICharacter extends Character {
  constructor({
    characterId,
    firstName,
    lastName,
    language,
    avatar,
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
      waitingTime: waitingTime,
      textToSpeech: textToSpeech,
      speechToText: speechToText,
      prompt: prompt,
      errorNotificationMessages: errorNotificationMessages,
      extraContents: extraContents,
      waitingFillMessages: waitingFillMessages,
    });
  }

  static END_POINT_URL =
    "https://flowiseai.replit.app/api/v1/prediction/dc168225-a963-4d9b-b945-4a4b57bb43f0";

  async fetch({ humanText, apiKey, scene }) {
    return await fetch(FlowiseAICharacter.END_POINT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        Authorization:
          "Bearer " + "B2X+s4N/XuwSNjUImCuDmxHb6WciCWaF/PuzVAzHGQw=",
      },
      body: JSON.stringify({
        question: `日本語で情報があれば、講演者、時間、タイトル、概要など周辺的な情報も含めて質問に答えてください。${humanText}`,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: Status: ${response.status}`);
        }
        return await response.json();
      })
      .catch((error) => {
        return this.errorHandling({
          errorMessage: Character.HTTP_ERROR_MESSAGE,
          historyManager: this.prompt.historyManager,
          sceneId: scene.sceneId,
          occurredFunction: "FlowiseAICharacter.fetch",
          error: error,
        });
      });
  }
}
