import { Background } from "../background.js";

export const backgroundIframeZenkoji = new Background({
  names: {
    English: "Zenkoji",
    日本語: "善光寺",
    "中文 (簡体)": "善光寺",
    Hindi: "जेंकोजी",
    Filipino: "Zenkoji",
  },
  url: "https://my.matterport.com/show/?m=dA2Vg9rn5Ut&vr=1&play=1",
  prompts: {
    English:
      "Let's see around the Zenkoji at Nagano Prefecture, Japan together.",
    日本語: "長野県の善光寺を一緒に巡りましょう。",
    "中文 (簡体)": "让我们一起看看日本长野县的善光寺。",
    Hindi: "चलो जापान के नागानो प्रदेश में जेंकोजी के आसपास देखते हैं।",
    Filipino:
      "Tingnan natin ang paligid ng Zenkoji sa lalawigan ng Nagano, Hapon.",
  },
  type: "iframe",
});
