import { Scene } from "./scene.js";
import { apiKeys } from "../apikeys.js";

import { characterTomomiDosaka_ja_JP } from "../character/vr_furniture_tour/character_tomomi_dosaka_ja_JP.js";
import { characterTomomiDosaka_en_US } from "../character/vr_furniture_tour/character_tomomi_dosaka_en_US.js";
import { backgroundIframeHarrodsFurnitureDptShowroom } from "../background/vr_furniture_tour/background_iframe_harrods_furniture_dpt_showroom.js";
import { layoutVerticalKiosk } from "../layout/layout_vertical_kiosk.js";
import { layoutHorizontalCenteredUpperBody } from "../layout/layout_horizontal_centered_upperbody.js";
import { layoutHorizontalCenteredWholebody } from "../layout/layout_horizontal_centered_wholebody.js";
import { layoutHorizontalNavigatorLeft } from "../layout/layout_horizontal_navigator_left.js";
import { layoutHorizontalNavigatorRight } from "../layout/layout_horizontal_navigator_right.js";

export const sceneVRFurnitureTour = new Scene({
  sceneId: "sceneVRFurnitureTour",
  apiKeys: apiKeys,
  names: {
    日本語: "AI販売員と高級家具ショールームツアー",
    English: "VR Luxury Furniture Showroom Tour with AI Sales Agent",
  },
  characterList: [characterTomomiDosaka_ja_JP, characterTomomiDosaka_en_US],
  backgroundList: [backgroundIframeHarrodsFurnitureDptShowroom],
  layoutList: [
    layoutVerticalKiosk,
    layoutHorizontalCenteredUpperBody,
    layoutHorizontalCenteredWholebody,
    layoutHorizontalNavigatorLeft,
    layoutHorizontalNavigatorRight,
  ],
  defaultLayoutIndex: 3,
});
