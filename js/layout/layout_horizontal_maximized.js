import { Layout } from "./layout.js";

export const layoutHorizontalMaximized = new Layout({
  names: {
    English: "Horizontal Display Maximized",
    日本語: "横長ディスプレイ最大化",
    Hindi: "लेआउट बड़ा लंबवत",
    Spanish: "Diseño maximizado horizontal",
    Italian: "Layout massimizzato orizzontale",
    German: "Horizontales Layout maximiert",
    French: "Disposition horizontale maximisée",
  },
  ids: ["message_box_container", "userinput", "avatar", "extra-content"],
  classname: "horizontal_maximized",
});
