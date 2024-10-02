import { WebSpeechTTS } from "../js/text_to_speech/web_speech_tts.js";
import { WebSpeechSTT } from "../js/speech_to_text/web_speech_stt.js";

describe("test_web_speech_stt", () => {
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

  test("WebSpeechTTS.init()", async () => {
    expect(await stt000.speaking).toBeFalsy();
    stt000.speaking = true;
    expect(await stt000.speaking).toBeTruthy();
    stt000.init();
    expect(await stt000.speaking).toBeFalsy();
  });

  test("WebSpeechTTS.setEnabled()", async () => {
    expect(await stt000.enabled).toBeTruthy();
    stt000.setEnabled({ value: false });
    expect(await stt000.enabled).toBeFalsy();
    stt000.setEnabled({ value: true });
    expect(await stt000.enabled).toBeTruthy();
  });
});
