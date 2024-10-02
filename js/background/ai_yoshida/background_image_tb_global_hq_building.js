import { Background } from "../background.js";

export const backgroundImageTBGlobalHQBuilding = new Background({
  names: {
    English: "Toyota Boshoku Global Headquarters",
    日本語: "トヨタ紡織グローバル本社",
    Hindi: "टोयोटा बोशोकू वैश्विक मुख्यालय",
    Spanish: "Sede global de Toyota Boshoku",
    Italian: "Sede globale di Toyota Boshoku",
    German: "Toyota Boshoku Global Headquarters",
    French: "Siège mondial de Toyota Boshoku",
  },
  url: 'url("../image/tb_global_hq_building.jpg")',
  prompts: {
    English:
      "Let's talk about new project with Yoshida-san in Toyota Boshoku Global HQ.",
    日本語:
      "トヨタ紡織グローバル本社で吉田さんと新しいプロジェクトについて楽しく元気に業務に取り組みましょう！",
    Hindi:
      "टोयोटा बोशोकू वैश्विक मुख्यालय में योशिदा-सान के साथ नए परियोजना के बारे में बात करते हैं।",
    Spanish:
      "hablemos del nuevo proyecto con Yoshida-san en la sede global de Toyota Boshoku.",
    Italian:
      "Parliamo del nuovo progetto nella sede globale di Toyota Boshoku.",
    German:
      "Sprechen wir über das neue Projekt mit Yoshida-san im Toyota Boshoku Global HQ.",
    French:
      "Parlons du nouveau projet avec Yoshida-san au siège mondial de Toyota Boshoku.",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
