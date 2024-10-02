import { Layout } from "./layout.js";

export const layoutNothing = new Layout({
  names: {
    English: "No Layout",
    日本語: "レイアウトなし",
    Hindi: "कोई लेआउट नहीं",
    Spanish: "Sin diseño",
    Italian: "Nessun layout",
    German: "Kein Layout",
    French: "Aucune mise en page",
  },
  ids: ["message_box_container", "userinput", "extra-content"],
  classname: "nothing",
});
