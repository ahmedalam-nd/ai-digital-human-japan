import { Background } from "../background.js";

export const backgroundIframeXInc = new Background({
  names: {
    English: "X, inc. | apotto",
    日本語: "株式会社X | apotto",
    Filipino: "X, inc. | apotto",
    Thai: "X, inc. | apotto",
    "中文 (簡体)": "X, inc. | apotto",
    Swedish: "X, inc. | apotto",
  },
  url: "https://v2.apotto.jp/space/store/87F05FFD-A32E-4DCF-B27A-FC78AD165969?&lid=87F05FFD-A32E-4DCF-B27A-FC78AD165969&cam=2",
  prompts: {
    English:
      "Let's take a tour together of X, inc. office for the demo integrated with their Apotto service",
    日本語:
      "株式会社Xのオフィスを一緒に見学しましょう。Apottoサービスと統合されたデモを行います。",
    Filipino:
      "Sabay-sabay tayong mamasyal sa opisina ng X, inc. para sa demo na integrated sa kanilang Apotto service",
    Thai: "มาร่วมชมสำนักงานของ X, inc. สำหรับการสาธิตที่ผสมผสานกับบริการ Apotto ของพวกเขา",
    "中文 (簡体)":
      "让我们一起参观X, inc.办公室，进行与他们的Apotto服务集成的演示。",
    Swedish:
      "Låt oss ta en rundtur tillsammans i X, inc. kontor för demo integrerat med deras Apotto-tjänst",
  },
  type: "iframe",
});
