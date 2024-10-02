import { Background } from "../background.js";

export const backgroundImageToyosuCenterBuilding = new Background({
  names: {
    English: "Toyosu Center Building",
    日本語: "豊洲センタービル",
    Hindi: "एनटीटी डेटा इनोवेशन स्टूडियो",
    Spanish: "Estudio de innovación de NTT DATA",
    Italian: "NTT DATA Innovation Studio",
    German: "NTT DATA Innovation Studio",
    French: "Studio d'innovation NTT DATA",
  },
  url: 'url("../image/toyosu004.png")',
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
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
