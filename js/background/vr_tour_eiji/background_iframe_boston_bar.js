import { Background } from "../background.js";
import { Tour } from "../tour.js";

export const backgroundIframeBostonBar = new Background({
  names: {
    English: "Boston Bar",
    日本語: "ボストン・バー",
    "中文 (簡体)": "波士頓酒吧",
    Hindi: "बोस्टन बार",
    Filipino: "Boston Bar",
  },
  url: "https://my.matterport.com/show/?m=38Rc2wjM9t2&play=1",
  prompts: {
    English: "Let's drink together in Boston Bar in Düsseldorf, Deutschland.",
    日本語: "ドイツのデュッセルドルフにあるボストン バーで一緒に飲みましょう。",
    "中文 (簡体)": "让我们一起在德国杜塞尔多夫的波士顿酒吧喝酒。",
    Hindi: "चलो जर्मनी के डूसेल्डोर्फ में बोस्टन बार में साथ में पीते हैं।",
    Filipino: "Mag-inuman tayo sa Boston Bar sa Düsseldorf, Deutschland.",
  },
  type: "iframe",
  tourList: [
    new Tour({
      names: {
        English: "Sports Bar",
        日本語: "スポーツバー",
        "中文 (簡体)": "运动酒吧",
        Hindi: "स्पोर्ट्स बार",
        Filipino: "Sports Bar",
      },
      url: "https://my.matterport.com/show/?m=38Rc2wjM9t2&play=1&sr=.16%2C.24&ss=5&tag=6ymaXdwSEtX&pin-pos=2.84%2C2.15%2C-1.09",
      quotes: {
        English: "Watch presentations or sports broadcasts here.",
        日本語: "ここでプレゼンテーションやスポーツ中継を見ることができます。",
        "中文 (簡体)": "在这里观看演示或体育广播。",
        Hindi: "यहां प्रस्तुतियों या खेल प्रसारण देखें।",
        Filipino: "Panoorin ang mga presentasyon o mga palabas sa sports dito.",
      },
    }),
    new Tour({
      names: {
        English: "Restroom",
        日本語: "お手洗い",
        "中文 (簡体)": "洗手间",
        Hindi: "शौचालय",
        Filipino: "Restroom",
      },
      url: "https://my.matterport.com/show/?m=38Rc2wjM9t2&play=1&sr=-.15%2C-.05&ss=18&tag=PsEMUCvk852&pin-pos=18.32%2C1.35%2C.99",
      quotes: {
        English: "There is a restroom here.",
        日本語: "ここにはトイレがあります。",
        "中文 (簡体)": "这里有洗手间。",
        Hindi: "यहां एक शौचालय है।",
        Filipino: "Mayroong restroom dito.",
      },
    }),
    new Tour({
      names: {
        English: "Partition Wall Area",
        日本語: "パーティションエリア",
        "中文 (簡体)": "隔断墙区域",
        Hindi: "विभाजन दीवार क्षेत्र",
        Filipino: "Partition Wall Area",
      },
      url: "https://my.matterport.com/show/?m=38Rc2wjM9t2&play=1&sr=-.17%2C-1.1&ss=17&tag=kowMSy8tgZH&pin-pos=18.5%2C1.52%2C2.53",
      quotes: {
        English:
          "With this flexible partition, the Boston Bar can be divided into 2 areas.",
        日本語:
          "この柔軟なパーティションで、ボストンバーは2つのエリアに分けることができます。",
        "中文 (簡体)": "有了这个灵活的隔断，波士顿酒吧可以分成两个区域。",
        Hindi:
          "इस लचीले विभाजन के साथ, बॉस्टन बार को 2 क्षेत्रों में विभाजित किया जा सकता है।",
        Filipino:
          "Sa pamamagitan ng flexible na partition na ito, ang Boston Bar ay maaaring hatiin sa 2 lugar.",
      },
    }),
    new Tour({
      names: {
        English: "Large Projector Area",
        日本語: "大型プロジェクターエリア",
        "中文 (簡体)": "大型投影仪区域",
        Hindi: "बड़ा प्रोजेक्टर क्षेत्र",
        Filipino: "Large Projector Area",
      },
      url: "https://my.matterport.com/show/?m=38Rc2wjM9t2&play=1&sr=.6%2C.78&ss=27&tag=J5WBZKWPDob&pin-pos=22.47%2C2.44%2C.63",
      quotes: {
        English:
          "There is a large projector here, you can project and watch your own videos as well.",
        日本語:
          "ここには大型プロジェクターがあり、自分のビデオを投影して見ることもできます。",
        "中文 (簡体)": "这里有一个大型投影仪，您也可以投影和观看自己的视频。",
        Hindi:
          "यहां एक बड़ा प्रोजेक्टर है, आप अपने वीडियो को प्रोजेक्ट और देख सकते हैं।",
        Filipino:
          "Mayroong malaking projector dito, maaari mong i-project at panoorin ang iyong sariling mga video.",
      },
    }),
  ],
});
