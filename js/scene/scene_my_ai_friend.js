import { Scene } from "./scene.js";
import { apiKeys } from "../apikeys.js";

import { characterTomomiDosaka_ja_JP } from "../character/my_ai_friend/character_tomomi_dosaka_ja_JP.js";
import { characterNatsuhoTakayama_ja_JP } from "../character/my_ai_friend/character_natsuho_takayama_ja_JP.js";
import { characterTomomiDosaka_en_US } from "../character/my_ai_friend/character_tomomi_dosaka_en_US.js";
import { characterNatsuhoTakayama_en_GB } from "../character/my_ai_friend/character_natsuho_takayama_en_GB.js";
import { characterTomomiDosaka_sbv2_ja_JP } from "../character/my_ai_friend/character_tomomi_dosaka_sbv2_ja_JP.js";

import { backgroundImageSchoolEntranceGate } from "../background/my_ai_friend/background_image_school_entrance_gate.js";
import { backgroundImageSchoolHallway } from "../background/my_ai_friend/background_image_school_hallway.js";
import { backgroundImageSchoolClassroom } from "../background/my_ai_friend/background_image_school_classroom.js";
import { backgroundImageShoppingStreet } from "../background/my_ai_friend/background_image_shopping_street.js";
import { backgroundImageTrainStation } from "../background/my_ai_friend/background_image_train_station.js";
import { backgroundImageTrain } from "../background/my_ai_friend/background_image_train.js";
import { backgroundImageMyRoom } from "../background/my_ai_friend/background_image_my_room.js";

import { layoutVerticalKiosk } from "../layout/layout_vertical_kiosk.js";
import { layoutHorizontalCenteredUpperBody } from "../layout/layout_horizontal_centered_upperbody.js";
import { layoutHorizontalCenteredWholebody } from "../layout/layout_horizontal_centered_wholebody.js";
import { layoutHorizontalNavigatorLeft } from "../layout/layout_horizontal_navigator_left.js";
import { layoutHorizontalNavigatorRight } from "../layout/layout_horizontal_navigator_right.js";

export const sceneMyAIFriend = new Scene({
  sceneId: "sceneMyAIFriend",
  apiKeys: apiKeys,
  names: {
    English: "My AI Friends at School",
    日本語: "私のAIフレンド",
    Hindi: "मेरे स्कूल में एआई मित्र",
    Spanish: "Mis amigos de IA en la escuela",
    Italian: "I miei amici IA a scuola",
    German: "Meine KI-Freunde in der Schule",
    French: "Mes amis IA à l'école",
    Filipino: "Ang aking mga kaibigan na AI sa paaralan",
    Thai: "เพื่อน AI ของฉันที่โรงเรียน",
    "中文 (簡体)": "我在学校的AI朋友",
  },
  characterList: [
    characterTomomiDosaka_ja_JP,
    characterNatsuhoTakayama_ja_JP,
    characterTomomiDosaka_en_US,
    characterNatsuhoTakayama_en_GB,
    characterTomomiDosaka_sbv2_ja_JP,
  ],
  backgroundList: [
    backgroundImageSchoolEntranceGate,
    backgroundImageSchoolHallway,
    backgroundImageSchoolClassroom,
    backgroundImageShoppingStreet,
    backgroundImageTrainStation,
    backgroundImageTrain,
    backgroundImageMyRoom,
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
