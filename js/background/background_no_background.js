import { Background } from "./background.js";

export const backgroundNoBackground = new Background({
  names: {
    English: "No Background",
    日本語: "背景なし",
    Hindi: "कोई पृष्ठभूमि नहीं",
    Spanish: "Sin fondo",
    Italian: "Nessuno sfondo",
    German: "Kein Hintergrund",
    French: "Pas de fond",
  },
  prompts: {
    English: "Assist the user according to the prompt.",
    日本語: "プロンプトに従ってユーザーを支援しましょう。",
    Hindi: "प्रॉम्प्ट के अनुसार उपयोगकर्ता की सहायता करें।",
    Spanish: "Ayuda al usuario según el aviso.",
    Italian: "Assistere l'utente secondo il prompt.",
    German: "Unterstützen Sie den Benutzer gemäß der Aufforderung.",
    French: "Aidez l'utilisateur en fonction de l'invite.",
  },
  type: "none",
});
