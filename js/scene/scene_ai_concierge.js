import { Scene } from "./scene.js";
import { apiKeys } from "../apikeys.js";

import { characterHanakoToyosuFC_en_openai } from "../character/ai_concierge/character_hanako_toyosu_fc_en_openai.js";
import { characterHanakoToyosuFC_sv_openai } from "../character/ai_concierge/character_hanako_toyosu_fc_sv_openai.js";
import { characterHanakoToyosuFC_ja_JP } from "../character/ai_concierge/character_hanako_toyosu_fc_ja_JP.js";
import { characterHanakoToyosuFC_ja_JP_WebSpeechTTS } from "../character/ai_concierge/character_hanako_toyosu_fc_ja_JP_web_speech_tts.js";
import { characterHanakoToyosuGPT4Turbo_ja_JP } from "../character/ai_concierge/character_hanako_toyosu_gpt4turbo_ja_JP.js";
import { characterTaroShinagawaFC_ja_JP } from "../character/ai_concierge/character_taro_shinagawa_fc_ja_JP.js";
import { characterHanakoToyosu_ja_JP_aoai } from "../character/ai_concierge/character_hanako_toyosu_ja_JP_aoai.js";
import { characterHanakoToyosuFC_ja_JP_aoai } from "../character/ai_concierge/character_hanako_toyosu_fc_ja_JP_aoai.js";
import { characterHanakoToyosuFCFirebase_ja_JP } from "../character/ai_concierge/character_hanako_toyosu_fc_firebase_ja_JP.js";

import { backgroundForesightDay2024 } from "../background/ai_concierge/background_iframe_foresight_day.js";
import { backgroundImageHotelLobby } from "../background/ai_concierge/background_image_hotel_lobby.js";
import { backgroundImageHotelHallway } from "../background/ai_concierge/background_image_hotel_hallway.js";
import { backgroundImageHotelConciergeDesk } from "../background/ai_concierge/background_image_hotel_concierge_desk.js";

import { layoutVerticalKiosk } from "../layout/layout_vertical_kiosk.js";
import { layoutHorizontalCenteredUpperBody } from "../layout/layout_horizontal_centered_upperbody.js";
import { layoutHorizontalCenteredWholebody } from "../layout/layout_horizontal_centered_wholebody.js";
import { layoutHorizontalNavigatorLeft } from "../layout/layout_horizontal_navigator_left.js";
import { layoutHorizontalNavigatorRight } from "../layout/layout_horizontal_navigator_right.js";

export const sceneAIConcierge = new Scene({
  sceneId: "sceneAIConcierge",
  apiKeys: apiKeys,
  names: {
    日本語: "AIコンシェルジュ",
    English: "AI Concierge",
    Filipino: "AI Concierge",
    Thai: "เจ้าหน้าที่ดูแลแขก AI",
    "中文 (簡体)": "AI礼宾员",
    Hindi: "एआई चेलक",
    Spanish: "Conserje de IA",
    Italian: "Concierge IA",
    German: "AI Concierge",
    French: "Concierge IA",
    Swedish: "AI Concierge",
  },
  characterList: [
    characterHanakoToyosuFC_ja_JP,
    characterHanakoToyosuFCFirebase_ja_JP,
    characterHanakoToyosuFC_en_openai,
    characterHanakoToyosuFC_ja_JP_WebSpeechTTS,
    characterHanakoToyosuGPT4Turbo_ja_JP,
    characterTaroShinagawaFC_ja_JP,
    characterHanakoToyosu_ja_JP_aoai,
    characterHanakoToyosuFC_ja_JP_aoai,
    characterHanakoToyosuFC_sv_openai,
  ],
  backgroundList: [
    backgroundImageHotelConciergeDesk,
    backgroundImageHotelLobby,
    backgroundImageHotelHallway,
    backgroundForesightDay2024,
  ],
  layoutList: [
    layoutVerticalKiosk,
    layoutHorizontalCenteredUpperBody,
    layoutHorizontalCenteredWholebody,
    layoutHorizontalNavigatorLeft,
    layoutHorizontalNavigatorRight,
  ],
  defaultLayoutIndex: 1,
});
