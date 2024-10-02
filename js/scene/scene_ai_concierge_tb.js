import { Scene } from "./scene.js";
import { apiKeys } from "../apikeys.js";

import { characterHanakoToyotaFC_ja_JP } from "../character/ai_concierge_tb/character_hanako_toyota_fc_ja_JP.js";
import { characterHanakoToyotaFC_en_US } from "../character/ai_concierge_tb/character_hanako_toyota_fc_en_US.js";
import { characterHanakoToyotaEva_en_US } from "../character/ai_concierge_tb/character_hanako_toyota_eva_en_US.js";

import { backgroundImageAirportLobby } from "../background/ai_concierge_tb/background_image_airport_lobby.js";
import { backgroundImageAirportObservationDeck } from "../background/ai_concierge_tb/background_image_airport_observation_deck.js";
import { backgroundImageAirportRestaurant } from "../background/ai_concierge_tb/background_image_airport_restaurant_area.js";
import { backgroundImageAirportSouvenirShop } from "../background/ai_concierge_tb/background_image_airport_souvenir_shop.js";

import { layoutVerticalKiosk } from "../layout/layout_vertical_kiosk.js";
import { layoutHorizontalCenteredUpperBody } from "../layout/layout_horizontal_centered_upperbody.js";
import { layoutHorizontalCenteredWholebody } from "../layout/layout_horizontal_centered_wholebody.js";
import { layoutHorizontalNavigatorLeft } from "../layout/layout_horizontal_navigator_left.js";
import { layoutHorizontalNavigatorRight } from "../layout/layout_horizontal_navigator_right.js";

export const sceneAIConciergeTB = new Scene({
  sceneId: "sceneAIConciergeTB",
  apiKeys: apiKeys,
  names: {
    日本語: "AIコンシェルジュTB",
    English: "AI Concierge TB",
    Filipino: "AI Concierge TB",
    Thai: "เจ้าหน้าที่ดูแลแขก AI TB",
    "中文 (簡体)": "AI礼宾员 TB",
    Hindi: "एआई चेलक TB",
    Spanish: "Conserje de IA TB",
    Italian: "Concierge IA TB",
    German: "AI Concierge TB",
    French: "Concierge IA TB",
  },
  characterList: [
    characterHanakoToyotaEva_en_US,
    characterHanakoToyotaFC_ja_JP,
    characterHanakoToyotaFC_en_US,
  ],
  backgroundList: [
    backgroundImageAirportLobby,
    backgroundImageAirportObservationDeck,
    backgroundImageAirportRestaurant,
    backgroundImageAirportSouvenirShop,
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
