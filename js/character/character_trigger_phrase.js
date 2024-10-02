import { NoiseRemover } from "../noise_remover.js";
import { FunctionCallingCharacter } from "./function_calling_character.js";

export class CharacterTriggerPhrase extends FunctionCallingCharacter {
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
    functions = [],
    triggerPhraseList = [],
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
      functions: functions,
    });
    this.triggerPhraseList = triggerPhraseList;
  }

  triggerPhraseList;

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

    for (var i = 0; i < this.triggerPhraseList.length; i++) {
      // If the human text includes the trigger phrase, add the message to the prompt and then remove the trigger phrase from the human text.
      if (humanText.includes(this.triggerPhraseList[i])) {
        this.prompt.pushMessage({
          sceneId: scene.sceneId,
          characterId: this.characterId,
          role: "user",
          content: humanText,
        });
        return humanText.replace(this.triggerPhraseList[i], "");
      }
    }
    // Otherwise, return empty string to ignore taht human text.
    return "";
  }
}
