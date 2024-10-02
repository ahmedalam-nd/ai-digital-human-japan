import { Background } from "../background.js";
import { Tour } from "../tour.js";

export const backgroundIframeStallionWay = new Background({
  names: {
    English: "657 Stallion Way | Matterport",
    日本語: "657 Stallion Way | Matterport",
    Filipino: "657 Stallion Way | Matterport",
    Thai: "657 Stallion Way | Matterport",
    "中文 (簡体)": "657 Stallion Way | Matterport",
    Swedish: "657 Stallion Way | Matterport",
  },
  url: "https://my.matterport.com/show/?m=G149FwrrqmH&hl=1&vr=1&play=1",
  prompts: {
    English:
      "Let's take a tour together of \"657 Stallion Way\".",
    日本語:
      "こちらの物件を一緒に見学しましょう。",
    Filipino:
      'Sabay-sabay nating libutin ang property na ito.',
    Thai: 'เรามาเที่ยวชมสถานที่นี้ด้วยกัน',
    "中文 (簡体)": "和我们一起参观这座房产吧。",
    Swedish:
      'Följ med oss på en visning av denna fastighet..',
  },
  type: "iframe",
  tourList: [
    new Tour({
      names: {
        English: "Office Room",
        日本語: "仕事部屋",
      },
      url: "https://my.matterport.com/show/?play=1&share=0&m=G149FwrrqmH&ss=29&sr=.23%2C.21&tag=gPU1aObv9cU&pin-pos=-10.95%2C1.71%2C-4.63",
      quotes: {
        English:
          "This room can be used as a work room. Also recommended for remote work.",
        日本語:
          "こちらの部屋は仕事部屋として使うことができます。リモートワークにもおすすめです。",
      },
    }),
    new Tour({
      names: {
        English: "Home Theater",
        日本語: "ホームシアター",
      },
      url: "https://my.matterport.com/show/?play=1&share=0&m=G149FwrrqmH&ss=3&sr=-3.11%2C-.87&tag=HAMKuDNwuiR&pin-pos=-3.65%2C-1.17%2C.57",
      quotes: {
        English:
          "This room can be used as a home theater. Please enjoy a relaxing time while watching a movie.",
        日本語:
          "こちらの部屋はホームシアターとして使うことができます。映画を見ながらゆったりした時間をお過ごしください。",
      },
    }),
    new Tour({
      names: {
        English: "Bathroom",
        日本語: "洗面所",
      },
      url: "https://my.matterport.com/show/?play=1&share=0&m=G149FwrrqmH&ss=41&sr=-1.53%2C1.1&tag=GQjCcIx0dwG&pin-pos=-7.21%2C1.65%2C-6.88",
      quotes: {
        English:
          "This has a marble floor. It gives a sense of luxury to a clean space based on white.",
        日本語:
          "こちらは大理石の床となっています。白を基調とした清潔感のある空間に高級感を与えてくれます。",
      },
    }),
  ],
});
