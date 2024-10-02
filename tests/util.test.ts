import { Util } from "../js/util.js";

describe("test_util", () => {
  var list000;
  var map000;

  beforeEach(async () => {
    list000 = [10, 20, 30, 40, 50];
    map000 = {
      a: "AAA",
      b: "BBB",
      c: "CCC",
      d: "DDD",
      e: "EEE",
    };
  });
  afterEach(() => { });


  test("Util.getIndexRandomly()", async () => {
    var actual = Util.getIndexRandomly({ list: list000 });
    expect(actual).toBeGreaterThanOrEqual(0);
    expect(actual).toBeLessThan(list000.length);
  });

  test("Util.getDoubleRandomly()", async () => {
    expect(Util.getDoubleRandomly()).toBeGreaterThanOrEqual(0.0);
    expect(Util.getDoubleRandomly()).toBeLessThan(1.0);
    expect(Util.getDoubleRandomly({ min: 0.2, max: 0.8 })).toBeGreaterThanOrEqual(0.2);
    expect(Util.getDoubleRandomly({ min: 0.2, max: 0.8 })).toBeLessThan(0.8);
  });

  test("Util.getElementRandomly()", async () => {
    expect(list000.includes(Util.getElementRandomly({ list: list000 }))).toBeTruthy();
  });

  test("Util.getMapKeyRandomly()", async () => {
    expect(Object.keys(map000).includes(Util.getMapKeyRandomly({ map: map000 }))).toBeTruthy();
  });

  test("Util.getMapValue()", async () => {
    expect(Util.getMapValue({ map: null, key: "a" })).toEqual("");
    expect(Util.getMapValue({ map: {}, key: "a" })).toEqual("");
    expect(Util.getMapValue({ map: map000, key: "a" })).toEqual("AAA");
    expect(Util.getMapValue({ map: map000, key: "e" })).toEqual("EEE");
    expect(Util.getMapValue({ map: map000, key: "z" })).toEqual("AAA");
  });

  test("Util.getHostName()", async () => {
    expect(Util.getHostName()).toEqual("localhost");
  });

});
