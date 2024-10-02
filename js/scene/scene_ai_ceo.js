import { Scene } from "./scene.js";
import { apiKeys } from "../apikeys.js";

import { characterSasaki_ja_JP } from "../character/ai_ceo/character_sasaki_ja_JP.js";
import { characterSasaki_en_US } from "../character/ai_ceo/character_sasaki_en_US.js";
import { characterSasaki_sv_SE } from "../character/ai_ceo/character_sasaki_sv_SE.js";
import { characterSasaki_es_ES } from "../character/ai_ceo/character_sasaki_es_ES.js";
import { characterSasaki_it_IT } from "../character/ai_ceo/character_sasaki_it_IT.js";
import { characterSasaki_de_DE } from "../character/ai_ceo/character_sasaki_de_DE.js";
import { characterSasaki_fr_FR } from "../character/ai_ceo/character_sasaki_fr_FR.js";

import { backgroundImageToyosuCenterBuilding } from "../background/ai_ceo/background_image_toyosu_center_building.js";
import { backgroundImageToyosuCenterBuildingEntrance } from "../background/ai_ceo/background_image_toyosu_center_building_entrance.js";
import { backgroundImageInforiumEntrance } from "../background/ai_ceo/background_image_inforium_entrance.js";
import { backgroundImageInforium } from "../background/ai_ceo/background_image_inforium.js";
import { backgroundImageInforiumMeetingArea } from "../background/ai_ceo/background_image_inforium_meeting_area.js";
import { backgroundImageInforiumPresentationArea } from "../background/ai_ceo/background_image_inforium_presentation_area.js";
import { backgroundImageInforiumWorkshopArea } from "../background/ai_ceo/background_image_inforium_workshop_area.js";
import { backgroundIframeFactoryDigitalTwin } from "../background/ai_ceo/background_iframe_factory_digital_twin.js";
import { backgroundIframeNttDataInnovationsHistory } from "../background/ai_ceo/background_image_nttdata_innovations_history.js";

import { layoutVerticalKiosk } from "../layout/layout_vertical_kiosk.js";
import { layoutHorizontalCenteredUpperBody } from "../layout/layout_horizontal_centered_upperbody.js";
import { layoutHorizontalCenteredWholebody } from "../layout/layout_horizontal_centered_wholebody.js";
import { layoutHorizontalNavigatorLeft } from "../layout/layout_horizontal_navigator_left.js";
import { layoutHorizontalNavigatorRight } from "../layout/layout_horizontal_navigator_right.js";

export const sceneAICEO = new Scene({
  sceneId: "sceneAICEO",
  apiKeys: apiKeys,
  names: {
    English: "AI CEO You can meet",
    日本語: "会いに行ける AI 社長",
    Hindi: "आप आईएसओ से मिल सकते हैं",
    Spanish: "IA CEO que puedes conocer",
    Italian: "CEO IA che puoi incontrare",
    German: "KI-CEO, den Sie treffen können",
    French: "IA CEO que vous pouvez rencontrer",
    Filipino: "AI CEO na maaari mong makilala",
    Thai: "ผู้บริหารที่คุณสามารถพบได้",
    "中文 (簡体)": "您可以见到的 AI CEO",
    Swedish: "AI VD du kan träffa",
  },
  characterList: [
    characterSasaki_sv_SE,
    characterSasaki_ja_JP,
    characterSasaki_en_US,
    characterSasaki_es_ES,
    characterSasaki_it_IT,
    characterSasaki_de_DE,
    characterSasaki_fr_FR,
  ],
  backgroundList: [
    backgroundImageToyosuCenterBuilding,
    backgroundImageToyosuCenterBuildingEntrance,
    backgroundImageInforiumEntrance,
    backgroundImageInforium,
    backgroundImageInforiumMeetingArea,
    backgroundImageInforiumPresentationArea,
    backgroundImageInforiumWorkshopArea,
    backgroundIframeFactoryDigitalTwin,
    backgroundIframeNttDataInnovationsHistory,
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
