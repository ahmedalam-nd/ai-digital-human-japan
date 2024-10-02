import { Background } from "../background.js";

export const backgroundImageLivingRoomB = new Background({
  names: {
    English: "Living Room B",
    日本語: "リビングルーム B",
    Hindi: "लिविंग रूम B",
    Spanish: "Sala de estar B",
    Italian: "Soggiorno B",
    German: "Wohnzimmer B",
    French: "Salon B",
  },
  url: 'url("../image/niceguy001.jpg")',
  prompts: {
    English: "Chat about daily life and some daily issues.",
    日本語: "日常生活や日常の問題についてお話ししましょう。",
    Hindi: "दैनिक जीवन और कुछ दैनिक मुद्दों के बारे में चर्चा करें।",
    Spanish: "Charlar sobre la vida diaria y algunos problemas cotidianos.",
    Italian:
      "Chiacchierare della vita quotidiana e di alcuni problemi quotidiani.",
    German:
      "Plaudern Sie über das tägliche Leben und einige alltägliche Probleme.",
    French:
      "Discutez de la vie quotidienne et de certains problèmes quotidiens.",
  },
  type: "image",
  backdropFilter: "blur(2.5px)",
});
