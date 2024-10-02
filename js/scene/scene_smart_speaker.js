import { Scene } from "./scene.js";
import { apiKeys } from "../apikeys.js";

import { characterSmartFemaleAssistantOpenAITTS_ja_JP } from "../character/smart_speaker/character_smart_female_assistant_openaitts_ja_JP.js";
import { characterSmartFemaleAssistantGoogleTTS_ja_JP } from "../character/smart_speaker/character_smart_female_assistant_googletts_ja_JP.js";

import { backgroundNoBackground } from "../background/background_no_background.js";

import { layoutNothing } from "../layout/layout_nothing.js";

export const sceneSmartSpeaker = new Scene({
  sceneId: "sceneSmartSpeaker",
  apiKeys: apiKeys,
  names: {
    English: "Smart Speaker",
    日本語: "スマートスピーカー",
    Hindi: "स्मार्ट स्पीकर",
    Spanish: "Altavoz inteligente",
    Italian: "Altoparlante intelligente",
    German: "Smarter Lautsprecher",
    French: "Haut-parleur intelligent",
    Filipino: "Matalinong Speaker",
    Thai: "ลำโพงอัจฉริยะ",
    "中文 (簡体)": "智能音箱",
  },
  characterList: [
    characterSmartFemaleAssistantGoogleTTS_ja_JP,
    characterSmartFemaleAssistantOpenAITTS_ja_JP,
  ],
  backgroundList: [backgroundNoBackground],
  layoutList: [layoutNothing],
});
