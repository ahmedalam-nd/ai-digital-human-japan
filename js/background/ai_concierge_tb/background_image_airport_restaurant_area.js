import { Background } from "../background.js";

export const backgroundImageAirportRestaurant = new Background({
  names: {
    English: "Restaurant area",
    日本語: "レストランエリア",
    "中文 (簡体)": "餐厅区域",
  },
  url: 'url("../image/airport_restaurant_area.png")',
  prompts: {
    English:
      "Here are some of the recommended restaurants and stores at Central Japan International Airport Centrair.",
    日本語:
      "中部国際空港セントレアのおすすめのレストランやショップをご紹介します。",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
