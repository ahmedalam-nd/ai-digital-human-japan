import { Background } from "../background.js";

export const backgroundImageTBGlobalHQMeetingArea = new Background({
  names: {
    English: "Toyota Boshoku Global HQ Meeting Area",
    日本語: "トヨタ紡織グローバル本社来客エリア",
    Hindi: "टोयोटा बोशोकू वैश्विक मुख्यालय बैठक क्षेत्र",
    Spanish: "Área de reunión de la sede global de Toyota Boshoku",
    Italian: "Area di incontro della sede globale di Toyota Boshoku",
    German: "Besprechungsbereich des Toyota Boshoku Global Headquarters",
    French: "Espace de réunion du siège mondial de Toyota Boshoku",
  },
  url: 'url("../image/tb_global_hq_meeting_area.jpg")',
  prompts: {
    English:
      "Let's talk about new project with Yoshida-san in the meeting area of Toyota Boshoku Global HQ.",
    日本語:
      "トヨタ紡織グローバル本社来客エリアで吉田さんと新しいプロジェクトについて楽しく元気に業務に取り組みましょう！",
    Hindi:
      "टोयोटा बोशोकू वैश्विक मुख्यालय बैठक क्षेत्र में योशिदा-सान के साथ नए परियोजना के बारे में बात करते हैं।",
    Spanish:
      "hablemos del nuevo proyecto con Yoshida-san en el área de reunión de la sede global de Toyota Boshoku.",
    Italian:
      "Parliamo del nuovo progetto con Yoshida-san nell'area di incontro della sede globale di Toyota Boshoku.",
    German:
      "Sprechen wir über das neue Projekt mit Yoshida-san im Besprechungsbereich des Toyota Boshoku Global Headquarters.",
    French:
      "Parlons du nouveau projet avec Yoshida-san dans l'espace de réunion du siège mondial de Toyota Boshoku.",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
