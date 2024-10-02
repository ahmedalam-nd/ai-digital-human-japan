import { Background } from "../background.js";

export const backgroundImageToyosuCenterBuildingEntrance = new Background({
  names: {
    English: "Toyosu Center Building Entrance",
    日本語: "豊洲センタービル入口",
    Hindi: "टोयोसु केंद्र भवन प्रवेश द्वार",
    Spanish: "Entrada al edificio del Centro Toyosu",
    Italian: "Ingresso dell'edificio del centro Toyosu",
    German: "Eingang zum Toyosu-Center-Gebäude",
    French: "Entrée du bâtiment du centre Toyosu",
    "中文 (簡体)": "豊洲中心大厦入口",
  },
  url: 'url("../image/toyosu005.png")',
  prompts: {
    English: "Let's talk about NTT DATA Toyosu office and Toyosu Station.",
    日本語: "NTTデータの豊洲オフィスと豊洲駅について話そう。",
    Hindi:
      "आइए एनटीटी डेटा टोयोसु कार्यालय और टोयोसु स्टेशन के बारे में बात करते हैं।",
    Spanish: "Hablemos de la oficina de NTT DATA Toyosu y la estación Toyosu.",
    Italian:
      "Parliamo dell'ufficio NTT DATA di Toyosu e della stazione di Toyosu.",
    German:
      "Sprechen wir über das NTT DATA Toyosu-Büro und den Toyosu-Bahnhof.",
    French: "Parlons du bureau NTT DATA Toyosu et de la gare de Toyosu.",
    "中文 (簡体)": "让我们谈谈NTT DATA Toyosu办事处和Toyosu车站。",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
