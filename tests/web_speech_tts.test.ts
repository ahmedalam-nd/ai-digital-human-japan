import { WebSpeechTTS } from "../js/text_to_speech/web_speech_tts.js";
import { WebSpeechSTT } from "../js/speech_to_text/web_speech_stt.js";

describe("test_web_speech_tts", () => {
  beforeEach(async () => {
    tts000 = new WebSpeechTTS({
      languageCode: "ja-JP",
      voiceName: "Google 日本語",
    });
    stt000 = new WebSpeechSTT({ languageCode: "ja" });
  });

  afterEach(() => { });

  var tts000;
  var stt000;

  test("WebSpeechTTS.isSpeaking()", async () => {
    expect(await tts000.isSpeaking()).toBeFalsy();
  });

  test("WebSpeechTTS.setEnabled()", async () => {
    expect(await tts000.enabled).toBeTruthy();
    tts000.setEnabled({ value: false });
    expect(await tts000.enabled).toBeFalsy();
    tts000.setEnabled({ value: true });
    expect(await tts000.enabled).toBeTruthy();
  });
});
