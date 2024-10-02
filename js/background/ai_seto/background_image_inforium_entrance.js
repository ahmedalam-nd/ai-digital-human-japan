import { Background } from "../background.js";

export const backgroundImageInforiumEntrance = new Background({
  names: {
    English: "Inforium Entrance",
    日本語: "インフォリウム入口",
    Hindi: "इन्फोरियम प्रवेश द्वार",
    Spanish: "Entrada de Inforium",
    Italian: "Ingresso Inforium",
    German: "Eingang zum Inforium",
    French: "Entrée de l'Inforium",
    "中文 (簡体)": "Inforium 入口",
  },
  url: 'url("../image/inforium000.png")',
  prompts: {
    English: "Let's talk about Inforium in NTT DATA Tokyo office.",
    日本語: "NTTデータ 東京オフィスのインフォリウムについて話そう。",
    Hindi:
      "आइए एनटीटी डेटा टोक्यो कार्यालय में इन्फोरियम के बारे में बात करते हैं।",
    Spanish: "Hablemos de Inforium en la oficina de NTT DATA Tokyo.",
    Italian: "Parliamo di Inforium nell'ufficio NTT DATA Tokyo.",
    German: "Sprechen wir über Inforium im NTT DATA Tokyo-Büro.",
    French: "Parlons de l'Inforium dans le bureau NTT DATA Tokyo.",
    "中文 (簡体)": "让我们谈谈NTT DATA东京办事处的Inforium。",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
