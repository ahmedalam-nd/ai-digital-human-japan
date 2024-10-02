import { Scene } from "./scene.js";
import { apiKeys } from "../apikeys.js";

import { characterAINiceGuyGoogleTTS_ja_JP } from "../character/ai_niceguy/character_ai_niceguy_googletts_ja_JP.js";
import { characterAINiceGuyOpenAITTS_ja_JP } from "../character/ai_niceguy/character_ai_niceguy_openaitts_ja_JP.js";

import { backgroundImageLivingRoomA } from "../background/ai_niceguy/background_image_living_room_a.js";
import { backgroundImageLivingRoomB } from "../background/ai_niceguy/background_image_living_room_b.js";
import { backgroundImageKitchen } from "../background/ai_niceguy/background_image_kitchen.js";
import { backgroundImagePark } from "../background/ai_niceguy/background_image_park.js";
import { backgroundImageCafeEntrance } from "../background/ai_niceguy/background_image_cafe_entrance.js";
import { backgroundImageShopEntrance } from "../background/ai_niceguy/background_image_shop_entrance.js";
import { backgroundImageShoppingMall } from "../background/ai_niceguy/background_image_shopping_mall.js";

import { layoutVerticalKiosk } from "../layout/layout_vertical_kiosk.js";
import { layoutHorizontalCenteredUpperBody } from "../layout/layout_horizontal_centered_upperbody.js";
import { layoutHorizontalCenteredWholebody } from "../layout/layout_horizontal_centered_wholebody.js";

export const sceneAINiceGuy = new Scene({
  sceneId: "sceneAINiceGuy",
  apiKeys: apiKeys,
  names: {
    English: "AI Nice Guy",
    日本語: "AI ナイスガイ",
    Hindi: "एआई नाइस गाय",
    Spanish: "AI Nice Guy",
    Italian: "AI Nice Guy",
    German: "AI Nice Guy",
    French: "AI Nice Guy",
    Filipino: "AI Nice Guy",
    Thai: "AI Nice Guy",
    "中文 (簡体)": "AI Nice Guy",
    Swedish: "AI Nice Guy",
  },
  characterList: [
    characterAINiceGuyGoogleTTS_ja_JP,
    characterAINiceGuyOpenAITTS_ja_JP,
  ],
  backgroundList: [
    backgroundImageLivingRoomA,
    backgroundImageLivingRoomB,
    backgroundImageKitchen,
    backgroundImagePark,
    backgroundImageCafeEntrance,
    backgroundImageShopEntrance,
    backgroundImageShoppingMall,
  ],
  layoutList: [
    layoutHorizontalCenteredUpperBody,
    layoutHorizontalCenteredWholebody,
    layoutVerticalKiosk,
  ],
});
