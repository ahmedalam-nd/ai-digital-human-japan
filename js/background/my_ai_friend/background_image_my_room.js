import { Background } from "../background.js";

export const backgroundImageMyRoom = new Background({
  names: {
    English: "My Room",
    日本語: "自分の部屋",
    Hindi: "मेरा कमरा",
    Spanish: "Mi Habitación",
    Italian: "La Mia Stanza",
    German: "Mein Zimmer",
    French: "Ma Chambre",
  },
  url: 'url("../image/room.png")',
  prompts: {
    English: "Let's chat about your room and your family.",
    日本語: "あなたの部屋や家族について話しましょう。",
    Hindi: "आइए अपने कमरे और अपने परिवार के बारे में बात करते हैं।",
    Spanish: "Hablemos de tu habitación y tu familia.",
    Italian: "Parliamo della tua stanza e della tua famiglia.",
    German: "Lassen Sie uns über Ihr Zimmer und Ihre Familie plaudern.",
    French: "Parlons de votre chambre et de votre famille.",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
