import { Background } from "../background.js";

export const backgroundImageShoppingMall = new Background({
  names: {
    English: "Shopping Mall",
    日本語: "ショッピングモール",
    Hindi: "शॉपिंग मॉल",
    Spanish: "Centro comercial",
    Italian: "Centro commerciale",
    German: "Einkaufszentrum",
    French: "Centre commercial",
  },
  url: 'url("../image/niceguy006.jpg")',
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
