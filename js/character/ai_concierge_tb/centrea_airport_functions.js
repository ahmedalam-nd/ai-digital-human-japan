import { Function } from "../../function/function.js";
import { Parameter } from "../../function/parameter.js";

// demo needs local server: flask --app src/flask_project/hello run
const port = 5000;
const apiUrl = `http://localhost:${port}/v1/match`;
class ShopInfoFunction extends Function {
  constructor({ name, description, parameters }) {
    super({
      name: name,
      description: description,
      parameters: parameters,
    });
  }

  // デモ用　フライト情報
  // 要らないかも
  static flightInfo = [
    {
      flightNo: "JL841",
      time: "1051",
    },
    {
      flightNo: "CA406",
      time: "1300",
    },
    {
      flightNo: "HO1392",
      time: "1300",
    },
    {
      flightNo: "MU530",
      time: "1335",
    },
    {
      flightNo: "CA760",
      time: "1415",
    },
  ];

  static shopUrlList = [
    {
      id: 1,
      url: "https://www.centrair.jp/shop-dine/restaurant/maruya.html",
    },
    {
      id: 3,
      url: "https://www.centrair.jp/shop-dine/restaurant/freshnessburger.html",
    },
    {
      id: 4,
      url: "https://www.centrair.jp/shop-dine/restaurant/starbucks.html",
    },
    {
      id: 5,
      url: "https://www.centrair.jp/shop-dine/shop/meihinkan-wagashi.html",
    },
    {
      id: 6,
      url: "https://www.centrair.jp/shop-dine/restaurant/cosmos.html",
    },
    {
      id: 7,
      url: "https://www.centrair.jp/shop-dine/shop/ebisenbei.html",
    },
    {
      id: 9,
      url: "https://www.centrair.jp/shop-dine/restaurant/ms-dining.html",
    },
    {
      id: 10,
      url: "https://www.centrair.jp/shop-dine/restaurant/tonkatsu-wako.html",
    },
    {
      id: 12,
      url: "https://www.centrair.jp/shop-dine/restaurant/torisanwa.html",
    },
    {
      id: 13,
      url: "https://www.centrair.jp/shop-dine/restaurant/osyokuzidokoro-ebisu.html",
    },
    {
      id: 15,
      url: "https://www.centrair.jp/shop-dine/restaurant/shimonoishiki.html",
    },
    {
      id: 16,
      url: "https://www.centrair.jp/shop-dine/restaurant/bluesky-cafe.html",
    },
    {
      id: 17,
      url: "https://www.centrair.jp/shop-dine/restaurant/komeda-coffee.html",
    },
    {
      id: 18,
      url: "https://www.centrair.jp/shop-dine/restaurant/longhu-airkitchen.html",
    },
    {
      id: 19,
      url: "https://www.centrair.jp/shop-dine/restaurant/umizen-sorazen.html",
    },
  ];

  static facilityInfo = {
    name: "中部国際空港",
    address: "愛知県常滑市セントレア1-1",
    start: "2005年2月17日",
    description:
      "中部地方の国際拠点空港として位置づけられている。セントレアの愛称を持つ。24時間運用可能である。",
  };

  static shopInfo = [
    {
      name: "まるや本店 中部国際空港店",
      begin: "10:00",
      end: "21:30",
      description:
        "中部国際空港セントレア4F まるや本店ひつまぶしをお楽しみください",
      genre: "うなぎ",
      englishSupport: "False",
      forChildren: "High",
      forLadies: "High",
      type: ["Eat in", "Take out"],
    },
    {
      name: "フレッシュネスバーガー 中部国際空港店",
      begin: "6:30",
      end: "21:00",
      description: "新鮮な食材のバーガー",
      genre: "ハンバーガー",
      englishSupport: "True",
      forChildren: "High",
      forLadies: "High",
      type: ["Eat in", "Take out"],
    },
    {
      name: "スターバックス・コーヒー 中部国際空港セントレア店",
      begin: "7:00",
      end: "22:00",
      description: "人気なコーヒー店",
      genre: "カフェ",
      englishSupport: "True",
      forChildren: "High",
      forLadies: "High",
      type: ["Eat in", "Take out"],
    },
    {
      name: "坂角総本舖 セントレア銘品館",
      begin: "6:30",
      end: "21:00",
      description: "愛知県のお土産が買える店",
      genre: "せんべい",
      englishSupport: "True",
      forChildren: "Mid",
      forLadies: "Mid",
      type: [],
    },
    {
      name: "コスモス",
      begin: "6:00",
      end: "14:00",
      description: "食べ放題の美味しいハワイ料理",
      genre: "洋食",
      englishSupport: "False",
      forChildren: "High",
      forLadies: "High",
      type: ["Eat in"],
    },
    {
      name: "えびせんべいの里 セントレア店",
      begin: "8:00",
      end: "21:00",
      description: "えびせんべいのお土産店",
      genre: "せんべい",
      englishSupport: "True",
      forChildren: "Mid",
      forLadies: "High",
      type: [],
    },
    {
      name: "エムズ・ダイニング",
      begin: "7:00",
      end: "21:00",
      description:
        "和食もカフェのメニューもあるし、食べながらきれいな景色がみえます",
      genre: "日本料理",
      englishSupport: "False",
      forChildren: "High",
      forLadies: "Mid",
      type: ["Eat in"],
    },
    {
      name: "和幸 中部国際空港店",
      begin: "10:00",
      end: "21:00",
      description: "上手くとんかつの定食店",
      genre: "とんかつ",
      englishSupport: "True",
      forChildren: "Mid",
      forLadies: "Low",
      type: ["Eat in"],
    },
    {
      name: "鶏三和 セントレア店",
      begin: "8:00",
      end: "21:00",
      description: "唐揚げの得意な店",
      genre: "鳥料理",
      englishSupport: "False",
      forChildren: "Mid",
      forLadies: "Low",
      type: ["Eat in"],
    },
    {
      name: "お食事処 えびす",
      begin: "9:00",
      end: "22:00",
      description: "おしゃれなセントレア内で、庶民的でくつろげるほっこり空間",
      genre: "食堂",
      englishSupport: "False",
      forChildren: "Mid",
      forLadies: "Mid",
      type: ["Eat in"],
    },
    {
      name: "天ぷら 下の一色 セントレア店",
      begin: "10:00",
      end: "21:00",
      description: "空港価格でも比較的お手頃",
      genre: "天ぷら",
      englishSupport: "True",
      forChildren: "High",
      forLadies: "Mid",
      type: ["Eat in"],
    },
    {
      name: "JAL PLAZA 中部空港 中央ゲートショップ",
      begin: "6:30",
      end: "20:30",
      description: "フライト直前でも立ち寄れます",
      genre: "売店",
      englishSupport: "True",
      forChildren: "High",
      forLadies: "High",
      type: [],
    },
    {
      name: "コメダ珈琲店 セントレア店",
      begin: "7:00",
      end: "21:00",
      description: "空港の雰囲気を味わえるコメダ",
      genre: "喫茶店",
      englishSupport: "True",
      forChildren: "Mid",
      forLadies: "High",
      type: ["Eat in", "Take out"],
    },
    {
      name: "ロンフーエアキッチン セントレア店",
      begin: "7:00",
      end: "21:00",
      description: "内外の旅行者で賑わうフードコート",
      genre: "ラーメン",
      englishSupport: "True",
      forChildren: "Mid",
      forLadies: "Low",
      type: ["Eat in"],
    },
    {
      name: "海膳空膳",
      begin: "7:15",
      end: "22:45",
      description: "制限区域内フードコート",
      genre: "丼",
      englishSupport: "False",
      forChildren: "Mid",
      forLadies: "Mid",
      type: ["Eat in"],
    },
  ];

  // modalに表示させるコンテンツ（これは説明文）を作る
  createModalContentsForRec(shop) {
    // Create the content string.
    var contentStr = `<h3>${shop.name} (${shop.begin} ～ ${shop.end})</h3> ${shop.genre}\n`;
    /* for (var presenter of session.presenters) {
            presenters += `<p class="is-size-7">${presenter.name} ${presenter.affliation} (${presenter.title})</p>`;
        }
        if (presenters !== "") {
            contentStr += presenters;
        } */
    contentStr += `<p class="is-size-7 has-text-grey-light">${shop.description}</p></div></article>`;
    return contentStr;
  }

  // Avatarが喋る前にcallbackされるMethod。HTML要素を表示する処理などを書く。
  onAvatarTalkForShopInfo({ result, document }) {
    // make modal
    if (result == null || result.length == 0 || document == null) {
      return;
    }
    var modal = document.querySelector(".modal");
    modal.classList.remove("is-active"); // Make sure the modal is hidden at first.
    this.addCloseEventsToModal({ document: document });

    var modal_card = document.querySelector(".modal-card");
    modal_card.classList.add("is-80vw");

    // make modal_content
    document.querySelector(".modal-card-title").innerHTML = "";
    // Create the content string.
    var contentStr = "";
    for (var key in result) {
      contentStr += this.createModalContentsForRec(result[key]);
    }
    document.querySelector(".modal-card-body-content").innerHTML = contentStr;
    // Show the modal and the content.
    modal.classList.add("is-active"); // Show the modal.
  }

  // Avatarが喋る前にcallbackされるMethod。HTML要素を表示する処理などを書く。
  onAvatarTalkForRecommendations({ result, document }) {
    // make modal
    if (result == null || result.length == 0 || document == null) {
      return;
    }
    var modal = document.querySelector(".modal");
    modal.classList.remove("is-active"); // Make sure the modal is hidden at first.
    this.addCloseEventsToModal({ document: document });

    var modal_card = document.querySelector(".modal-card");
    modal_card.classList.add("is-80vw");

    // make modal_content
    document.querySelector(
      ".modal-card-title"
    ).innerHTML = `<h1 class="title is-4">おすすめ情報</h1>`;
    // Create the recommend table and
    var modal_content = document.querySelector(".modal-card-body-content");
    modal_content.innerHTML = "";
    this.generateRecommendTable(result, modal_content);

    // Show the modal and the content.
    modal.classList.add("is-active"); // Show the modal.
  }

  // デモ用　シナリオに合わせてバックエンド送信用のダミーデータ作成
  makeSendDataToBackEnd(flightNo) {
    // persona no_1
    if (flightNo === "JL841") {
      var sendData = {
        nationality: "Japan",
        sex: 1,
        age: "40",
        group: 1,
        children: 0,
        flight: flightNo,
        currenttime: 840,
      };
      // persona no_2
    } else if (flightNo === "CA760") {
      var sendData = {
        nationality: "China",
        sex: 1,
        age: "50",
        group: 1,
        children: 0,
        flight: flightNo,
        currenttime: 1115,
      };
      // persona no_3
    } else if (flightNo === "MU530") {
      var sendData = {
        nationality: "Korea",
        sex: 2,
        age: "30",
        group: 3,
        children: 1,
        flight: flightNo,
        currenttime: 1100,
      };
    } else {
      // [todo]エラーの返し方を考える or 一旦量子には渡しちゃってエラーを受け取る機構を作る
      console.error("Error: This flight number doesn't exist.");
    }
    return sendData;
  }

  async sendAndpollingAndGetDataFromBE(flightNo) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.makeSendDataToBackEnd(flightNo)),
      });
      if (!response.ok) {
        throw new Error("POSTリクエスト失敗");
      }
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error("Fetchエラー", error);
    }
  }
  // 量子チームのAIから返却されたJSONをもとにテーブルを生成してドキュメントに挿入する関数
  generateRecommendTable(data, container) {
    const table = document.createElement("table");
    table.id = "shopInfoTable";
    //table.setAttribute('border', '1');

    // ヘッダーを追加
    const thead = table.createTHead();
    const row = thead.insertRow();
    const headers = {
      //"id": "ID",
      name: "名前",
      //"kana": "かな",
      genre: "ジャンル",
      menu: "英語MENU",
      children: "お子様人気",
      female: "女性人気",
      summary: "概要",
      crowded: "混雑度",
      takeout: "テイクアウト",
      map: "マップ",
      url: "QR",
    };

    Object.keys(headers).forEach((key) => {
      const header = document.createElement("th");
      header.textContent = headers[key];
      row.appendChild(header);
    });

    const mergedJson = ShopInfoFunction.mergeUrl(
      data.recommend,
      ShopInfoFunction.shopUrlList
    );

    // データの各行を追加
    const tbody = table.createTBody();
    mergedJson.forEach((item) => {
      item.map = "";
      const row = tbody.insertRow();
      Object.keys(headers).forEach((key) => {
        if (key !== "map" && key !== "url") {
          const cell = row.insertCell();
          if (key === "menu") {
            if (item[key] === 2) {
              cell.textContent = "○";
            } else {
              cell.textContent = "×";
            }
          } else if (key === "takeout") {
            if (item[key] === 1) {
              cell.textContent = "○";
            } else {
              cell.textContent = "×";
            }
          } else if (key === "children" || key === "female") {
            if (item[key] === 1) {
              cell.textContent = "★★★";
            } else if (item[key] === 2) {
              cell.textContent = "★★☆";
            } else {
              cell.textContent = "★☆☆";
            }
          } else {
            cell.textContent = item[key];
          }
        } else if (key === "map") {
          // マップの列にはボタンを追加
          const mapCell = row.insertCell();
          const mapButton = document.createElement("button");
          mapButton.textContent = "Map";
          mapButton.addEventListener(
            "click",
            (id) => this.showMapImage(item.id) // お店ごとのマップ画像を表示する関数
          );
          mapCell.appendChild(mapButton);
        } else if (key === "url") {
          const url = item[key];
          const qrCell = row.insertCell();
          const qrButton = document.createElement("button");
          qrButton.textContent = "QR";
          qrButton.addEventListener(
            "click",
            () => this.showQRCode(url) // お店ごとのQR画像を表示する関数
          );
          qrCell.appendChild(qrButton);
        }
      });
    });
    container.appendChild(table);
    return table;
  }

  showMapImage(id) {
    // お店のIDに基づいたマップ画像を表示するための関数
    const mapImageUrl = `../../image/map/map_${id}.png`; // 画像のURLを指定
    const imageContainer = document.createElement("div");
    imageContainer.id = "mapImageContainer";
    imageContainer.style.position = "fixed";
    imageContainer.style.top = "0";
    imageContainer.style.left = "0";
    imageContainer.style.width = "100%";
    imageContainer.style.height = "100%";
    imageContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    imageContainer.style.display = "flex";
    imageContainer.style.justifyContent = "center";
    imageContainer.style.alignItems = "center";
    imageContainer.style.zIndex = "1000";

    const mapImage = new Image();
    mapImage.src = mapImageUrl;
    mapImage.style.maxWidth = "80%";
    mapImage.style.maxHeight = "80%";
    mapImage.style.position = "relative";

    const closeButton = document.createElement("button");
    closeButton.id = "mapCloseButton";
    closeButton.classList.add("delete", "is-large");
    closeButton.setAttribute("aria-label", "close");
    closeButton.addEventListener("click", function () {
      document.body.removeChild(imageContainer);
    });
    // <button class="delete is-large" aria-label="close"></button>;

    imageContainer.appendChild(mapImage);
    imageContainer.appendChild(closeButton);
    document.body.appendChild(imageContainer);
  }

  static mergeUrl(recommends, urlList) {
    const mergedArray = recommends.map((item) => {
      const item2 = urlList.find((item2) => item2.id === item.id);
      return {
        ...item,
        ...item2,
      };
    });
    return mergedArray;
  }

  showQRCode(url) {
    const qrContainer = document.createElement("div");
    qrContainer.id = "qrImageContainer";
    qrContainer.style.position = "fixed";
    qrContainer.style.top = "0";
    qrContainer.style.left = "0";
    qrContainer.style.width = "100%";
    qrContainer.style.height = "100%";
    qrContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    qrContainer.style.display = "flex";
    qrContainer.style.justifyContent = "center";
    qrContainer.style.alignItems = "center";
    qrContainer.style.zIndex = "1000";

    const qrElement = document.createElement("div");
    new QRCode(qrElement, { text: url });

    const closeButton = document.createElement("button");
    closeButton.id = "qrCloseButton";
    closeButton.classList.add("delete", "is-large");
    closeButton.setAttribute("aria-label", "close");
    closeButton.addEventListener("click", function () {
      document.body.removeChild(qrContainer);
    });

    qrContainer.appendChild(qrElement);
    qrContainer.appendChild(closeButton);
    document.body.appendChild(qrContainer);
  }
}
// [todo][本体]システムを連携してレコメンドを表示する
/* 【手順】
※発動条件：ChatGPTへの入力でフライト番号を受け取ったら
1.受け取ったフライト番号をもとにJSONデータを作成
2.JSONデータをバックエンドにPOST
3.量子チームから返却されたJSONを取得（POSTのRESPONSEに格納されている）
4.回答を表示 */

class GetRecommendedShopsFunction extends ShopInfoFunction {
  constructor() {
    super({
      name: "getRecommendedShopsFunction",
      description:
        "Once the flight number input is confirmed, JSON data containing that information is linked externally to receive recommendation information and generate output. The output includes the name of the restaurant, the genre of the restaurant, as well as recommendations by attribute.The flight number is in the format of two alphabetic digits followed by an arbitrary number of digits.",
      parameters: [
        new Parameter({
          name: "flightNo",
          type: "string",
          description:
            "The flight number which customer uses is to be retrieved.",
          required: true,
        }),
      ],
    });
  }
  // Function callingが起動したあとの処理を書く
  async call({ parameters }) {
    // 1.受け取ったフライト番号をもとにJSONデータを作成
    // 2.JSONデータをバックエンドにPOST
    // 3.量子チームから返却されたJSONを取得（POSTのRESPONSEに格納されている）
    var tableInput = await super.sendAndpollingAndGetDataFromBE(
      parameters.flightNo
    );
    // レコメンド情報をReturn
    return tableInput;
  }

  // しゃべる直前にcallbackされるMethod
  // resultにcallからreturnされた連想配列が渡される
  async onAvatarTalk({ result, document }) {
    console.log(result);
    super.onAvatarTalkForRecommendations({
      result: result,
      document: document,
    });
  }
}
export const getRecommendedShopsFunction = new GetRecommendedShopsFunction();

// callback不使用
class GetAirportInfoFunction extends ShopInfoFunction {
  constructor() {
    super({
      name: "getAirportInfo",
      description:
        "Get the airport informations of Chubu International Airport Centrea, including the name, and address.",
    });
  }
  async call({ parameters }) {
    return ShopInfoFunction.facilityInfo;
  }
}
export const getAirportInfoFunction = new GetAirportInfoFunction();

// callback使用
class GetShopInfoByGenreFunction extends ShopInfoFunction {
  constructor() {
    super({
      name: "getShopInfoByGenre",
      description:
        "Get the name, begin time, end time, description, and english support by the given genre.",
      parameters: [
        new Parameter({
          name: "genre",
          type: "string",
          description: "The genre of the shop is to be retrieved.",
          required: true,
        }),
      ],
    });
  }
  async call({ parameters }) {
    var retValue = {};
    for (var key in ShopInfoFunction.shopInfo) {
      var shop = ShopInfoFunction.shopInfo[key];
      if (shop.genre.includes(parameters.genre)) {
        retValue[key] = {
          name: shop.name,
          begin: shop.begin,
          end: shop.end,
          description: shop.description,
          genre: shop.genre,
        };
      }
    }
    return retValue;
  }
  async onAvatarTalk({ result, document }) {
    super.onAvatarTalkForShopInfo({ result: result, document: document });
  }
}
export const getShopInfoByGenreFunction = new GetShopInfoByGenreFunction();

class GetShopInfoForChildrenFunction extends ShopInfoFunction {
  constructor() {
    super({
      name: "getShopInfoForChildrenFunction",
      description:
        "Get the name, begin time, end time, description, and english support which is child-friendly.",
    });
  }
  async call({ parameters }) {
    var retValue = {};
    for (var key in ShopInfoFunction.shopInfo) {
      var shop = ShopInfoFunction.shopInfo[key];
      if (shop.forChildren.includes("High")) {
        retValue[key] = {
          name: shop.name,
          begin: shop.begin,
          end: shop.end,
          genre: shop.genre,
          englishSupport: shop.englishSupport,
          description: shop.description,
        };
      }
    }
    return retValue;
  }
  async onAvatarTalk({ result, document }) {
    super.onAvatarTalkForShopInfo({ result: result, document: document });
  }
}

export const getShopInfoForChildrenFunction =
  new GetShopInfoForChildrenFunction();

class GetShopInfoForLadiesFunction extends ShopInfoFunction {
  constructor() {
    super({
      name: "getShopInfoForLadiesFunction",
      description:
        "Get the name, begin time, end time, description, and english support which is popular with ladies.",
    });
  }
  async call({ parameters }) {
    var retValue = {};
    for (var key in ShopInfoFunction.shopInfo) {
      var shop = ShopInfoFunction.shopInfo[key];
      if (shop.forLadies.includes("High")) {
        retValue[key] = {
          name: shop.name,
          begin: shop.begin,
          end: shop.end,
          genre: shop.genre,
          englishSupport: shop.englishSupport,
          description: shop.description,
        };
      }
    }
    return retValue;
  }
  async onAvatarTalk({ result, document }) {
    super.onAvatarTalkForShopInfo({ result: result, document: document });
  }
}
export const getShopInfoForLadiesFunction = new GetShopInfoForLadiesFunction();

class GetShopInfoForForeignersFunction extends ShopInfoFunction {
  constructor() {
    super({
      name: "getShopInfoForForeignersFunction",
      description:
        "Get the name, begin time, end time, description, and english support which is friendly to foreigners.",
    });
  }
  async call({ parameters }) {
    var retValue = {};
    for (var key in ShopInfoFunction.shopInfo) {
      var shop = ShopInfoFunction.shopInfo[key];
      if (shop.englishSupport.includes("True")) {
        retValue[key] = {
          name: shop.name,
          begin: shop.begin,
          end: shop.end,
          genre: shop.genre,
          forChildren: shop.forChildren,
          description: shop.description,
        };
      }
    }
    return retValue;
  }
  async onAvatarTalk({ result, document }) {
    super.onAvatarTalkForShopInfo({ result: result, document: document });
  }
}
export const getShopInfoForForeignersFunction =
  new GetShopInfoForForeignersFunction();
