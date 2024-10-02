import { Character } from "../js/character/character.js";
import { Prompt } from "../js/character/prompt.js";
import { WebSpeechTTS } from "../js/text_to_speech/web_speech_tts.js";
import { WebSpeechSTT } from "../js/speech_to_text/web_speech_stt.js";
import { avatarYutakaSasaki } from "../js/avatar/video_avatar/avatar_yutaka_sasaki.js";

describe("test_character", () => {
  var character000;
  var character001;

  beforeEach(async () => {
    character000 = new Character({
      characterId: "character000",
      firstName: "裕",
      lastName: "佐々木",
      language: "日本語",
      avatar: avatarYutakaSasaki,
      textToSpeech: new WebSpeechTTS({
        languageCode: "ja-JP",
        voiceName: "Microsoft Ichiro - Japanese (Japan)",
      }),
      speechToText: new WebSpeechSTT({ languageCode: "ja" }),
      prompt: new Prompt({
        messages: [
          {
            role: "system",
            content: "test_content000",
          },
        ],
        period: "。"
      }),
    });

    character001 = new Character({
      characterId: "character001",
      firstName: "Yutaka",
      lastName: "Sasaki",
      language: "English",
      avatar: avatarYutakaSasaki,
      textToSpeech: new WebSpeechTTS({
        languageCode: "en-US",
        voiceName: "Google US English",
      }),
      speechToText: new WebSpeechSTT({ languageCode: "en" }),
      prompt: new Prompt({
        messages: [
          {
            role: "system",
            content: "test_content001",
          },
        ],
      }),
    });
  });

  afterEach(() => { });

  test("Character.getFullName()", async () => {
    expect(character000.getFullName()).toEqual("佐々木 裕");
    expect(character001.getFullName()).toEqual("Yutaka Sasaki");
  });

  test("Character.getCharacterLabel()", async () => {
    expect(character000.getCharacterLabel()).toEqual("佐々木 裕 | 日本語");
    expect(character001.getCharacterLabel()).toEqual("Yutaka Sasaki | English");
  });

});
