import { NoiseRemover } from "../js/noise_remover";

describe("test_noise_remover", () => {
  beforeEach(async () => { });
  afterEach(() => { });

  test("NoiseRemover.isEndedPeriod()", async () => {
    expect(
      NoiseRemover.isEndedPeriod({ language: "English", text: "Hi" })).toBeFalsy();
    expect(
      NoiseRemover.isEndedPeriod({ language: "English", text: "Hi." })).toBeTruthy();
    expect(
      NoiseRemover.isEndedPeriod({ language: "日本語", text: "こんにちは" })).toBeFalsy();
    expect(
      NoiseRemover.isEndedPeriod({ language: "日本語", text: "こんにちは." })).toBeFalsy();
    expect(
      NoiseRemover.isEndedPeriod({ language: "日本語", text: "こんにちは。" })).toBeTruthy();
  });
});
