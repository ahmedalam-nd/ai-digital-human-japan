import { Background } from "../background.js";

export const backgroundImageInforiumWorkshopArea = new Background({
  names: {
    English: "Inforium Workshop Area",
    日本語: "インフォリウムワークショップエリア",
    Hindi: "इन्फोरियम कार्यशाला क्षेत्र",
    Spanish: "Área de taller de Inforium",
    Italian: "Area di lavoro Inforium",
    German: "Inforium Workshop Area",
    French: "Zone d'atelier de l'Inforium",
    "中文 (簡体)": "Inforium 工作坊區",
  },
  url: 'url("../image/inforium004.png")',
  prompts: {
    English: "Let's discuss the workshop and collaboration with NTT DATA.",
    日本語: "NTTデータとのワークショップやコラボレーションについて話し合おう。",
    Hindi: "एनटीटी डेटा के साथ कार्यशाला और सहयोग पर चर्चा करते हैं।",
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
