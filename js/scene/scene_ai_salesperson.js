import { Scene } from "./scene.js";
import { apiKeys } from "../apikeys.js";

import { characterHanakoDaikinEva_en_US } from "../character/ai_salesperson/character_hanako_daikin_eva_en_US.js";
import { characterHanakoDaikinEva_en_US_ifcheck } from "../character/ai_salesperson/character_hanako_daikin_eva_en_US_ifCheck.js";

import { backgroundImageAirportLobby } from "../background/ai_concierge_tb/background_image_airport_lobby.js";
import { backgroundImageAirportObservationDeck } from "../background/ai_concierge_tb/background_image_airport_observation_deck.js";
import { backgroundImageAirportRestaurant } from "../background/ai_concierge_tb/background_image_airport_restaurant_area.js";
import { backgroundImageAirportSouvenirShop } from "../background/ai_concierge_tb/background_image_airport_souvenir_shop.js";

import { layoutVerticalKiosk } from "../layout/layout_vertical_kiosk.js";
import { layoutHorizontalCenteredUpperBody } from "../layout/layout_horizontal_centered_upperbody.js";
import { layoutHorizontalCenteredWholebody } from "../layout/layout_horizontal_centered_wholebody.js";
import { layoutHorizontalNavigatorLeft } from "../layout/layout_horizontal_navigator_left.js";
import { layoutHorizontalNavigatorRight } from "../layout/layout_horizontal_navigator_right.js";

export const sceneAISalesperson = new Scene({
  sceneId: "sceneAISalesperson",
  apiKeys: apiKeys,
  names: {
    日本語: "AI販売員",
    English: "AI Salesperson",
  },
  characterList: [characterHanakoDaikinEva_en_US_ifcheck, characterHanakoDaikinEva_en_US],
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
