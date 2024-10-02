import { Prompt } from "../js/character/prompt.js";

describe("test_prompt", () => {
  var prompt;

  beforeEach(async () => {
    prompt = new Prompt({
      messages:
        [
          {
            role: "system",
            content: "test_content000",
          },
        ], period:
        "。"
    }
    );
  });
  afterEach(() => { });

  test("Prompt.toString()", async () => {
    expect(prompt.toMap()["model"]).toEqual("gpt-4o-mini");
    expect(prompt.toMap()["messages"][0]["role"]).toEqual("system");
    expect(
      prompt.toMap()["messages"][0]["content"]).toEqual(
        "test_content000"
      );
    expect(prompt.toMap()["temperature"]).toEqual(1.0);
    expect(prompt.toMap()["max_tokens"]).toEqual(1024);
    expect(prompt.toMap()["top_p"]).toEqual(1.0);
    expect(prompt.toMap()["frequency_penalty"]).toEqual(0.0);
    expect(prompt.toMap()["presence_penalty"]).toEqual(0.0);
  });
});
