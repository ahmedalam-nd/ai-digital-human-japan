import { Function } from "../../function/function.js";
import { Parameter } from "../../function/parameter.js";
import { ArrayParameter } from "../../function/array_parameter.js";
import { Util } from "../../util.js";

export class ApprovalRuleFunction extends Function {
  constructor({ name, description, parameters = null }) {
    super({
      name: name,
      description: description,
      parameters: parameters,
    });
  }

  // Convert kanji number to arabic number flexibly.
  // e.g. 一億二千三百四十五万六千七百八十九 => 123456789
  // e.g. 100万 => 1000000
  // e.g. 1,500万 => 15000000
  // e.g. 2億 => 200000000
  // e.g. 2憶2010万 => 220100000
  convertKanjiToAraibicNumber(kanjiNumber) {
    var kanjiNumberMap = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      "０": 0,
      "１": 1,
      "２": 2,
      "３": 3,
      "４": 4,
      "５": 5,
      "６": 6,
      "７": 7,
      "８": 8,
      "９": 9,
      〇: 0,
      零: 0,
      一: 1,
      二: 2,
      三: 3,
      四: 4,
      五: 5,
      六: 6,
      七: 7,
      八: 8,
      九: 9,
      十: 10,
      百: 100,
      千: 1000,
      万: 10000,
      億: 100000000,
      兆: 1000000000000,
    };
    var kanjiNumberArray = kanjiNumber.split("");
    var arabicNumber = 0;
    var currentNumber = 0;
    for (var i = 0; i < kanjiNumberArray.length; i++) {
      var currentKanji = kanjiNumberArray[i];
      var currentArabic = kanjiNumberMap[currentKanji];
      if (currentArabic == null) {
        continue;
      }
      if (currentArabic >= 10) {
        arabicNumber += currentNumber * currentArabic;
        currentNumber = 0;
      } else if (currentNumber > 0) {
        currentNumber = currentNumber * 10 + currentArabic;
      } else {
        currentNumber = currentArabic;
      }
    }
    arabicNumber += currentNumber;
    return arabicNumber;
  }

  retrieveKubunNaiyoByKeywords(keywords) {
    var retValue = [];
    var matchedNumber = 0;
    ApprovalRuleFunction.APPROVAL_RULE.forEach((kubun) => {
      for (var i = 0; i < kubun["区分内容"].length; i++) {
        var kubunNaiyo = kubun["区分内容"][i];
        var baseCurrentMatchedNumber = Util.numberOfOverLapped({
          array1: keywords,
          array2: [kubunNaiyo["決裁分類"]],
        });

        // Count the number of matched 決裁事項
        var currentMatchedNumber =
          baseCurrentMatchedNumber +
          Util.numberOfOverLapped({
            array1: keywords,
            array2: kubunNaiyo["決裁事項"],
          });

        if (currentMatchedNumber > matchedNumber) {
          matchedNumber = currentMatchedNumber;
          retValue = kubunNaiyo;
        }
      }
    });
    return retValue;
  }

  createModalContentsForRule(rule) {
    // Create the content string.
    var contentStr = `<article class="message is-info"><div class="message-header">決裁金額: `;
    if (rule["決裁金額"].min != null) {
      contentStr += rule["決裁金額"].min + " ";
    }
    contentStr += "～";
    if (rule["決裁金額"].lessThan != null) {
      contentStr += " " + rule["決裁金額"].lessThan;
    }
    contentStr += `</div><div class="message-body">`;
    contentStr += "<ul>";
    contentStr += `<li class="is-size-6">・決裁種別: ${rule["決裁種別"]}</li>`;
    contentStr += `<li class="is-size-6">・決裁権者: ${rule["決裁権者"]}</li>`;
    contentStr += `<li class="is-size-6 has-text-grey">・会議: ${rule["会議"]}</li>`;
    contentStr += `<li class="is-size-6 has-text-grey">・重要度種別: ${rule["重要度種別"]}</li>`;
    contentStr += `<li class="is-size-6 has-text-grey">・担当: ${rule["担当"]}</li>`;
    if (rule["備考"] != null) {
      contentStr += `<li class="is-size-6 has-text-grey">※備考: ${rule["備考"]}</li>`;
    }
    contentStr += "</ul></div></article>";
    return contentStr;
  }

  async onAvatarTalk({ result, document }) {
    super.onAvatarTalk({ result: result, document: document });
    if (result == null || result.length == 0 || document == null) {
      return;
    }
    document.querySelector(
      ".modal-card-title"
    ).innerHTML = `<h1 class="title is-5">決裁分類: ${result["決裁分類"]} / 決裁事項: ${result["決裁事項"]}</h1>`;

    // Create the content string.
    var contentStr = "";
    for (var i in result["決裁規定"]) {
      contentStr += this.createModalContentsForRule(result["決裁規定"][i]);
    }

    document.querySelector(".modal-card-body-content").innerHTML = contentStr;

    // Show the modal and the content.
    document.querySelector(".modal").classList.add("is-active"); // Show the modal.
  }

  static APPROVAL_RULE = [
    {
      区分: "事業実施",
      区分内容: [
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        },
      ],
    },
  ];
}

class GetApprovalRuleForKeywordsFunction extends ApprovalRuleFunction {
  constructor() {
    super({
      name: "getApprovalRuleForKeywordsFunction",
      description:
        "Get the approval rules corresponding to the given Japanese keyword, regarding approval amount (決裁金額), approval type (決裁種別), approval authority (決裁権者), meeting (会議), importance type (重要度種別), the person in charge (担当), and notes (備考).",
      parameters: [
        new ArrayParameter({
          name: "Keywords",
          type: "string",
          description: "The keywords for which the rules are to be retrieved.",
          required: true,
        }),
      ],
    });
  }

  async call({ parameters }) {
    return super.retrieveKubunNaiyoByKeywords(parameters["Keywords"]);
  }
}
export const getApprovalRuleForKeywordsFunction =
  new GetApprovalRuleForKeywordsFunction();

class GetRulesForApprovalAmountFunction extends ApprovalRuleFunction {
  constructor() {
    super({
      name: "getRulesForApprovalAmountFunction",
      description:
        "Get the approval rules corresponding to the given amount and Japanese keywords, regarding approval amount (決裁金額), approval type (決裁種別), approval authority (決裁権者), meeting (会議), importance type (重要度種別), the person in charge (担当), and notes (備考).",
      parameters: [
        new Parameter({
          name: "Amount",
          type: "string",
          description: "The amount to be used for the rules retrieval.",
          required: true,
        }),
        new ArrayParameter({
          name: "Keywords",
          type: "string",
          description: "The keywords for which the rules are to be retrieved.",
          required: true,
        }),
      ],
    });
  }

  async call({ parameters }) {
    var kubunNaiyo = super.retrieveKubunNaiyoByKeywords(parameters["Keywords"]);
    var amount = this.convertKanjiToAraibicNumber(parameters["Amount"]);
    if (amount == 0) {
      return null;
    }

    var retrievedKessaiKiteiList = [];
    for (var j = 0; j < kubunNaiyo["決裁規定"].length; j++) {
      var kessaiKitei = kubunNaiyo["決裁規定"][j];
      var min =
        kessaiKitei["決裁金額"].min == null
          ? null
          : this.convertKanjiToAraibicNumber(kessaiKitei["決裁金額"].min);
      var lessThan =
        kessaiKitei["決裁金額"].lessThan == null
          ? null
          : this.convertKanjiToAraibicNumber(kessaiKitei["決裁金額"].lessThan);
      if (
        (min == null || amount >= min) &&
        (lessThan == null || amount < lessThan)
      ) {
        retrievedKessaiKiteiList.push(kessaiKitei);
      }
    }
    if (retrievedKessaiKiteiList.length == 0) {
      return null;
    }
    return {
      決裁分類: kubunNaiyo["決裁分類"],
      決裁事項: kubunNaiyo["決裁事項"],
      決裁規定: retrievedKessaiKiteiList,
    };
  }
}
export const getRulesForApprovalAmountFunction =
  new GetRulesForApprovalAmountFunction();
