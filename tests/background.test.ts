import { backgroundImageMyRoom } from "../js/background/my_ai_friend/background_image_my_room.js";
import { backgroundIframeBiena } from "../js/background/vr_estate_tour/background_iframe_biena.js";

describe("test_background", () => {
  beforeEach(async () => { });
  afterEach(() => { });

  test("Background.getName()", async () => {
    expect(backgroundImageMyRoom.getName({ language: "English" })).toEqual("My Room");
    expect(backgroundImageMyRoom.getName({ language: "日本語" })).toEqual("自分の部屋");
    expect(backgroundIframeBiena.getName({ language: "English" })).toEqual("BIENA | Matterport");
    expect(backgroundIframeBiena.getName({ language: "日本語" })).toEqual("ビエナ | Matterport");
  });

  test("Background.getPrompt()", async () => {
    expect(
      backgroundImageMyRoom.getPrompt({ language: "English" })).toEqual(
        "Let's chat about your room and your family."
      );
    expect(
      backgroundImageMyRoom.getPrompt({ language: "日本語" })).toEqual(
        "あなたの部屋や家族について話しましょう。"
      );
    expect(
      backgroundIframeBiena.getPrompt({ language: "English" })).toEqual(
        "Let's take a tour together of Sekisui House's model house \"BIENA\" Hana Haku Memorial Park Housing Garden."
      );
    expect(
      backgroundIframeBiena.getPrompt({ language: "日本語" })).toEqual(
        "積水ハウスのモデルハウス「ビエナ」花博記念公園ハウジングガーデンを一緒に見学しましょう。"
      );
  });

  test("Background.changeTour()", async () => {
    expect(
      backgroundIframeBiena.getCurrentTour()).toBeUndefined();
    backgroundIframeBiena.tourIndex = 0;
    expect(
      backgroundIframeBiena.getCurrentTour().getName({ language: "English" })).toEqual("Entrance Cafe Space");
  });

  test("Background.checkTourTrigger()", async () => {
    expect(
      backgroundIframeBiena.checkTourTrigger({ text: "Entrance Cafe Space", language: "English" })).toEqual(-1);
    expect(
      backgroundIframeBiena.checkTourTrigger({ text: "move to here", language: "English" })).toEqual(-1);
    expect(
      backgroundIframeBiena.checkTourTrigger({ text: "move to Entrance Cafe Space", language: "English" })).toEqual(0);
  });
});
