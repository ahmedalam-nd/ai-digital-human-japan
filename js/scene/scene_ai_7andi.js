import { Scene } from "./scene.js";
import { apiKeys } from "../apikeys.js";

import { characterNanacoFCFirebaseGoogleTTS_ja_JP } from "../character/7andi/character_nanaco_fc_firebase_googletts_ja_JP.js";
import { characterCircularAudioAvatarFCFirebase_ja_JP } from "../character/7andi/character_circular_audio_avatar_fc_firebase_ja_JP.js";
import { characterCircularAudioAvatarSunburstFCFirebase_ja_JP } from "../character/7andi/character_circular_audio_avatar_sunburst_fc_firebase_ja_JP.js";
import { characterHanakoToyosuRealFCFirebaseGoogleTTS_ja_JP } from "../character/7andi/character_hanako_toyosu_real_fc_firebase_googletts_ja_JP.js";
import { characterHanakoToyosuRealFCFirebaseOpenAITTS_ja_JP } from "../character/7andi/character_hanako_toyosu_real_fc_firebase_openaitts_ja_JP.js";

import { backgroundNoBackground } from "../background/background_no_background.js";
import { backgroundImage7andi } from "../background/7andi/background_image_7andi.js";

import { layoutAnalysisDashboardWholeBody } from "../layout/layout_analysis_dashboard_wholebody.js";
import { layoutAnalysisDashboardUpperBody } from "../layout/layout_analysis_dashboard_upperbody.js";

export const scene7andi = new Scene({
  sceneId: "scene7andi",
  apiKeys: apiKeys,
  names: {
    日本語: "リテールデータ分析",
    English: "Retail Data Analysis",
    Filipino: "Pagsusuri ng Data sa Retail",
    Thai: "การวิเคราะห์ข้อมูลการค้าปลีก",
    "中文 (簡体)": "零售数据分析",
    Hindi: "खुदरा डेटा विश्लेषण",
    Spanish: "Análisis de Datos Minoristas",
    Italian: "Analisi dei Dati Retail",
    German: "Einzelhandelsdatenanalyse",
    French: "Analyse des Données de Vente au Détail",
    Swedish: "Detaljhandelsdataanalys",
  },
  characterList: [
    characterNanacoFCFirebaseGoogleTTS_ja_JP,
    characterCircularAudioAvatarFCFirebase_ja_JP,
    characterCircularAudioAvatarSunburstFCFirebase_ja_JP,
    characterHanakoToyosuRealFCFirebaseGoogleTTS_ja_JP,
    characterHanakoToyosuRealFCFirebaseOpenAITTS_ja_JP,
  ],
  backgroundList: [backgroundNoBackground, backgroundImage7andi],
  layoutList: [
    layoutAnalysisDashboardWholeBody,
    layoutAnalysisDashboardUpperBody,
  ],
});
