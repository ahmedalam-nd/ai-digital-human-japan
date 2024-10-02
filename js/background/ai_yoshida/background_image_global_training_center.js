import { Background } from "../background.js";

export const backgroundImageGlobalTrainingCenter = new Background({
  names: {
    English: "Toyota Boshoku Global Training Center",
    日本語: "トヨタ紡織グローバルトレーニングセンター",
    Hindi: "टोयोटा बोशोकू वैश्विक प्रशिक्षण केंद्र",
    Spanish: "Centro de capacitación global de Toyota Boshoku",
    Italian: "Centro di formazione globale di Toyota Boshoku",
    German: "Toyota Boshoku Global Training Center",
    French: "Centre de formation mondial de Toyota Boshoku",
  },
  url: 'url("../image/toyota_boshoku_training_center.jpg")',
  prompts: {
    English: "Let's talk about new project in Toyota Boshoku HQ.",
    日本語: "トヨタ紡織本社で新しいプロジェクトについて話しましょう。",
    Hindi:
      "टोयोटा बोशोकू हेडक्वार्टर्स में नए परियोजना के बारे में बात करते हैं।",
    Spanish: "Hablemos del nuevo proyecto en la sede de Toyota Boshoku.",
    Italian:
      "Parliamo del nuovo progetto nella sede centrale di Toyota Boshoku.",
    German: "Sprechen wir über das neue Projekt in der Toyota Boshoku HQ.",
    French: "Parlons du nouveau projet au siège de Toyota Boshoku.",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
