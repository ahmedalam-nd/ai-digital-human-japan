import { EvaCharacter } from "../eva_character.js";
import { Character } from "../character.js";
import { GoogleTTS } from "../../text_to_speech/google_tts.js";
import { WebSpeechSTT } from "../../speech_to_text/web_speech_stt.js";
import { apiKeys } from "../../apikeys.js";
import { avatarHanakoToyosu } from "../../avatar/video_avatar/avatar_hanako_toyosu.js";
import { EvaOptionButtons } from "../../extra_content/extra_content_eva_option_buttons.js";

export const characterHanakoDaikinEva_en_US = new EvaCharacter({
  characterId: "characterHanakoDaikinEva_en_US",
  firstName: "Hanako",
  lastName: "Daikin (w/ Eva)",
  language: "English",
  avatar: avatarHanakoToyosu,
  textToSpeech: new GoogleTTS({
    languageCode: "en-US",
    voiceName: "en-US-Neural2-F",
    apiKey: apiKeys.google_speech,
  }),
  speechToText: new WebSpeechSTT({ languageCode: "en" }),
  errorNotificationMessages: {
    [Character.ERROR_TERMINATE_RESPONSE]: [
      "Sorry. I could not hear you well due to the noise. Please say it again.",
      "Sorry. I did not hear you correctly. It would be very helpful if you could repeat what you said.",
      "Excuse me. Could you repeat that? I didn't hear you well.",
      "I am very sorry, but could you please repeat what you said? I could not hear you well, probably due to the noise.",
    ],
    [Character.HTTP_ERROR_MESSAGE]: [
      "Sorry. My internet connection seems to be unstable. Please try again.",
      "Excuse me. The connection seems to be unstable. Could you please try again?",
    ],
  },
  evaInfo: {
    clientId: "eva-intellilink-dev",
    clientSecret: "dwQ6mI71mk88WR1AhNivIHeNceFuQEod",
    apiKey: "acf34657-36f5-11ee-8c7a-4201ac1e00fb",
    authUrl:
      "https://keycloak-americas-admin.eva.bot/auth/realms/EVA-INTELLILINK/protocol/openid-connect/token",
    msgUrl:
      "https://api-americas-instance1.eva.bot/eva-broker/org/e9963bf0-788a-4e30-abc9-7de6067ed7bd/env/88ce4426-5231-4b23-b21c-606a0249aebd/bot/c60fc881-698e-4415-b419-288f7ada9330/channel/0b0ed4f9-e44e-422f-b430-6b4910cedd82/v1/conversations",
    sessionCode: "",
  },
  extraContents: [
    new EvaOptionButtons({
      color: "is-link",
      styles: "is-rounded",
    }),
  ],
});
