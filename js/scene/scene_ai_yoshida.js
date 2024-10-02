import { Scene } from "./scene.js";
import { apiKeys } from "../apikeys.js";

import { characterYoshidaFC_ja_JP } from "../character/ai_yoshida/character_yoshida_fc_ja_JP.js";
import { characterYoshida_ja_JP } from "../character/ai_yoshida/character_yoshida_ja_JP.js";

import { backgroundImageTBGlobalHQBuilding } from "../background/ai_yoshida/background_image_tb_global_hq_building.js";
import { backgroundImageTBGlobalHQEntrance } from "../background/ai_yoshida/background_image_tb_global_hq_entrance.js";
import { backgroundImageTBGlobalHQMeetingArea } from "../background/ai_yoshida/background_image_tb_global_hq_meeting_area.js";
import { backgroundImageTBGlobalHQCollabArea } from "../background/ai_yoshida/background_image_tb_global_hq_collab_area.js";
import { backgroundImageGlobalTrainingCenter } from "../background/ai_yoshida/background_image_global_training_center.js";
import { backgroundIframeFactoryDigitalTwin } from "../background/ai_yoshida/background_iframe_factory_digital_twin.js";

import { layoutVerticalKiosk } from "../layout/layout_vertical_kiosk.js";
import { layoutHorizontalCenteredUpperBody } from "../layout/layout_horizontal_centered_upperbody.js";
import { layoutHorizontalCenteredWholebody } from "../layout/layout_horizontal_centered_wholebody.js";
import { layoutHorizontalNavigatorLeft } from "../layout/layout_horizontal_navigator_left.js";
import { layoutHorizontalNavigatorRight } from "../layout/layout_horizontal_navigator_right.js";

export const sceneAIYoshida = new Scene({
  sceneId: "sceneAIYoshida",
  apiKeys: apiKeys,
  names: {
    English: "AI Yoshida Chief",
    日本語: "いつでも会える AI 吉田室長",
    Hindi: "एआई योशिडा प्रमुख",
    Spanish: "IA CEO que puedes conocer",
    Italian: "CEO IA che puoi incontrare",
    German: "KI-CEO, den Sie treffen können",
    French: "IA CEO que vous pouvez rencontrer",
    Filipino: "AI CEO na maaari mong makilala",
    Thai: "ผู้บริหารที่คุณสามารถพบได้",
    "中文 (簡体)": "您可以见到的 AI CEO",
  },
  characterList: [characterYoshidaFC_ja_JP, characterYoshida_ja_JP],
  backgroundList: [
    backgroundImageTBGlobalHQBuilding,
    backgroundImageTBGlobalHQEntrance,
    backgroundImageTBGlobalHQMeetingArea,
    backgroundImageTBGlobalHQCollabArea,
    backgroundImageGlobalTrainingCenter,
    backgroundIframeFactoryDigitalTwin,
  ],
  layoutList: [
    layoutHorizontalCenteredUpperBody,
    layoutHorizontalCenteredWholebody,
    layoutVerticalKiosk,
    layoutHorizontalNavigatorLeft,
    layoutHorizontalNavigatorRight,
  ],
  defaultLayoutIndex: 2,
});
