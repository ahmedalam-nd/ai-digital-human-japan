import { Background } from "../background.js";

export const backgroundImageTBGlobalHQEntrance = new Background({
  names: {
    English: "Toyota Boshoku Global HQ Entrance",
    日本語: "トヨタ紡織グローバル本社エントランス",
    Hindi: "टोयोटा बोशोकू वैश्विक मुख्यालय प्रवेश द्वार",
    Spanish: "Entrada a la sede global de Toyota Boshoku",
    Italian: "Ingresso alla sede globale di Toyota Boshoku",
    German: "Eingang zum Toyota Boshoku Global Headquarters",
    French: "Entrée du siège mondial de Toyota Boshoku",
  },
  url: 'url("../image/tb_global_hq_entrance.jpg")',
  prompts: {
    English:
      "Let's talk about new project with Yoshida-san in the entrance of Toyota Boshoku Global HQ.",
    日本語:
      "トヨタ紡織グローバル本社エントランスで吉田さんと新しいプロジェクトについて楽しく元気に業務に取り組みましょう！",
    Hindi:
      "टोयोटा बोशोकू वैश्विक मुख्यालय प्रवेश द्वार में योशिदा-सान के साथ नए परियोजना के बारे में बात करते हैं।",
    Spanish:
      "Hablemos del nuevo proyecto con Yoshida-san en la entrada de la sede global de Toyota Boshoku.",
    Italian:
      "Parliamo del nuovo progetto all'ingresso della sede globale di Toyota Boshoku.",
    German:
      "Sprechen wir über das neue Projekt mit Yoshida-san am Eingang des Toyota Boshoku Global Headquarters.",
    French:
      "Parlons du nouveau projet avec Yoshida-san à l'entrée du siège mondial de Toyota Boshoku.",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
