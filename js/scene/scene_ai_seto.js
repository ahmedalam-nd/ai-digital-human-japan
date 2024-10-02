import { Scene } from "./scene.js";
import { apiKeys } from "../apikeys.js";

import { characterSeto_ja_JP } from "../character/ai_seto/character_seto_ja_JP.js";
import { characterSeto_en_US } from "../character/ai_seto/character_seto_en_US.js";
import { characterSeto_de_DE } from "../character/ai_seto/character_seto_de_DE.js";
import { characterSeto_fr_FR } from "../character/ai_seto/character_seto_fr_FR.js";
import { characterSeto_cmn_CN } from "../character/ai_seto/character_seto_cmn_CN.js";

import { backgroundImageToyosuCenterBuilding } from "../background/ai_seto/background_image_toyosu_center_building.js";
import { backgroundImageToyosuCenterBuildingEntrance } from "../background/ai_seto/background_image_toyosu_center_building_entrance.js";
import { backgroundImageInforiumEntrance } from "../background/ai_seto/background_image_inforium_entrance.js";
import { backgroundImageInforium } from "../background/ai_seto/background_image_inforium.js";
import { backgroundImageInforiumMeetingArea } from "../background/ai_seto/background_image_inforium_meeting_area.js";
import { backgroundImageInforiumPresentationArea } from "../background/ai_seto/background_image_inforium_presentation_area.js";
import { backgroundImageInforiumWorkshopArea } from "../background/ai_seto/background_image_inforium_workshop_area.js";
import { backgroundIframeFactoryDigitalTwin } from "../background/ai_seto/background_iframe_factory_digital_twin.js";
import { backgroundIframeNttDataInnovationsHistory } from "../background/ai_seto/background_image_nttdata_innovations_history.js";

import { layoutVerticalKiosk } from "../layout/layout_vertical_kiosk.js";
import { layoutHorizontalCenteredUpperBody } from "../layout/layout_horizontal_centered_upperbody.js";
import { layoutHorizontalCenteredWholebody } from "../layout/layout_horizontal_centered_wholebody.js";
import { layoutHorizontalNavigatorLeft } from "../layout/layout_horizontal_navigator_left.js";
import { layoutHorizontalNavigatorRight } from "../layout/layout_horizontal_navigator_right.js";

export const sceneAISeto = new Scene({
  sceneId: "sceneAISeto",
  apiKeys: apiKeys,
  names: {
    English: "AI Head of Financial Innovation",
    日本語: "AI 金融イノベーション本部長",
    Hindi: "एआई वित्तीय नवाचार का प्रमुख",
    Spanish: "Jefe de Innovación Financiera de IA",
    Italian: "Capo dell'innovazione finanziaria di IA",
    German: "Leiter der Finanzinnovation von AI",
    French: "Chef de l'innovation financière de l'IA",
    Filipino: "Punong Tagapag-imbento ng Pananalapi ng AI",
    Thai: "หัวหน้านวัตกรรมการเงิน AI",
    "中文 (簡体)": "AI金融创新主管",
  },
  characterList: [
    characterSeto_ja_JP,
    characterSeto_cmn_CN,
    characterSeto_en_US,
    characterSeto_de_DE,
    characterSeto_fr_FR,
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
    layoutHorizontalCenteredUpperBody,
    layoutHorizontalCenteredWholebody,
    layoutVerticalKiosk,
    layoutHorizontalNavigatorLeft,
    layoutHorizontalNavigatorRight,
  ],
});
