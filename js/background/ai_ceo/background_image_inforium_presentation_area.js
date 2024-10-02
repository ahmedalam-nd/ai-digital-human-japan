import { Background } from "../background.js";

export const backgroundImageInforiumPresentationArea = new Background({
  names: {
    English: "Inforium Presentation Area",
    日本語: "インフォリウムプレゼンテーションエリア",
    Hindi: "इन्फोरियम प्रस्तुति क्षेत्र",
    Spanish: "Área de presentación de Inforium",
    Italian: "Area di presentazione Inforium",
    German: "Inforium Presentation Area",
    French: "Zone de présentation de l'Inforium",
  },
  url: 'url("../image/inforium005.png")',
  prompts: {
    English: "Let's discuss the workshop and collaboration with NTT DATA.",
    日本語: "NTTデータとのワークショップやコラボレーションについて話し合おう。",
    Hindi: "एनटीटी डेटा के साथ कार्यशाला और सहयोग पर चर्चा करते हैं।",
    Spanish: "Hablemos de la colaboración potencial con NTT DATA.",
    Italian: "Parliamo della collaborazione potenziale con NTT DATA.",
    German:
      "Lassen Sie uns die potenzielle Zusammenarbeit mit NTT DATA diskutieren.",
    French: "Discutons de la collaboration potentielle avec NTT DATA.",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
