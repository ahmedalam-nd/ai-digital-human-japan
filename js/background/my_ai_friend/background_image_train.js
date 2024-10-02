import { Background } from "../background.js";

export const backgroundImageTrain = new Background({
  names: {
    English: "Train",
    日本語: "電車内",
    Hindi: "रेलगाड़ी",
    Spanish: "Tren",
    Italian: "Treno",
    German: "Zug",
    French: "Train",
  },
  url: 'url("../image/train.png")',
  prompts: {
    English: "Let's chat about the weather and the scenery outside the window.",
    日本語: "天気や窓の外の景色について話しましょう。",
    Hindi: "चलिए मौसम और खिड़की के बाहर की दृश्य बारे में बात करते हैं।",
    Spanish: "Hablemos del clima y el paisaje fuera de la ventana.",
    Italian: "Parliamo del tempo e del paesaggio fuori dalla finestra.",
    German:
      "Lassen Sie uns über das Wetter und die Landschaft vor dem Fenster plaudern.",
    French: "Parlons du temps et du paysage à l'extérieur de la fenêtre.",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
