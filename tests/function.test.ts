import { LookUpTimeFunction } from "../js/function/common_functions/lookup_time_function.js";
import { getSessionInfoByKeywordFunction } from "../js/character/ai_concierge/foresightday_2024_functions.js";

describe("test_function", () => {
  beforeEach(async () => { });
  afterEach(() => { });

  var lookUpTimeFunction = new LookUpTimeFunction({ defaultCityName: "Tokyo" });

  test("Function.getName()", async () => {
    var expected0 = {
      name: "lookupTime",
      description:
        "Get the current local time according to the given region and city.",
      parameters: {
        type: "object",
        properties: {
          "city name": {
            type: "string",
            description:
              "The city name for which the current time is to be retrieved.",
          }
        },
      },
      required: [],
    };
    expect(lookUpTimeFunction.toJson()).toEqual(expected0);

    var expected1 = {
      name: "getSessionInfoByTopicFunction",
      description:
        "Get the title, begin time, end time, abstract, and all presenters of the session(s) by the given keyword.",
      parameters: {
        type: "object",
        properties: {
          "keyword": {
            type: "string",
            description:
              "The keyword for which the session is to be retrieved.",
          }
        },
      },
      required: ["keyword"],
    };
    expect(getSessionInfoByKeywordFunction.toJson()).toEqual(expected1);
  });
});
