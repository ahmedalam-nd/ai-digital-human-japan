import { ChatGPTFunction } from "../../function/common_functions/chatgpt_function.js";
import { Parameter } from "../../function/parameter.js";
import { Prompt } from "../prompt.js";
import { apiKeys } from "../../apikeys.js";

class DocumentReviewByChatGPTFunction extends ChatGPTFunction {
  constructor({
    name,
    description,
    parameters,
    required,
    prompt,
    apiKey,
    failedMessage,
  }) {
    super({
      name: name,
      description: description,
      parameters: parameters,
      required: required,
      prompt: prompt,
      apiKey: apiKey,
      failedMessage: failedMessage,
    });
  }

  static REVIEW_PERSPECTIVE = [
    {
      観点名: "決裁規定への準拠",
      チェック対象: ["本紙"],
      チェック項目: {
        決裁規定への準拠: "対象となる決裁規定が記載されているか。",
        決裁権者の確認: "決裁権者が明確に記載されているか。",
        決裁権者の妥当性: "正しい決裁権者が記載されているか。",
      },
    },
    {
      観点名: "スケジュールの妥当性",
      チェック対象: ["スケジュール"],
      チェック項目: {
        スケジュール項目の網羅性:
          "スコープとなっているスケジュール項目が網羅されて記載されているか。",
        スケジュール項目の詳細化:
          "各スケジュール項目が詳細化されて記載されているか。",
        期間の妥当性:
          "各スケジュール項目について現実的に実現可能な期間が設定されているか。",
      },
    },
    {
      観点名: "費用対効果の妥当性",
      チェック対象: ["費用対効果", "コスト"],
      チェック項目: {
        メリットの明確性: "得られるメリットが明確に記載されているか。",
        効果額の明確性: "効果が金額として定量化され、明確に記載されているか。",
        費用の明確性: "費用が何にどれだけ必要か明確に記載されているか。",
        予算の確保: "必要な予算が確保されているか。",
        費用対効果のバランス: "費用に対して効果が妥当なバランスであるか。",
      },
    },
    {
      観点名: "アーキテクチャとスコープの明確性",
      チェック対象: ["アーキテクチャ", "実施内容"],
      チェック項目: {
        アーキテクチャの明確性: "アーキテクチャが明確に記載されているか。",
        スコープの明確性:
          "アーキテクチャにおいて今回のスコープが明確に記載されているか。",
      },
    },
    {
      観点名: "体制の妥当性",
      チェック対象: ["体制"],
      チェック項目: {
        責任者の明確性: "体制を統括する責任者が明確に記載されているか。",
        リーダーの配置:
          "各チームにチームを統括するリーダーが配置されているか。",
        役割の明確性: "各チームの役割が明確に記載されているか。",
        使用ベンダの明確性:
          "使用するベンダが明確に記載されているか、ベンダを使用しない場合はその旨が記載されているか。",
      },
    },
    {
      観点名: "実施内容の明確性",
      チェック対象: ["実施内容"],
      チェック項目: {
        実施事項の明確性: "実施事項が明確に記載されているか。",
        作業内容の明確性:
          "各実施事項について、作業内容がブレークダウンされて記載されているか。",
        作業内容の説明:
          "各作業内容について、説明がわかりやすく記載されているか。",
        用語の説明:
          "特殊な用語や略語については意味がわかりやすく説明されているか。",
        スコープの明確性:
          "今回のスコープに含まれる作業であるかどうかが明確か。",
        スケジュールとの整合性:
          "スケジュールで記載されている内容と整合が取れているか。",
      },
    },
  ];

  static REVIEW_DOCUMENTS = {
    ファイル情報: {
      ファイル名: "G-Mate導入のご提案.xlsx",
      文書種類: "稟議書",
    },
    本紙: {
      決裁規定: {
        キーワード: ["投資計画", "システム", "データセンタ", "利益計画内"],
        決裁金額: "120千円",
        決裁権者: "ビジネス改革推進部室長",
      },
      タイトル: "G-Mate導入のご提案",
      主旨: "2023年度の基盤利用に向け、オペレーション管理ツール(G-Mate)の新規導入をしたく，費用120千円のご承認を伺います。",
    },
    スケジュール: {
      スケジュール項目: ["PD移行", "開発/オペレーション支援"],
      スケジュール項目詳細: {
        PD移行: ["移行準備", "開発環境移行", "ライン環境移行", "旧環境削除"],
        "開発/オペレーション支援": [
          "G-Mate ML調査",
          "G-Mate ML開発導入",
          "G-Mate MLライン導入",
        ],
      },
      期間: {
        移行準備: "2023/4/1-2023/4/21",
        開発環境移行: "2023/4/22-2023/5/5",
        ライン環境移行: "2023/5/6-2023/5/12",
        旧環境削除: "2023/5/13-2023/5/31",
        "G-Mate ML調査": "2023/4/1-2023/5/5",
        "G-Mate ML開発導入": "2023/5/6-2023/5/19",
        "G-Mate MLライン導入": "2023/5/20-2023/5/31",
      },
    },
    費用対効果: {
      メリット: [
        "EL開発ユーザについて、将来の利用者メンテナンスの容易化",
        "運用プロセスの一元化によるコスト低減",
        "AWS大規模ダウンによる損害回避",
      ],
      効果金額: {
        "EL開発ユーザについて、将来の利用者メンテナンスの容易化": "60,000円/年",
        運用プロセスの一元化によるコスト低減: "500,000円/年",
        AWS大規模ダウンによる損害回避: "300,000円/年",
      },
      コスト: {
        費用項目: ["利用料", "保守料"],
        費用: {
          利用料: "70,000円",
          保守料: "50,000円",
        },
      },
      アーキテクチャ: {
        構成要素: [
          "ユーザ認証システム",
          "G-Mate(オペレーション管理ツール)",
          "InforesDB",
          "AWS",
          "ID実行環境",
          "情報利用基盤",
          "M-Builder",
          "ELツール",
          "データ連携基盤",
          "経営情報DB",
        ],
        スコープ: "情報利用基盤",
      },
      体制: {
        統括責任者: "特(シニアマネージャ)",
        PM: "大(室長)",
        サブチーム: ["情報利用基盤構築チーム", "ベンダ"],
        チーム: {
          情報利用基盤構築チーム: { PL: "中(Group Manager)", メンバ: "小" },
          ベンダ: { NFCD: { PL: "1名", SE: "1名" } },
        },
      },
      実施内容: {
        実施事項: ["ID PD移行", "開発/オペレーション支援"],
        作業内容: {
          "ID PD移行": ["PD移行作業", "PD移行後の支援"],
          "開発/オペレーション支援": [
            "ユーザ認証システムの利用",
            "G-Mateの導入",
          ],
        },
        説明: {
          PD移行作業: [
            "ID環境をAzure環境からAWS環境へと移行",
            "既存リソースの移行",
          ],
          PD移行後の支援: [
            "PD移行後の旧環境からのサポート",
            "IDおよびAWSの直接接続の検討",
          ],
          ユーザ認証システムの利用: ["ユーザ認証システムによるSSO接続"],
          "G-Mateの導入": ["オペレーション管理ツールの導入"],
        },
        用語: {},
      },
    },
  };

  static OUTPUT_FORMAT = {
    fileName: "レビュー対象ドキュメントのファイル名",
    reviewResults: [
      {
        perspective: "最初に見つかった問題に対する観点名。",
        summary: "問題の要約。",
        detailedDescription: "問題の詳細な説明。",
      },
      {
        perspective: "2番目に見つかった問題に対する観点名。",
        summary: "問題の要約。",
        detailedDescription: "問題の詳細な説明。",
      },
      {
        perspective:
          "3番目に見つかった問題に対する観点名。これ以降でも見つかった問題があれば続けて記載する。",
        summary: "問題の要約。",
        detailedDescription: "問題の詳細な説明。",
      },
    ],
  };
}

class GetReviewDocumentByFilename extends DocumentReviewByChatGPTFunction {
  constructor() {
    super({
      name: "getReviewDocumentByFilename",
      description:
        "Get the review result of the document that has the given filename, according to the perspective.",
      parameters: [
        new Parameter({
          name: "Filename",
          type: "string",
          description: "The document filename to be reviered",
          required: true,
        }),
      ],
      prompt: new Prompt({
        messages: [
          {
            role: "system",
            content: `You are the perspective-based reviewer of the document. Please review the given document on a necessary and sufficient basis according to the below perspectives and list the issues found that need to be corrected and clarified in the document.
            ${JSON.stringify(
              DocumentReviewByChatGPTFunction.REVIEW_PERSPECTIVE
            )}`,
          },
          {
            role: "user",
            content: `Please review the document expressed as the below JSON format.
            ${JSON.stringify(DocumentReviewByChatGPTFunction.REVIEW_DOCUMENTS)}

            Output the result in the below format.
            ${JSON.stringify(DocumentReviewByChatGPTFunction.OUTPUT_FORMAT)}`,
          },
        ],
        maxTokens: 1024,
      }),
      apiKey: apiKeys.openai,
      failedMessage: "Error: ChatGPT Request Failed",
    });
  }

  createModalContentsForIssue({ issue }) {
    // Create the content string.
    var contentStr = `<article class="message is-info"><div class="message-header">${issue.perspective}</div>`;
    contentStr += `<p class="is-size-6">${issue.summary}</p></div>`;
    contentStr += `<p class="is-size-6 has-text-grey">${issue.detailedDescription}</p></div></article>`;
    return contentStr;
  }

  async onAvatarTalk({ result, document }) {
    if (result == null || result.length == 0) {
      return;
    }
    var modal = document.querySelector(".modal");
    modal.classList.remove("is-active"); // Make sure the modal is hidden at first.
    this.addCloseEventsToModal({ document: document });

    result = JSON.parse(result);

    document.querySelector(
      ".modal-card-title"
    ).innerHTML = `レビュー対象: ${result.fileName}`;

    // Create the content string.
    var contentStr = "";
    for (var i = 0; i < result.reviewResults.length; i++) {
      contentStr += this.createModalContentsForIssue({
        issue: result.reviewResults[i],
      });
    }
    document.querySelector(".modal-card-body-content").innerHTML = contentStr;

    // Show the modal and the content.
    modal.classList.add("is-active"); // Show the modal.
  }
}
export const getReviewDocumentByFilename = new GetReviewDocumentByFilename();
