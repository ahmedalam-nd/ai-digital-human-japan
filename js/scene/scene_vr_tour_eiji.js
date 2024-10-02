import { Scene } from "./scene.js";
import { apiKeys } from "../apikeys.js";

import { characterEijiYoshida_ja_JP } from "../character/vr_tour_eiji/character_eiji_yoshida_ja_JP.js";
import { characterEijiYoshida_en_US } from "../character/vr_tour_eiji/character_eiji_yoshida_en_US.js";
import { characterEijiYoshida_en_GB } from "../character/vr_tour_eiji/character_eiji_yoshida_en_GB.js";
import { characterEijiYoshida_zh_CN } from "../character/vr_tour_eiji/character_eiji_yoshida_zh_CN.js";
import { characterEijiYoshida_hi_IN } from "../character/vr_tour_eiji/character_eiji_yoshida_hi_IN.js";
import { characterEijiYoshida_fil_PH } from "../character/vr_tour_eiji/character_eiji_yoshida_fil_PH.js";

import { backgroundIframeZenkoji } from "../background/vr_tour_eiji/background_iframe_zenkoji.js";
import { backgroundIframeOxfordMuseumNaturalHistory } from "../background/vr_tour_eiji/background_iframe_oxford_museum_natural_history.js";
import { backgroundIframeGamesmen } from "../background/vr_tour_eiji/background_iframe_gamesmen.js";
import { backgroundIframeBostonBar } from "../background/vr_tour_eiji/background_iframe_boston_bar.js";
import { backgroundIframeMaloCabin } from "../background/vr_tour_eiji/background_iframe_malo_cabin.js";
import { backgroundIframeMiamiDesignDistrict } from "../background/vr_tour_eiji/background_iframe_miami_design_district.js";

import { layoutVerticalKiosk } from "../layout/layout_vertical_kiosk.js";
import { layoutHorizontalCenteredUpperBody } from "../layout/layout_horizontal_centered_upperbody.js";
import { layoutHorizontalCenteredWholebody } from "../layout/layout_horizontal_centered_wholebody.js";
import { layoutHorizontalNavigatorLeft } from "../layout/layout_horizontal_navigator_left.js";
import { layoutHorizontalNavigatorRight } from "../layout/layout_horizontal_navigator_right.js";

export const sceneVRTourEiji = new Scene({
  sceneId: "sceneVRTourEiji",
  apiKeys: apiKeys,
  names: {
    日本語: "吉田 英嗣さんと VR観光地巡り",
    English: "VR Sightseeing with Eiji Yoshida",
    Filipino: "VR Sightseeing kasama si Eiji Yoshida",
    Thai: "การท่องเที่ยว VR กับ Eiji Yoshida",
    "中文 (簡体)": "与吉田英嗣一起进行VR观光",
    Hindi: "ईजी योशिडा के साथ वीआर दर्शनीय स्थल देखना",
    Spanish: "Turismo VR con Eiji Yoshida",
    Italian: "Giro turistico VR con Eiji Yoshida",
    German: "VR Sightseeing mit Eiji Yoshida",
    French: "Visite virtuelle avec Eiji Yoshida",
  },
  characterList: [
    characterEijiYoshida_ja_JP,
    characterEijiYoshida_en_US,
    characterEijiYoshida_en_GB,
    characterEijiYoshida_zh_CN,
    characterEijiYoshida_hi_IN,
    characterEijiYoshida_fil_PH,
  ],
  backgroundList: [
    backgroundIframeZenkoji,
    backgroundIframeOxfordMuseumNaturalHistory,
    backgroundIframeGamesmen,
    backgroundIframeBostonBar,
    backgroundIframeMaloCabin,
    backgroundIframeMiamiDesignDistrict,
  ],
  layoutList: [
    layoutVerticalKiosk,
    layoutHorizontalCenteredUpperBody,
    layoutHorizontalCenteredWholebody,
    layoutHorizontalNavigatorLeft,
    layoutHorizontalNavigatorRight,
  ],
  defaultLayoutIndex: 3,
});
