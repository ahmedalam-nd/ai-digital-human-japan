import { Background } from "../background.js";

export const backgroundImageBankLobby = new Background({
  names: {
    English: "Bank Lobby",
    日本語: "銀行のロビー",
    Italian: "Hall della banca",
    "中文 (簡体)": "银行大厅",
  },
  url: 'url("../image/bank_lobby.jpg")',
  prompts: {
    English: "Explain financial products to customers in the bank lobby.",
    Italian: "Spiega i prodotti finanziari ai clienti nella hall della banca.",
    日本語: "銀行のロビーで、お客様に金融商品について説明しましょう。",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
