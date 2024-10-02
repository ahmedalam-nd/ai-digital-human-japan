import { Background } from "../background.js";

export const backgroundImageInforiumMeetingArea = new Background({
  names: {
    English: "Inforium Meeting Area",
    日本語: "インフォリウム打ち合わせエリア",
    Hindi: "इन्फोरियम बैठक क्षेत्र",
    Spanish: "Área de reuniones de Inforium",
    Italian: "Area riunioni Inforium",
    German: "Inforium Meeting Area",
    French: "Zone de réunion de l'Inforium",
    "中文 (簡体)": "Inforium 會議區",
  },
  url: 'url("../image/inforium002.png")',
  prompts: {
    English:
      "'s discuss potencial collaboration with NTT DATA for deriving new ideas.",
    日本語:
      "NTTデータとの新しいアイデアを生み出すための潜在的なコラボレーションについて話し合おう。",
    Hindi: "एनटीटी डेटा के साथ नई विचारों को निकालने के लिए बात करते हैं।",
    Spanish: "Hablemos de la colaboración potencial con NTT DATA.",
    Italian: "Parliamo della collaborazione potenziale con NTT DATA.",
    German:
      "Lassen Sie uns die potenzielle Zusammenarbeit mit NTT DATA diskutieren.",
    French: "Discutons de la collaboration potentielle avec NTT DATA.",
    "中文 (簡体)": "让我们讨论与NTT DATA的潜在合作。",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
