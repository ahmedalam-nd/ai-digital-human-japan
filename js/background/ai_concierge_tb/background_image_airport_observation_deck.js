import { Background } from "../background.js";

export const backgroundImageAirportObservationDeck = new Background({
  names: {
    English: "Observation Deck",
    日本語: "展望デッキ",
    "中文 (簡体)": "观景台",
  },
  url: 'url("../image/airport_observation_deck.png")',
  prompts: {
    English:
      "Here are some of the recommended restaurants and stores at Central Japan International Airport Centrair.",
    日本語:
      "中部国際空港セントレアのおすすめのレストランやショップをご紹介します。",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
