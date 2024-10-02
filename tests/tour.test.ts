import { backgroundIframeBiena } from "../js/background/vr_estate_tour/background_iframe_biena.js";

describe("test_tour", () => {
  beforeEach(async () => { });
  afterEach(() => { });

  test("Tour.getName()", async () => {
    expect(
      backgroundIframeBiena.tourList[0].getName({ language: "English" })).toEqual(
        "Entrance Cafe Space"
      );
    expect(
      backgroundIframeBiena.tourList[0].getName({ language: "日本語" })).toEqual(
        "エントランス・カフェスペース"
      );
  });

  test("Background.getQuote()", async () => {
    expect(
      backgroundIframeBiena.tourList[0].getQuote({ language: "English" })).toEqual(
        "As you enter the entrance, bright light pours in from the three-story see-through staircase. The first floor is expected to be a store. It can be used as a cafe space or a space to welcome customers."
      );
    expect(
      backgroundIframeBiena.tourList[0].getQuote({ language: "Strange Language" })).toEqual(
        "As you enter the entrance, bright light pours in from the three-story see-through staircase. The first floor is expected to be a store. It can be used as a cafe space or a space to welcome customers."
      );
    expect(
      backgroundIframeBiena.tourList[0].getQuote({ language: "日本語" })).toEqual(
        "玄関に入ると、3層吹き抜けの透明な階段から明るい光が注ぎ込みます。1階は店舗になる予定です。カフェスペースやお客様をお迎えするスペースとしても活用できます。"
      );
  });
});
