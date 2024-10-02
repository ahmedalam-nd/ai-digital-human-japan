import { Background } from "../background.js";

export const backgroundIframeMaloCabin = new Background({
  names: {
    English: "Malo Cabin",
    日本語: "マロ・キャビン",
    "中文 (簡体)": "马洛小屋",
    Hindi: "मालो केबिन",
    Filipino: "Malo Cabin",
  },
  url: "https://my.matterport.com/show/?m=KXB1Wr52X91&play=1",
  prompts: {
    English: "Let's look around the rental cabin at Saint Malo, Canada.",
    日本語: "カナダのサン・マロにあるレンタルキャビンを見てみましょう。",
    "中文 (簡体)": "让我们看看加拿大圣马洛的出租小屋。",
    Hindi: "चलो कनाडा के सेंट मालो में किराए के केबिन के आसपास देखते हैं।",
    Filipino:
      "Tingnan natin ang paligid ng rental cabin sa Saint Malo, Canada.",
  },
  type: "iframe",
});
