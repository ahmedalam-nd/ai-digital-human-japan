import { Function } from "../function.js";
import { ArrayParameter } from "../array_parameter.js";
import { Util } from "../../util.js";

export class ShowVideosAsExtraContentYoutubeFunction extends Function {
  constructor({ extraContentYoutube, videoList = null }) {
    super({
      name: "showYoutubeFunction",
      description:
        "Show videos related to the keyword. The return values are the youtube video IDs and the titles of the videos, so describe just summary of the titles.",
      parameters: [
        new ArrayParameter({
          name: "keywords",
          type: "string",
          description: "The keywords to retrieve the appropriate videos.",
          required: true,
        }),
      ],
    });
    this.extraContentYoutube = extraContentYoutube;
    if (videoList != null) {
      this.videoList = videoList;
    }
  }

  extraContentYoutube;
  videoList = {
    "event, event information, イベント, イベント情報, forsight day, ntt data foresight day 2024, ntt data foresight day, フォーサイトデイ,NTT DATA フォーサイトデイ, NTT DATA フォーサイトデイ 2024":
      {
        KTIFPuY9ZzQ: "NTT DATA Foresight Day 2024 当日ダイジェストムービー",
        txYC7nhh5do: "NTT DATA Foresight Day 2024",
      },
    "foresight, future, human, smart, smart society, trends, technology, sustanability, フォーサイト, 未来, 人間, スマート, スマートソサイエティ, 社会, トレンド, テクノロジー, 未来社会, サステナビリティ":
      {
        "28VqYI1XLyU":
          "NTT DATA Technology Foresight -LOOKING AHEAD: Technology Trends Driving Business Innovation-",
        OkBx8NDnqds: "NTT DATA Technology Foresight: Future vision videos",
        rd4cvEAXDho: "data for : the smart society (NTT DATA future vision)",
      },
    "healthcare, medical, sports, ヘルスケア, 医療, メディカル, スポーツ": {
      UWnPJE6XmsE:
        "NTT DATA Technology Foresight -LOOKING AHEAD: Technology Trends Driving Business Innovation-",
      KHzUXEoQqt8:
        "NTT DATA Future Experience Films: Healthcare driven by neurological data",
      tP6ReTGiRxU:
        "NTT DATA Future Experience Films: Exercise and training driven by wearables and medical support",
      Yd4l6qx5Zas:
        '"Hitoe"—a Wearable New Functional Material to Monitor the Living Body',
    },
    "shopping, home, social, life, aging, house, living, ショッピング, ホーム, ソーシャル, ライフ, エイジング, ハウス, リビング, 社会, 生活, 住まい, 買い物, 買物, 家, 家庭, 生活, 暮らし, 住居":
      {
        aM2DzeOP5PM:
          "NTT DATA Future Experience Films: In-store shopping experiences of the future",
        fMpHeILqTPo:
          "NTT DATA Future Experience Films: Home shopping in the future",
        AP9v0A4L8bo:
          "Communication Robot Supports Independent Living for Seniors",
        _hD3LIJsS4g:
          "NTT DATA Future Experience Films: Sustainable City Living",
      },
    "office, data ,system, integration, blockchain, finance, money, banking, オフィス, データ, システム, 統合, ブロックチェーン, ファイナンス, お金, 銀行":
      {
        US94hn4oMpA:
          "NTT DATA Future Experience Films: Virtual office spaces for convenient and secure communication",
        l34KdZdrqEg:
          "NTT DATA Future Experience Films: How big data will enhance business presentations in the future",
        "zIhomo-ZMDs": "The blockchain evolution",
      },
    "mobility, i-mobility, car, traffic, power, battery, charging, charging station, 車, 自動車, 交通, パワー, バッテリー, 充電, 電気自動車, EV, 充電ステーション":
      {
        b0DlVnVOUWM: "i-Mobility | Three Products provided by NTT DATA",
        IqMUYQrri_0: "i-Mobility | intelligent Carsharing Solution (iCS)",
        "3YBQ88YEPLc": "i-Mobility | Urban Mobility Marketplace (UMM)",
        a2KPSIF6wDU: "i-Mobility | Open Charging Station Controller (OCC)",
        Bn3XLbOglDc:
          "Easing Congestion with Signal Control Based on Traffic Prediction Simulation",
      },
  };

  async call({ parameters }) {
    // Select the list of the videos from videList based on the keywords that match the largest number of the keywords.
    let maxMatch = 0;
    let selectedVideos = {};
    for (const [keywords, videos] of Object.entries(this.videoList)) {
      const match = Util.numberOfOverLapped({
        array1: keywords.split(", "),
        array2: parameters.keywords,
      });
      if (match > maxMatch) {
        maxMatch = match;
        selectedVideos = videos;
      }
    }
    return selectedVideos;
  }

  // Show the video on the screen by using ExtraContentYoutube.
  async onAvatarTalk({ result, document }) {
    if (result == null || Object.keys(result).length == 0) {
      return;
    }
    // Get the videoIde randomly from the selectedVideos.
    const videoId = Util.getMapKeyRandomly({ map: result });

    // Concatinate the videoId of the selectedVideos.
    const videoIds = Object.keys(result).join(",");

    // Show the video on the screen.
    this.extraContentYoutube.updateVideo({
      videoId: videoId,
      playlistId: videoIds,
    });
    this.extraContentYoutube.show();
  }
}
