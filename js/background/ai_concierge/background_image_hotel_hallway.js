import { Background } from "../background.js";

export const backgroundImageHotelHallway = new Background({
  names: {
    English: "Hotel Hallway",
    日本語: "ホテル廊下",
    "中文 (簡体)": "",
  },
  url: 'url("../image/hotel003.jpg")',
  prompts: {
    English:
      "Let's review NTT DATA's ForeSight Day 2024, explaining the timetable, venues, and presenters for new technology trends.",
    日本語:
      "NTT DATA ForeSight Day 2024 について、新しいテクノロジーの動向を紹介するタイムテーブル、会場、プレゼンターをご紹介します。",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
