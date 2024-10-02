import { Background } from "../background.js";

export const backgroundImageTrainStation = new Background({
  names: {
    English: "Train Station",
    日本語: "駅前",
    Hindi: "रेलवे स्टेशन",
    Spanish: "Estación de Tren",
    Italian: "Stazione Ferroviaria",
    German: "Bahnhof",
    French: "Gare",
  },
  url: 'url("../image/train_station.png")',
  prompts: {
    English:
      "Let's chat new stores in the city and some gosships around the city.",
    日本語: "街の新しい店や、街の周りのゴシップについて話しましょう。",
    Hindi: "आइए शहर में नए स्टोर और शहर के चारों ओर कुछ गपशप करें।",
    Spanish:
      "Hablemos de las nuevas tiendas de la ciudad y de algunos chismes por la ciudad.",
    Italian:
      "Parliamo dei nuovi negozi della città e di alcuni pettegolezzi in giro per la città.",
    German:
      "Lassen Sie uns über neue Geschäfte in der Stadt und einige Gossips in der Stadt plaudern.",
    French:
      "Parlons des nouveaux magasins de la ville et de quelques potins autour de la ville.",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
