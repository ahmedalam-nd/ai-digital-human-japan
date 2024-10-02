import { Layout } from "./layout.js";

export const layoutVerticalKiosk = new Layout({
  names: {
    English: "Vertical Kiosk",
    日本語: "縦置き筐体",
    Hindi: "लंबवत कियॉस्क",
    Spanish: "Quiosco vertical",
    Italian: "Chiosco verticale",
    German: "Vertikaler Kiosk",
    French: "Kiosque vertical",
    Filipino: "Pangkioskong Pahalang",
    "中文 (簡体)": "垂直式亭子",
  },
  ids: ["message_box_container", "userinput", "avatar", "extra-content"],
  classname: "vertical",
});
