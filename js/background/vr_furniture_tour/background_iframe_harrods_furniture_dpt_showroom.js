import { Background } from "../background.js";
import { Tour } from "../tour.js";

export const backgroundIframeHarrodsFurnitureDptShowroom = new Background({
  names: {
    English: "Harrods, Furniture Department Showroom| Matterport",
    日本語: "Harrods 高級家具ショールーム | Matterport",
  },
  url: "https://my.matterport.com/show/?m=ZroTLZjumNH&hl=1&vr=1&play=1",
  prompts: {
    English:
      'Let\'s take a tour together of Harrods Furniture Department Showroom"Harrods" Furniture Department Showroom.',
    日本語: "Harrods 高級家具ショールームをご案内します。",
  },
  type: "iframe",
  tourList: [
    new Tour({
      names: {
        English: "FENDI",
        日本語: "FENDI",
      },
      url: "https://my.matterport.com/show/?sr=-.21%2C-.28&ss=403&hl=1&m=kYAW3WVWVDZ&play=1&tag=vDRmwAyNBP4&pin-pos=37.36%2C1.58%2C52.3",
      quotes: {
        English:
          "In the new Fendi Casa line, beauty finds its purpose in objects with the highest craftsmanship. This is FENDI's idea of interior design: elegant and light, classic yet innovative.",
        日本語:
          "新しいFENDI CASA ラインでは、最高の職人技が施されたオブジェクトに美しさの目的が見出されます。これがFENDIのインテリア デザインのアイデアです。エレガントで軽やか、クラシックでありながら革新的です。",
      },
    }),
    new Tour({
      names: {
        English: "Hermes",
        日本語: "エルメス",
      },
      url: "https://my.matterport.com/show/?play=1&share=0&hl=1&m=ZroTLZjumNH&ss=158&sr=-1.73%2C-1.32&tag=tdBjolJET8K&pin-pos=25.35%2C1.4%2C-11.21",
      quotes: {
        English:
          "Bold lines, depth of color and porcelain finesse, through its designs, Hermes tells stories to be enjoyed during dinner parties or one-on-one over a cup of tea.",
        日本語:
          "大胆なライン、深みのある色彩、磁器の繊細さ、デザインを通して、ディナーパーティーや一杯のお茶を飲みながらOne On Oneで楽しむストーリーをエルメスはお伝えします",
      },
    }),
    new Tour({
      names: {
        English: "Technogym",
        日本語: "テクノジム",
      },
      url: "https://my.matterport.com/show/?play=1&share=0&hl=1&m=ZroTLZjumNH&ss=176&sr=-2.82%2C-.74&tag=fI3TBxx1gPf&pin-pos=-7.91%2C1.28%2C41.15",
      quotes: {
        English:
          "The space is aimed at enthusiasts of all levels who enjoy practicing sports in a commercial gym or at home, with the interior representing a wellness oasis in the heart of Harrods, combining aesthetic with function in a design handwriting unique to the Technogym brand.",
        日本語:
          "このスペースは、商業ジムや自宅でスポーツを楽しむあらゆるレベルの愛好家を対象としており、インテリアはハロッズの中心部にあるウェルネスのオアシスを表現し、テクノジムブランドならではのデザインで美学と機能を融合させています。",
      },
    }),
  ],
});
