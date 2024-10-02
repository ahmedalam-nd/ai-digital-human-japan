import {
  ApprovalRuleFunction,
  getApprovalRuleForKeywordsFunction,
  getRulesForApprovalAmountFunction,
} from "../js/character/ai_yoshida/approval_rule_functions.js";

describe("test_approval_rule_function", () => {
  beforeEach(() => { });
  afterEach(() => { });

  test("getApprovalRuleForKeywordsFunction.call()", async () => {
    var expected0 = {
      決裁分類: "投資計画",
      決裁事項: ["システム", "データセンタ"],
      決裁規定: [
        {
          決裁金額: { min: null, lessThan: "1,500万円" },
          決裁種別: "担当決裁",
          決裁権者: "シニアマネージャ",
          会議: "なし",
          重要度種別: "重要度C",
          担当: ["各担当", "ビジネス推進部"],
          備考: "重要度Cは100万円以上の場合のみ",
        },
        {
          決裁金額: { min: "1,500万円", lessThan: "2億円" },
          決裁種別: "担当決裁",
          決裁権者: "CIO",
          会議: "なし",
          重要度種別: "重要度A",
          担当: ["ビジネス推進部"],
          備考: null,
        },
        {
          決裁金額: { min: "2億円", lessThan: "5億円" },
          決裁種別: "担当決裁",
          決裁権者: "CIO",
          会議: "推進会議",
          重要度種別: "重要度A",
          担当: ["各担当", "ビジネス推進部"],
          備考: "4～5億円の案件を決裁した場合は経営会議での書面報告とする。",
        },
        {
          決裁金額: { min: "5億円", lessThan: "20億円" },
          決裁種別: "会議決裁",
          決裁権者: "経営会議",
          会議: "推進会議",
          重要度種別: "重要度A",
          担当: ["各担当", "ビジネス推進部"],
          備考: "4～5億円の案件を決裁した場合は経営会議での書面報告とする。",
        },
        {
          決裁金額: { min: "20億円", lessThan: null },
          決裁種別: "会議決裁",
          決裁権者: "取締役会",
          会議: "推進会議",
          重要度種別: "重要度A",
          担当: ["各担当", "ビジネス推進部"],
          備考: null,
        },
      ],
    };
    expect(await getApprovalRuleForKeywordsFunction.call({
      parameters: {
        Keywords: ["システム", "データセンタ"],
      }
    })).toEqual(expected0);

    expect(await getApprovalRuleForKeywordsFunction.call({
      parameters: {
        Keywords: ["データセンタ"],
      }
    })).toEqual(expected0);

    expect(await getApprovalRuleForKeywordsFunction.call({
      parameters: {
        Keywords: ["システム"],
      }
    })).toEqual(expected0);

    expect(await getApprovalRuleForKeywordsFunction.call({
      parameters: {
        Keywords: ["システム", "データセンタ"],
      }
    })).toEqual(expected0);

    var expected1 = {
      決裁分類: "経費",
      決裁事項: ["定期"],
      決裁規定: [
        {
          決裁金額: { min: null, lessThan: "2000万円" },
          決裁種別: "担当決裁",
          決裁権者: "シニアマネージャ",
          会議: "なし",
          重要度種別: "なし",
          担当: ["各担当"],
          備考: "毎月・毎年など一定サイクル、もしくは定額・定率など。初回は不定期とする",
        },
        {
          決裁金額: { min: "2000万円", lessThan: null },
          決裁種別: "担当決裁",
          決裁権者: "CXO",
          会議: "なし",
          重要度種別: "なし",
          担当: ["各担当"],
          備考: "毎月・毎年など一定サイクル、もしくは定額・定率など。初回は不定期とする",
        },
      ],
    };

    expect(await getApprovalRuleForKeywordsFunction.call({
      parameters: {
        Keywords: ["経費", "定期"],
      }
    })).toEqual(expected1);

    var expected2 = {
      決裁分類: "経費",
      決裁事項: ["不定期", "調査", "コンサルティング", "一般業務委託"],
      決裁規定: [
        {
          決裁金額: { min: null, lessThan: "150万円" },
          決裁種別: "担当決裁",
          決裁権者: "シニアマネージャ",
          会議: "なし",
          重要度種別: "重要度C",
          担当: ["各担当"],
          備考: "重要度Cは40万円以上の場合のみ",
        },
        {
          決裁金額: { min: "150万円", lessThan: "600万円" },
          決裁種別: "担当決裁",
          決裁権者: "統括部長",
          会議: "なし",
          重要度種別: "重要度B",
          担当: ["各担当"],
          備考: null,
        },
        {
          決裁金額: { min: "600万円", lessThan: "1,500万円" },
          決裁種別: "担当決裁",
          決裁権者: "CXO",
          会議: "なし",
          重要度種別: "重要度A",
          担当: ["各担当"],
          備考: null,
        },
        {
          決裁金額: { min: "1,500万円", lessThan: null },
          決裁種別: "会議決裁",
          決裁権者: "経営会議",
          会議: "なし",
          重要度種別: "重要度A",
          担当: ["各担当"],
          備考: null,
        },
      ],
    };

    expect(await getApprovalRuleForKeywordsFunction.call({
      parameters: {
        Keywords: ["経費", "不定期", "コンサルティング"],
      }
    })).toEqual(expected2);

    expect(await getApprovalRuleForKeywordsFunction.call({
      parameters: {
        Keywords: ["経費", "一般業務委託"],
      }
    })).toEqual(expected2);

    expect(await getApprovalRuleForKeywordsFunction.call({
      parameters: {
        Keywords: ["経費", "調査"],
      }
    })).toEqual(expected2);

    var expected3 = {
      決裁分類: "経費",
      決裁事項: ["不定期", "開発業務委託"],
      決裁規定: [
        {
          決裁金額: { min: null, lessThan: "150万円" },
          決裁種別: "担当決裁",
          決裁権者: "シニアマネージャ",
          会議: "なし",
          重要度種別: "重要度C",
          担当: ["各担当"],
          備考: "重要度Cは40万円以上の場合のみ",
        },
        {
          決裁金額: { min: "150万円", lessThan: "1,500万円" },
          決裁種別: "担当決裁",
          決裁権者: "統括部長",
          会議: "なし",
          重要度種別: "重要度B",
          担当: ["各担当"],
          備考: null,
        },
        {
          決裁金額: { min: "1,500万円", lessThan: "7,000万円" },
          決裁種別: "担当決裁",
          決裁権者: "CXO",
          会議: "なし",
          重要度種別: "重要度A",
          担当: ["各担当"],
          備考: "1,500万～7,000万円の案件を決裁した場合は経営会議での書面報告とする。",
        },
        {
          決裁金額: { min: "7,000万円", lessThan: null },
          決裁種別: "会議決裁",
          決裁権者: "経営会議",
          会議: "なし",
          重要度種別: "重要度A",
          担当: ["各担当"],
          備考: "1,500万～7,000万円の案件を決裁した場合は経営会議での書面報告とする。",
        },
      ],
    };

    expect(await getApprovalRuleForKeywordsFunction.call({
      parameters: {
        Keywords: ["経費", "開発業務委託"],
      }
    })).toEqual(expected3);
  });

  test("ApprovalRuleFunction.convertKanjiToAraibicNumber()", async () => {
    var approvalRuleFunction = new ApprovalRuleFunction({
      name: "ApprovalRuleFunction",
      description: "Test Function for Approval Rule",
    });
    expect(
      approvalRuleFunction.convertKanjiToAraibicNumber("100万円")).toEqual(
        1000000
      );
    expect(
      approvalRuleFunction.convertKanjiToAraibicNumber("500万円")).toEqual(
        5000000
      );
    expect(
      approvalRuleFunction.convertKanjiToAraibicNumber(
        "一億二三四五万六千七百八十九"
      )).toEqual(
        123456789
      );
    expect(
      approvalRuleFunction.convertKanjiToAraibicNumber("1,500万")).toEqual(
        15000000
      );
    expect(
      approvalRuleFunction.convertKanjiToAraibicNumber("2億")).toEqual(
        200000000
      );
    expect(
      approvalRuleFunction.convertKanjiToAraibicNumber("3億円")).toEqual(
        300000000
      );
    expect(
      approvalRuleFunction.convertKanjiToAraibicNumber("2憶2010万円")).toEqual(
        220100000
      );
  });

  test("getRulesForApprovalAmountFunction.call()", async () => {
    var expected0 = {
      決裁分類: "投資計画",
      決裁事項: ["システム", "データセンタ"],
      決裁規定: [
        {
          決裁金額: { min: null, lessThan: "1,500万円" },
          決裁種別: "担当決裁",
          決裁権者: "シニアマネージャ",
          会議: "なし",
          重要度種別: "重要度C",
          担当: ["各担当", "ビジネス推進部"],
          備考: "重要度Cは100万円以上の場合のみ",
        },
      ],
    };
    expect(await getRulesForApprovalAmountFunction.call({
      parameters: {
        Amount: "500万円",
        Keywords: ["システム"],
      }
    })).toEqual(expected0);

    var expected1 = {
      決裁分類: "投資計画",
      決裁事項: ["システム", "データセンタ"],
      決裁規定: [
        {
          決裁金額: { min: "2億円", lessThan: "5億円" },
          決裁種別: "担当決裁",
          決裁権者: "CIO",
          会議: "推進会議",
          重要度種別: "重要度A",
          担当: ["各担当", "ビジネス推進部"],
          備考: "4～5億円の案件を決裁した場合は経営会議での書面報告とする。",
        },
      ],
    };
    expect(await getRulesForApprovalAmountFunction.call({
      parameters: {
        Amount: "3億円",
        Keywords: ["システム", "データセンタ"],
      }
    })).toEqual(expected1);

    var expected2 = {
      決裁分類: "経費",
      決裁事項: ["定期"],
      決裁規定: [
        {
          決裁金額: { min: null, lessThan: "2000万円" },
          決裁種別: "担当決裁",
          決裁権者: "シニアマネージャ",
          会議: "なし",
          重要度種別: "なし",
          担当: ["各担当"],
          備考: "毎月・毎年など一定サイクル、もしくは定額・定率など。初回は不定期とする",
        },
      ],
    };
    expect(await getRulesForApprovalAmountFunction.call({
      parameters: {
        Amount: "1,000万円",
        Keywords: ["経費", "定期"],
      }
    })).toEqual(expected2);
  });
});
