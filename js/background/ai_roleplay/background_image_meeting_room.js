import { Background } from "../background.js";

export const backgroundImageMeetingRoom = new Background({
  names: {
    English: "Meeting Room",
    Italian: "Sala riunioni",
    日本語: "ミーティングルーム",
    "中文 (簡体)": "会议室",
  },
  url: 'url("../image/meetingRoom.jpg")',
  prompts: {
    English:
      "Conduct regular One on One meetings between subordinates and superiors in the meeting room.",
    Italian:
      "Conduci riunioni One on One regolari tra subordinati e superiori nella sala riunioni.",
    日本語:
      "ミーティングルームで部下と上司の間の定期的な One on One ミーティングを実施しましょう。",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});
