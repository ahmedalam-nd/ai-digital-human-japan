import { historyManager } from "../model/history_manager.js";

export class Prompt {
  constructor({
    model = "gpt-4o-mini",
    messages = [],
    temperature = 1.0,
    maxTokens = 1024,
    topP = 1.0,
    frequencyPenalty = 0.0,
    presencePenalty = 0.0,
    period = ".",
  }) {
    this.model = model;
    this.messages = messages;
    this.temperature = temperature;
    this.maxTokens = maxTokens;
    this.topP = topP;
    this.frequencyPenalty = frequencyPenalty;
    this.presencePenalty = presencePenalty;
    this.period = period;
    this.historyManager = historyManager;
  }

  model;
  messages;
  temperature;
  maxTokens;
  topP;
  frequencyPenalty;
  presencePenalty;
  period;
  historyManager;

  toMap() {
    return {
      model: this.model,
      messages: this.messages,
      temperature: this.temperature,
      max_tokens: this.maxTokens,
      top_p: this.topP,
      frequency_penalty: this.frequencyPenalty,
      presence_penalty: this.presencePenalty,
    };
  }

  toJson() {
    return JSON.stringify(this.toMap());
  }

  pushMessage({
    sceneId,
    characterId,
    tool_call_id = null,
    role,
    name = null,
    content,
  }) {
    if (tool_call_id && name) {
      this.messages.push({
        tool_call_id: tool_call_id,
        role: role,
        name: name,
        content: content,
      });
    } else {
      this.messages.push({
        role: role,
        content: content,
      });
    }

    this.historyManager.addMessage({
      sceneId: sceneId,
      characterId: characterId,
      tool_call_id: tool_call_id,
      role: role,
      name: name,
      content: content,
    });
  }
}
