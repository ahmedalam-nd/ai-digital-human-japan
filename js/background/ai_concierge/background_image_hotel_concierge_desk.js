import { Background } from "../background.js";

export const backgroundImageHotelConciergeDesk = new Background({
  names: {
    English: "Hotel Concierge Desk",
    日本語: "ホテルコンシェルジュデスク",
    "中文 (簡体)": "酒店礼宾台",
  },
  url: 'url("../image/hotel002.jpg")',
  prompts: {
    English:
      "Let's review NTT DATA's ForeSight Day 2024, explaining the timetable, venues, and presenters for new technology trends.",
    日本語:
      "NTT DATA ForeSight Day 2024 について、新しいテクノロジーの動向を紹介するタイムテーブル、会場、プレゼンターをご紹介します。",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
