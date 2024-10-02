import { AOAICharacter } from "./aoai_character.js";

export class AOAIFunctionCallingCharacter extends AOAICharacter {
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
    functions,
  }) {
    super({
      characterId: characterId,
      firstName: firstName,
      lastName: lastName,
      language: language,
      avatar: avatar,
      apiKey: apiKey,
      textToSpeech: textToSpeech,
      speechToText: speechToText,
      prompt: prompt,
      errorNotificationMessages: errorNotificationMessages,
      extraContents: extraContents,
      waitingFillMessages: waitingFillMessages,
    });
    this.functions = functions;
  }

  functions = [];

  getPrompt() {
    var tools = [];
    for (var i = 0; i < this.functions.length; i++) {
      tools.push({
        type: "function",
        function: this.functions[i].toJson(),
      });
    }

    var payload = super.getPrompt();
    payload.tools = tools;
    payload.tool_choice = "auto";
    return payload;
  }

  getFunctionIndex({ name }) {
    for (var i = 0; i < this.functions.length; i++) {
      if (this.functions[i].name === name) {
        return i;
      }
    }
    return -1;
  }

  async fetch({ humanText, apiKey, scene }) {
    return await fetch(AOAICharacter.END_POINT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "api-key": this.apiKey,
      },
      body: JSON.stringify(this.getPrompt()),
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
        throw new Error(
          `Error in AOAIFunctionCallingCharacter.fetch: ${error}`
        );
      })
      .then(async (json) => {
        const choice = json.choices[0];
        if (
          choice.finish_reason === "tool_calls" &&
          choice.message.tool_calls.length > 0
        ) {
          for (var i = 0; i < choice.message.tool_calls.length; i++) {
            var functionIndex = this.getFunctionIndex({
              name: choice.message.tool_calls[i].function.name,
            });
            if (functionIndex >= 0) {
              const returnArgs = JSON.parse(
                choice.message.tool_calls[i].function.arguments
              );

              // Record called function name and parameters in the historyManager.
              this.prompt.historyManager.recordFunctionCall({
                sceneId: scene.sceneId,
                characterId: this.characterId,
                functionIndex: functionIndex,
                functionName: choice.message.tool_calls[i].function.name,
                parameters: returnArgs,
              });

              this.functions[functionIndex].result = await this.functions[
                functionIndex
              ].call({ parameters: returnArgs });
              this.functions[functionIndex].callOnAvatarTalk = true;
              this.prompt.pushMessage({
                sceneId: scene.sceneId,
                characterId: this.characterId,
                tool_call_id: choice.message.tool_calls[i].id,
                role: "function",
                name: choice.message.tool_calls[i].function.name,
                content: JSON.stringify(this.functions[functionIndex].result),
              });
            }
          }
          return this.fetch({ humanText: humanText, apiKey: apiKey }); // Recursive call of this.fetch
        } else {
          return choice.message.content;
        }
      })
      .catch((error) => {
        return this.errorHandling({
          errorMessage: AOAICharacter.HTTP_ERROR_MESSAGE,
          historyManager: this.prompt.historyManager,
          sceneId: scene.sceneId,
          occurredFunction: "AOAIFunctionCallingCharacter.fetch",
          error: error,
        });
      });
  }

  async postProcessText({ characterText, document, scene }) {
    characterText = await super.postProcessText({
      characterText: characterText,
      document: document,
      scene: scene,
    });
    for (var i = 0; i < this.functions.length; i++) {
      if (!this.functions[i].callOnAvatarTalk) {
        continue;
      }
      this.functions[i].callOnAvatarTalk = false;
      this.functions[i].onAvatarTalk({
        result: this.functions[i].result,
        document: document,
      });
    }
    return characterText;
  }
}
