import { Scene } from "./scene.js";
import { apiKeys } from "../apikeys.js";

import { characterEijiYoshidaRoleplay_ja_JP } from "../character/ai_roleplay/character_eiji_yoshida_roleplay_ja_JP.js";
import { characterEijiYoshidaRoleplay_en_US } from "../character/ai_roleplay/character_eiji_yoshida_roleplay_en_US.js";
import { characterEijiYoshidaRoleplay_it_IT } from "../character/ai_roleplay/character_eiji_yoshida_roleplay_it_IT.js";
import { characterHanakoToyosuRoleplay_ja_JP } from "../character/ai_roleplay/character_hanako_toyosu_roleplay_ja_JP.js";
import { characterHanakoToyosuRoleplay_en_US } from "../character/ai_roleplay/character_hanako_toyosu_roleplay_en_US.js";
import { characterHanakoToyosuRoleplay_it_IT } from "../character/ai_roleplay/character_hanako_toyosu_roleplay_it_IT.js";

import { backgroundImageBankLobby } from "../background/ai_roleplay/background_image_bank_lobby.js";
import { backgroundImageMeetingRoom } from "../background/ai_roleplay/background_image_meeting_room.js";

import { layoutSmartphoneCenteredWholebody } from "../layout/layout_smartphone_centered_wholebody.js";
import { layoutSmartphoneCenteredUpperbody } from "../layout/layout_smartphone_centered_upperbody.js";
import { layoutVerticalKiosk } from "../layout/layout_vertical_kiosk.js";
import { layoutHorizontalCenteredUpperBody } from "../layout/layout_horizontal_centered_upperbody.js";
import { layoutHorizontalCenteredWholebody } from "../layout/layout_horizontal_centered_wholebody.js";
import { layoutHorizontalNavigatorLeft } from "../layout/layout_horizontal_navigator_left.js";
import { layoutHorizontalNavigatorRight } from "../layout/layout_horizontal_navigator_right.js";

export const sceneAIRoleplay = new Scene({
  sceneId: "sceneAIRoleplay",
  apiKeys: apiKeys,
  names: {
    日本語: "AIロールプレイ",
    English: "AI Roleplay",
    Italian: "AI Roleplay",
    "中文 (簡体)": "AI角色扮演",
  },
  characterList: [
    characterEijiYoshidaRoleplay_ja_JP,
    characterEijiYoshidaRoleplay_en_US,
    characterEijiYoshidaRoleplay_it_IT,
    characterHanakoToyosuRoleplay_ja_JP,
    characterHanakoToyosuRoleplay_en_US,
    characterHanakoToyosuRoleplay_it_IT,
  ],
  backgroundList: [backgroundImageBankLobby, backgroundImageMeetingRoom],
  layoutList: [
    layoutHorizontalCenteredUpperBody,
    layoutHorizontalCenteredWholebody,
    layoutSmartphoneCenteredUpperbody,
    layoutSmartphoneCenteredWholebody,
    layoutVerticalKiosk,
    layoutHorizontalNavigatorLeft,
    layoutHorizontalNavigatorRight,
  ],
});
