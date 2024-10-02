import { ArrayParameter } from "../js/function/array_parameter.js";

describe("test_array_parameter", () => {
  beforeEach(async () => { });
  afterEach(() => { });

  test("ArrayParameter.toJson()", async () => {
    var parameter = new ArrayParameter({
      name: "tags",
      type: "string",
      description: "Test description",
      enumElements: ["赤", "緑", "青"],
    });
    var expected0 = {
      type: "array",
      description: "Test description",
      items: {
        type: "string",
        enum: ["赤", "緑", "青"],
      },
    };
    expect(parameter.toJson()).toEqual(expected0);
    expect(parameter.required).toBe(false);

    parameter = new ArrayParameter({
      name: "tags", type: "string", description: "Test description", required: true,
    });
    var expected1 = {
      type: "array",
      description: "Test description",
      items: {
        type: "string",
      },
    };
    expect(parameter.toJson()).toEqual(expected1);
    expect(parameter.required).toBe(true);
  });
});
