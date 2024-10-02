import { Scene } from "./scene.js";
import { apiKeys } from "../apikeys.js";

import { characterHinaReallusionNavigatorGoogleTTS_en_US } from "../character/ica/character_hina_reallusion_navigator_googletts_en_US.js";
import { characterICAHinaConciergeFC_en_US_NoTTS } from "../character/ica/character_ica_hina_concierge_fc_en_US_notts.js";
import { characterICAHinaConciergeFC_en_US_GoogleTTS } from "../character/ica/character_ica_hina_concierge_fc_en_US_googletts.js";
import { characterICAHina_en_US_NoTTS } from "../character/ica/character_ica_hina_en_US_notts.js";
import { characterICAHina_en_US_GoogleTTS } from "../character/ica/character_ica_hina_en_US_googletts.js";

import { backgroundNoBackground } from "../background/background_no_background.js";

import { layoutHorizontalMaximized } from "../layout/layout_horizontal_maximized.js";
import { layoutHorizontalMaximizedlLeft } from "../layout/layout_horizontal_maximized_left.js";
import { layoutVerticalKiosk } from "../layout/layout_vertical_kiosk.js";

export const sceneICA = new Scene({
  sceneId: "sceneICA",
  apiKeys: apiKeys,
  names: {
    日本語: "Reallusion iClone 8 DHA",
    English: "Reallusion iClone 8 DHA",
    Filipino: "Reallusion iClone 8 DHA",
    Thai: "Reallusion iClone 8 DHA",
    "中文 (簡体)": "Reallusion iClone 8 DHA",
    Hindi: "Reallusion iClone 8 DHA",
    Spanish: "Reallusion iClone 8 DHA",
    Italian: "Reallusion iClone 8 DHA",
    German: "Reallusion iClone 8 DHA",
    French: "Reallusion iClone 8 DHA",
    Swedish: "Reallusion iClone 8 DHA",
  },
  characterList: [
    characterHinaReallusionNavigatorGoogleTTS_en_US,
    characterICAHinaConciergeFC_en_US_NoTTS,
    characterICAHinaConciergeFC_en_US_GoogleTTS,
    characterICAHina_en_US_NoTTS,
    characterICAHina_en_US_GoogleTTS,
  ],
  defaultCharacterIndex: 0,
  backgroundList: [backgroundNoBackground],
  layoutList: [
    layoutHorizontalMaximizedlLeft,
    layoutHorizontalMaximized,
    layoutVerticalKiosk,
  ],
});
