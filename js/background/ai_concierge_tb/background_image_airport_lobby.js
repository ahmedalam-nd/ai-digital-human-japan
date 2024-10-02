import { Background } from "../background.js";

export const backgroundImageAirportLobby = new Background({
  names: {
    English: "Airport Lobby",
    日本語: "空港ロビー",
    "中文 (簡体)": "机场大厅",
  },
  url: 'url("../image/airport_lobby.png")',
  prompts: {
    English:
      "Here are some of the recommended restaurants and stores at Central Japan International Airport Centrair.",
    日本語:
      "中部国際空港セントレアのおすすめのレストランやショップをご紹介します。",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
