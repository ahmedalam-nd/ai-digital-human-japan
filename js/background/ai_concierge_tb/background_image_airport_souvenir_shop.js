import { Background } from "../background.js";

export const backgroundImageAirportSouvenirShop = new Background({
  names: {
    English: "Souvenir shop",
    日本語: "おみやげ屋",
    "中文 (簡体)": "纪念品商店",
  },
  url: 'url("../image/airport_souvenir_shop.png")',
  prompts: {
    English:
      "Here are some of the recommended restaurants and stores at Central Japan International Airport Centrair.",
    日本語:
      "中部国際空港セントレアのおすすめのレストランやショップをご紹介します。",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
