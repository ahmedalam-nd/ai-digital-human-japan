import { Scene } from "./scene.js";
import { apiKeys } from "../apikeys.js";

import { characterTomomiDosaka_ja_JP } from "../character/vr_estate_tour/character_tomomi_dosaka_ja_JP.js";
import { characterTomomiDosaka_en_US } from "../character/vr_estate_tour/character_tomomi_dosaka_en_US.js";
import { characterTomomiDosaka_en_GB } from "../character/vr_estate_tour/character_tomomi_dosaka_en_GB.js";
import { characterTomomiDosaka_sv_SE } from "../character/vr_estate_tour/character_tomomi_dosaka_sv_SE.js";
import { characterTomomiDosaka_sv_SE_openai } from "../character/vr_estate_tour/character_tomomi_dosaka_sv_SE_openai.js";
import { characterTomomiDosaka_zh_CN } from "../character/vr_estate_tour/character_tomomi_dosaka_zh_CN.js";
import { characterTomomiDosaka_th_TH } from "../character/vr_estate_tour/character_tomomi_dosaka_th_TH.js";
import { characterTomomiDosaka_fil_PH } from "../character/vr_estate_tour/character_tomomi_dosaka_fil_PH.js";

import { backgroundIframeIzuRoyeWaodernNagakute } from "../background/vr_estate_tour/background_iframe_izu_roye_wa_modern_nagakute.js";
import { backgroundIframeBiena } from "../background/vr_estate_tour/background_iframe_biena.js";
import { backgroundIframeIzuRoye } from "../background/vr_estate_tour/background_iframe_izu_roye.js";
import { backgroundIframeXInc } from "../background/vr_estate_tour/background_iframe_x_inc.js";
import { backgroundIframeXRHomes } from "../background/vr_estate_tour/background_iframe_xr_homes.js";
import { backgroundIframeShaMaisonFairyCoCo } from "../background/vr_estate_tour/background_iframe_shamaison_fairy_coco.js";
import { backgroundIframeShaWoodGravisStage } from "../background/vr_estate_tour/background_iframe_shawood_gravis_stage.js";
import { backgroundIframeMyHomeCloudWebcad } from "../background/vr_estate_tour/background_iframe_myhome_cloud_webcad.js";
import { backgroundIframePlatformHouse } from "../background/vr_estate_tour/background_iframe_platform_house.js";
import { backgroundIframeStallionWay } from "../background/vr_estate_tour/background_iframe_stallion_way.js";

import { layoutVerticalKiosk } from "../layout/layout_vertical_kiosk.js";
import { layoutHorizontalCenteredUpperBody } from "../layout/layout_horizontal_centered_upperbody.js";
import { layoutHorizontalCenteredWholebody } from "../layout/layout_horizontal_centered_wholebody.js";
import { layoutHorizontalNavigatorLeft } from "../layout/layout_horizontal_navigator_left.js";
import { layoutHorizontalNavigatorRight } from "../layout/layout_horizontal_navigator_right.js";

export const sceneVREstateTour = new Scene({
  sceneId: "sceneVREstateTour",
  apiKeys: apiKeys,
  names: {
    日本語: "AI営業担当者とVR内見ツアー",
    English: "VR Estate Tour with AI Sales Agent",
    Filipino: "VR Estate Tour kasama ang AI Sales Agent",
    Thai: "ทัวร์ชมอสังหาริมทรัพย์ VR กับตัวแทนฝ่ายขาย AI",
    "中文 (簡体)": "与AI销售代理一起进行VR房地产之旅",
    Hindi: "एआई बिक्री एजेंट के साथ वीआर एस्टेट टूर",
    Spanish: "Tour inmobiliario de RV con agente de ventas de IA",
    Italian: "Tour immobiliare VR con agente di vendita IA",
    German: "VR Estate Tour mit AI-Vertriebsmitarbeiter",
    French: "Visite immobilière VR avec agent de vente IA",
    Swedish: "VR Estate Tour med AI-försäljningsagent",
  },
  characterList: [
    characterTomomiDosaka_ja_JP,
    characterTomomiDosaka_sv_SE_openai,
    characterTomomiDosaka_en_US,
    characterTomomiDosaka_en_GB,
    characterTomomiDosaka_sv_SE,
    characterTomomiDosaka_zh_CN,
    characterTomomiDosaka_th_TH,
    characterTomomiDosaka_fil_PH,
  ],
  backgroundList: [
    backgroundIframeStallionWay,
    backgroundIframeIzuRoyeWaodernNagakute,
    backgroundIframeBiena,
    backgroundIframeIzuRoye,
    backgroundIframeXRHomes,
    backgroundIframeXInc,
    backgroundIframeShaMaisonFairyCoCo,
    backgroundIframeShaWoodGravisStage,
    backgroundIframeMyHomeCloudWebcad,
    backgroundIframePlatformHouse,
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
