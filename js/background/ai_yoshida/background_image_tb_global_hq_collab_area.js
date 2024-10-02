import { Background } from "../background.js";

export const backgroundImageTBGlobalHQCollabArea = new Background({
  names: {
    English: "Toyota Boshoku Global HQ Collaboration Area",
    日本語: "トヨタ紡織グローバル本社コラボレーションエリア",
    Hindi: "टोयोटा बोशोकू वैश्विक मुख्यालय सहयोग क्षेत्र",
    Spanish: "Colaboración en la sede global de Toyota Boshoku",
    Italian: "Area di collaborazione della sede globale di Toyota Boshoku",
    German: "Zusammenarbeit im Toyota Boshoku Global Headquarters",
    French: "Collaboration au siège mondial de Toyota Boshoku",
  },
  url: 'url("../image/tb_global_hq_collab_area.jpg")',
  prompts: {
    English:
      "Let's talk about new project with Yoshida-san in the collaboration area of Toyota Boshoku Global HQ.",
    日本語:
      "トヨタ紡織グローバル本社コラボレーションエリアで吉田さんと新しいプロジェクトについて楽しく元気に業務に取り組みましょう！",
    Hindi:
      "टोयोटा बोशोकू वैश्विक मुख्यालय सहयोग क्षेत्र में योशिदा-सान के साथ नए परियोजना के बारे में बात करते हैं।",
    Spanish:
      "Hablemos del nuevo proyecto con Yoshida-san en el área de colaboración de la sede global de Toyota Boshoku.",
    Italian:
      "Parliamo del nuovo progetto con Yoshida-san nell'area di collaborazione della sede globale di Toyota Boshoku.",
    German:
      "Sprechen wir über das neue Projekt mit Yoshida-san im Zusammenarbeitsbereich des Toyota Boshoku Global Headquarters.",
    French:
      "Parlons du nouveau projet avec Yoshida-san dans l'espace de collaboration du siège mondial de Toyota Boshoku.",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
