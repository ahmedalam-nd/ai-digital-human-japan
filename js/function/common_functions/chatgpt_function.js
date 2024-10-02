import { Function } from "../function.js";

export class ChatGPTFunction extends Function {
  constructor({
    name,
    description,
    parameters,
    prompt,
    apiKey,
    failedMessage = null,
  }) {
    super({
      name: name,
      description: description,
      parameters: parameters,
    });
    this.prompt = prompt;
    this.apiKey = apiKey;
    this.failedMessage = failedMessage;
  }

  static END_POINT_URL = "https://api.openai.com/v1/chat/completions";
  prompt = "";
  apiKey = "";
  failedMessage = null;

  async fetch() {
    return await fetch(ChatGPTFunction.END_POINT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + this.apiKey,
      },
      body: this.prompt.toJson(),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: Status: ${response.status}`);
        }
        return await response.json();
      })
      .then((json) => {
        return json.choices[0].message.content;
      })
      .catch((error) => {
        if (this.failedMessage != null) {
          return this.failedMessage;
        }
        // From this object historyManager is not accessible, so the exception is thrown with the error message.
        throw new Error(`Error in ChatGPTFunction.fetch: ${error}`);
      });
  }

  async call({ parameters }) {
    var retValue = await this.fetch();
    return retValue;
  }
}
