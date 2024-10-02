import { Function } from "../../function/function.js";
import { Parameter } from "../../function/parameter.js";
import { ArrayParameter } from "../../function/array_parameter.js";
import { ChatGPTFunction } from "../../function/common_functions/chatgpt_function.js";
import { Prompt } from "../prompt.js";
import { apiKeys } from "../../apikeys.js";
import { Util } from "../../util.js";

export class EventTimetableFunction extends Function {
  constructor({ name, description, parameters }) {
    super({
      name: name,
      description: description,
      parameters: parameters,
    });
  }

  createModalContentsForSession(session) {
    if (!session.presenters && (!session.abstract || session.abstract == "")) {
      return "";
    }

    // Create the content string.
    var contentStr = `<article class="message is-info"><div class="message-header">${session.title} (${session.begin} ～ ${session.end})</div>`;
    var presenters = `<div class="message-body">`;

    if (session.presenters) {
      for (var presenter of session.presenters) {
        presenters += `<p class="is-size-7">${presenter.name ?? ""} ${
          presenter.affliation ?? ""
        } (${presenter.title ?? ""})</p>`;
      }
      if (presenters !== "") {
        contentStr += presenters;
      }
    }
    if (session.abstract && session.abstract != "") {
      contentStr += `<p class="is-size-7 has-text-grey-light">${session.abstract}</p>`;
    }
    contentStr += `</div></article>`;
    return contentStr;
  }

  async onAvatarTalk({ result, document }) {
    super.onAvatarTalk({ result: result, document: document });
    if (result == null || result.length == 0 || document == null) {
      return;
    }

    var contentStr = "";
    for (var key in result) {
      contentStr += this.createModalContentsForSession(result[key]);
    }
    if (contentStr == "") {
      return;
    }
    Util.showModalDialog({
      document: document,
      title: "講演情報",
      content: contentStr,
    });
  }

  static eventInfo = {
    name: "NTT DATA Foresight Day 2024",
    theme:
      "テクノロジーの進化がもたらす、社会と業界の劇的な変化を見越して。多角的な視点で進むべき道筋を描き、世の中にイノベーションを起こしていく。NTT DATAはグローバルで培った技術と知見に基づくFORESIGHT（先見力）を起点に変革に挑む。未来を構想する力と実装する力のすべてが、ここにある。ビジネス、テクノロジー、サステナビリティのFORESIGHTを活かして、変化の時代をリード。カレイドスコープを覗いた時のような、胸躍る未来へ、ご一緒に。皆さまのご来場をお待ちしております。",
    venue: "ANAインターコンチネンタルホテル東京地下1階",
    organizer: "株式会社NTTデータ",
    date: new Date(2024, 1, 26),
    begin: "10:00",
    end: "17:30",
    fee: 0,
    currency: "JPY",
  };

  static timeTable = {
    "基調講演K-01": {
      title: "ひらけ、未来。社会課題解決への情熱と変革への胎動",
      begin: "10:00",
      end: "10:50",
      abstract:
        "新世代の社会解決プレーヤーとして活躍する株式会社talikiの中村多伽氏を招いた、スペシャルセッション。最適化されていく社会やビジネスの先に生じる「歪み」として、複雑化し、取り残されていく社会課題。これらの課題に対して企業はどのように向き合い、解決し、価値を生み出していくことができるのか。未解決の課題にアプローチするための、ビジネスの領域や世代を超えた共創、そしてその先に拓かれる社会・ビジネス変革の未来像とは。世代も領域も異なる2人のリーダーの対話から、その道筋を探ります。",
      presenters: [
        {
          name: "中村 多伽",
          affiliation: "株式会社taliki",
          title: "代表取締役CEO, talikiファンド 代表パートナー",
          career:
            "京都大学卒。大学在学中にカンボジアに2校の学校建設を行う。その後、ニューヨークへ留学。現地報道局に勤務し、2016年大統領選や国連総会の取材に携わる。帰国後に株式会社talikiを設立。250以上の社会起業家のインキュベーションや上場企業のオープンイノベーション推進を行いながら、2020年には国内最年少の女性代表として社会課題解決VCを設立し投資活動にも従事。",
        },
        {
          name: "佐々木 裕",
          affiliation: "NTTデータ",
          title: "代表取締役社長",
          career:
            "1990年にNTTデータ通信（現在のNTTデータ）入社。2023年からNTTデータグループの代表取締役副社長執行役員兼NTTデータの代表取締役社長。現職以前は、大規模プロジェクトのプロジェクトマネージャーとして複数のプロジェクトの責任者を経験した後、2016年に執行役員に就任、その後、ソリューション事業部門の責任者や製造インダストリー事業の責任者などにおいてビジネスをリード。東京大学大学院工学系研究科 機械系工学専攻 修士を修了。",
        },
      ],
    },
    "特別講演S-02": {
      title:
        "変革の波及 ～グローバル製造業がどのように稼ぎ方・回し方・人の活かし方を変えてきたか～",
      begin: "13:00",
      end: "13:50",
      abstract:
        "多くの企業が経営施策において”変革”を掲げ、取り組みを進めています。一方で、日本の国際競争力低下について警鐘が鳴らされて久しく、変革の実行力や振り幅において、私たちはまだまだやれることがあるのではないかと考えています。大胆な”変革”が進む欧米企業の事例研究を通じ、私たちと何が違うのか、何ができれば”変革の波及”に至るのかを考察します。",
      presenters: [
        {
          name: "有馬 勲",
          affliation: "NTTデータ",
          title: "取締役副社長執行役員",
        },
      ],
    },
    "特別講演S-03": {
      title:
        "ビジネスに変革をもたらす最新技術トレンド ～NTT DATA Technology Foresight 2024～",
      begin: "15:00",
      end: "15:50",
      abstract:
        "NTT DATA Technology Foresightは、技術とビジネスをテーマに、激しく変化を続ける現在と未来のトレンドを提言したレポートです。本講演では、NTT DATAのグローバルな調査力と分析力を結集した最新版から、主要なポイントをいくつかご紹介します。さらに、開発中の技術をご覧いただき、私たちが見いだした予見が具体化する様もお話しします。情報技術の進化がさらに加速し、ビジネスと一体化して価値を高める中、その本質を知る重要性は高まるばかりです。お客さまと未来戦略を議論するための「羅針盤」として活用され、13年目を迎えたForesightの最新版をご確認ください。",
      presenters: [
        {
          name: "田中 秀彦",
          affliation: "NTTデータグループ 技術革新統括本部",
          title: "執行役員 技術革新統括本部長",
        },
      ],
    },
    "特別講演S-01": {
      title:
        "サステナビリティビジネス最前線 ～海外の最新動向および課題先進国日本でのビジネス創発の仕組み～",
      begin: "11:00",
      end: "11:50",
      abstract:
        "企業はいま、社会貢献の一環としてだけではなく、事業活動から経営までいかにサステナビリティに向き合うか、社会課題の解決や地球環境へ貢献するかが問われています。そのために重要なのは、「事業を通じた社会課題解決」や、社会課題からビジネス創出をめざす「社会イノベーションデザイン」です。本講演ではまず、国内外における事業を通じた社会課題解決の最新事例を紹介します。さらに、課題先進国日本においてNTT DATAが取り組む「社会イノベーションデザイン」の具体事例の紹介を交えながら、社会課題からのビジネス創出のリアルをお話しします。",
      presenters: [
        {
          name: "池田 佳子",
          affliation: "NTTデータグループ コーポレート統括本部",
          title: "執行役員 サステナビリティ経営推進部長",
        },
        {
          name: "濱口 雅史",
          affliation: "NTTデータ ソーシャルデザイン推進室",
          title: "執行役員 ソーシャルデザイン推進室長",
        },
        {
          name: "金田 晃一",
          affliation: "NTTデータグループ コーポレート統括本部",
          title: "サステナビリティ経営推進部 シニア・スペシャリスト",
        },
      ],
    },
    "特別講演S-05": {
      title:
        "デジタルトランスフォーメーション・ロードマップ ～デジタル戦略の第一人者によるベストセラー最新刊発刊特別セミナー～",
      begin: "16:00",
      end: "16:50",
      abstract:
        "多くの企業がDXの導入を推進するが、約70％が失敗していると言われています。コロンビア大学ビジネススクールのデビッド・ロジャース教授の前著「Digital Transformation Playbook」（2016年）は、DXをいかに導入していくかに注力し、DXの実践的なガイドとして世界的なベストセラーとなりました。2023年8月に刊行された最新著書「Digital Transformation Roadmap」では、5つのステップ「DXロードマップ」を通じて、具体的にDXを成功に導く実践論を掘り下げています。日本語版発刊に先駆けた同氏の特別講演として、新著の中身を著者自ら解説します。DXにかかわる最新のフレームワークとユースケースから、日本企業への示唆と、すぐに活用できるDX実践論に触れていただけます。日本語同時通訳が実施されます",
      presenters: [
        {
          name: "David Rogers",
          affliation: "コロンビア大学ビジネススクール",
          title: "教授",
          career:
            "DX及びデジタルビジネス戦略を専門とするコロンビア大学ビジネススクールの教授であり、25,000人以上のエグゼクティブを対象にデジタルビジネス戦略やDXリーダーシップの教育プログラムのファカルティ・ディレクターを務めている。このテーマに関する5冊の本を執筆しており、その影響力は世界中に拡がっている。また、グーグル、シティバンク、トヨタ、GEなどの主要企業に対して、デジタル時代に適応できるようアドバイスをしている。",
        },
      ],
    },
    "日経企画講演R-01": {
      title: "「Connect & Trust」で開かれるバンキングの未来",
      begin: "11:00",
      end: "11:40",
      abstract:
        "テクノロジーの進化が世界を大きく変えつつある今、銀行が本業のみで成長し続けられる時代は終わりを迎えつつあります。新たなビジネスを創り出すための変革のキーワードは「Connect」と「Trust」。Connectには、幅広い事業者と関わりを持つ金融機関が、これまでになかった産業同士の組み合わせを加速することで、新たな事業創造につなげていくことへの期待が込められています。またTrustでは、お金を通して信頼と安定を培ってきた銀行が、テクノロジーが変革する未知の領域でもトラストアンカーとなり、新たな価値を提供できる可能性を示しています。本講演では、金融機関がConnect&Trustを実現する未来の姿を共に考えていきます。",
      keywords: ["コンサルティング", "金融"],
      presenters: [
        {
          name: "飯田 哲夫",
          affliation: "アマゾン ウェブ サービス ジャパン",
          title: "金融事業開発本部長",
          career:
            "2016年よりアマゾン ウェブ サービス ジャパンにて金融領域の事業開発を担当。前職では株式会社電通国際情報サービスにて、勘定系、決済系などを中心に、金融機関向けのITソリューションの開発・企画を担当。日本初のFinTechピッチコンテスト「FIBC」を手掛けるなど、日本国内におけるFinTech領域の拡大にも貢献。一般社団法人金融革新同友会FINOVATORS副代表理事。",
        },
        {
          name: "山本 英生",
          affliation: "NTTデータ 金融イノベーション本部",
          title: "イノベーションリーダーシップ統括部 統括部長",
        },
      ],
    },
    "日経企画講演R-03": {
      title:
        "デジタル活用でハイレジリエントな未来へ ～“災害大国”日本に生きる私たちが持つべき視点～",
      begin: "11:00",
      end: "11:40",
      abstract:
        "近年の気候変動の影響で、自然災害リスクが地球規模で増大しています。災害の頻発化や激甚化、広域化が進む中、どのようにリスクに備え、危機に立ち向かうのか。この点から「レジリエンス（回復力）」に注目が集まっています。日本は世界的にも「災害大国」として知られ、レジリエンスの重要性は公共のみならず、ビジネス領域でも高まり災害対策の海外展開も期待されています。今回は、「防災・レジリエンス」をテーマに気象予報士・気象キャスターとして活躍する斉田季実治さまをお迎えし、近年の環境変化や、企業活動に与える影響などをお話いただきます。国や自治体・企業がレジリエンスを確保するための視点を共に考えて参ります。",
      keywords: [
        "データ＆インテリジェンス",
        "コンサルティング",
        "官公庁・自治体",
        "防災・レジリエンス",
      ],
      presenters: [
        {
          name: "斉田 季実治",
          affliation: "ヒンメル・コンサルティング",
          title: "気象予報士／気象キャスター, ヒンメル・コンサルティング 代表",
          career:
            "1975年、東京都生まれ。北海道大学で海洋気象学を専攻し、在学中に気象予報士資格を取得。防災士、一級危機管理士。報道記者として、2003年の台風第10号や十勝沖地震の被害中継など数多くの災害現場を取材。被害を伝えるだけでなく、未然に防ぎたいとの想いから防災の専門家の道へ。民間気象会社で経験を積み、2006年からNHKで気象キャスターを務める。現在は「ニュースウオッチ9」「明日をまもるナビ」などに出演。連続テレビ小説「おかえりモネ」気象考証を担当。2018年には株式会社ヒンメル・コンサルティングを設立。NPO法人気象キャスターネットワーク理事。NICT宇宙天気ユーザー協議会アウトリーチ分科会長。著書や講演活動など多方面で活躍している。",
        },
        {
          name: "阿部 暁",
          affliation: "NTTデータ 社会DX推進室",
          title: "防災・レジリエンス推進担当 課長",
        },
      ],
    },
    "日経企画講演R-06": {
      title: "今こそ注目したい睡眠！先進技術が実現するウェルビーイングの未来像",
      begin: "12:00",
      end: "12:40",
      abstract:
        "コロナ禍を経て、生活者の価値観や生活習慣は大きく変化し、健康への意識が高まっています。企業においても、人材の採用と維持、生産性向上のために、従業員のウェルビーイングを高める具体的な取り組みが不可欠となっています。本講演では、睡眠コンサルタントの友野なお先生を招いて、日本では軽視されがちな睡眠の重要性に着目し、誰もが自分に合った睡眠がとれる世界につながる先進研究や事例をご紹介します。さらにNTT DATAが考える生活者や従業員のウェルビーイングを実現するエコシステムを提言するとともに、未来像の体感とビジネス共創を実現する取り組みとして”ヘルスケア共創ラボ” をご紹介します。",
      keywords: [
        "データ＆インテリジェンス",
        "IoT",
        "コンサルティング",
        "金融",
        "医療・ヘルスケア",
      ],
      presenters: [
        {
          name: "友野 なお",
          affliation: "SEA Trinity",
          title: "代表取締役",
          career:
            "「社会予防医学」「社会疫学」のフィールドにおける睡眠を　研究し、 健康寿命の延伸、健康格差の縮小を目指す。自身が睡眠を改善したことにより、15kg以上のダイエット、さらに体質改善に成功した経験から科学的に睡眠を学んだのち、睡眠の専門家として全国にリバウンドしない快眠メソッドを伝授。",
        },
        {
          name: "矢野 高史",
          affliation: "NTTデータ 保険ITサービス事業部",
          title: "戦略デザイン室 室長",
        },
      ],
    },
    "日経企画講演R-10": {
      title: "「物流クライシス」を乗り越える ～サステナブル物流戦略の新展開～",
      begin: "13:00",
      end: "13:40",
      abstract:
        "ドライバーの高齢化と、2024年問題として知られる時間外労働の上限規制が近づき、「物流クライシス」が現実問題として浮上しています。これにより、物流の効率性向上が日本社会における最重要課題となっています。トラックドライバー不足の課題にどう対処するか、労働環境の改善、荷役作業の効率化、積載率の向上、中継輸送の最適化、モーダルシフト、あらゆる施策を打つ必要がありますが、どれも荷主の協力がなくては実現しません。物流全体の効率性を高め、産業の血流ともいえる物流をサステナブルなものに変えていくためには何が必要か、荷主や運送事業者、倉庫事業者に求められる役割について、詳しくお話しします。",
      keywords: [
        "SCM・ロジスティクス",
        "コンサルティング",
        "小売・流通",
        "モビリティ",
      ],
      presenters: [
        {
          name: "五島 洋次郎",
          affliation: "日本貨物鉄道 鉄道ロジスティクス本部",
          title: "総合物流部長",
          career:
            "1967年生まれ。1991年日本貨物鉄道株式会社（JR貨物）入社。1999年社団法人（当時。現公益社団法人）全国通運連盟出向、2004年本社営業部グループリーダー（通運・企画）、2006年東北支社次長（営業）、2010年国際物流開発部グループリーダー、2015年日本フレートライナー株式会社取締役営業本部長、2019年関西支社営業部長、2021年総合物流部長（現任）",
        },
        {
          name: "松栄 純子",
          affliation: "NTTデータ 法人コンサルティング＆マーケティング事業本部",
          title: "サステナビリティサービス＆ストラテジー推進室 部長",
        },
      ],
    },
    "日経企画講演R-14": {
      title:
        "エシカルな未来を紡ぐ革新 ～ファッション業界のサプライチェーンを変えるデジタルエコシステム～",
      begin: "14:00",
      end: "14:40",
      abstract:
        "サプライチェーンが直面する環境的・社会的課題は日増しに複雑化しています。特に、温室効果ガスや水資源の削減、労働安全性の確保といった要求が高まる中、品質向上や不良品の流出防止、消費者からの信頼獲得のためにも、製品のトレーサビリティ（製品の原材料の調達から生産、流通・販売、消費まで把握する仕組み）の実現は極めて重要です。本講演では、ファッション業界のサプライチェーンにおけるコミュニケーションの非効率さが生む問題点と、それに対するエコシステム構想による改善策、未来展望に焦点を当てます。",
      keywords: ["EDI", "デジタルツイン", "製造"],
      presenters: [
        {
          name: "吉本 幸司",
          affliation: "NTTデータ 金融イノベーション本部",
          title: "グローバルカスタマーサクセス室 室長",
        },
      ],
    },
    "日経企画講演R-15": {
      title:
        "医療ビッグデータと次世代AIが変革のカギ ～“患者中心”へのシフトと製薬ビジネスの未来～",
      begin: "15:00",
      end: "15:40",
      abstract:
        "デジタルテクノロジーを起点としたビジネスのDXがあらゆる産業で進む中、医療分野に期待されているのは患者中心の医療体験（Medical Experience：MX）の変革。そのカギを握るのが「医療ビッグデータ」と「次世代AI」です。2024年5月の改正次世代医療基盤法施行を前に、製薬業界が直面している構造変化とデジタル化の波にどう対応し、患者中心のMX実現に向けて進んでいくのか――。京都大学大学院医学研究科ビッグデータ医科学分野教授の奥野恭史氏に登壇いただき、将来ビジョンの描き方を指南いただきます。",
      keywords: [
        "データ＆インテリジェンス",
        "コンサルティング",
        "医療・ヘルスケア",
        "製薬・ライフサイエンス",
      ],
      presenters: [
        {
          name: "奥野 恭史",
          affliation: "京都大学大学院医学研究科",
          title: "ビッグデータ医科学分野 教授",
          career:
            "1993年 京都大学薬学部卒業、同大学院薬学研究科にて博士（薬学）取得。同大学院医学研究科特定教授を経て2016年 京都大学大学院医学研究科ビッグデータ医科学分野教授、現在に至る。 一般社団法人ライフインテリジェンスコンソーシアム 代表理事、理化学研究所計算科学研究センターHPC／AI駆動型医薬プラットフォーム 部門長を併任。専門は創薬計算科学、ビッグデータ医科学。",
        },
        {
          name: "関根 志光",
          affliation: "NTTデータ 第二インダストリ統括事業本部",
          title: "製薬・化学事業部 部長",
        },
      ],
    },
    "日経企画講演R-17": {
      title: "変革の舞台裏 ～デザインの力で組織サイロを打破～",
      begin: "15:00",
      end: "15:40",
      abstract:
        "マクドナルドのサプライチェーンをインテグレーターとして支えるHAVIサプライチェーン・ソリューションズ・ジャパン（HAVI社）との業務改革（BPR）のプロジェクトを通じて得た学びをもとに、デザインがBPR領域でどのような価値を発揮するのか、そして組織内のサイロ化という課題をどう解消するのかを深堀します。さらに、真の組織変革への道をデザインの手法を用いて導き出した経験から、SCMのこれからとデザインコンサルティングの真価についてお話しします。",
      keywords: [
        "SCM・ロジスティクス",
        "コンサルティング",
        "食品",
        "小売・流通",
      ],
      presenters: [
        {
          name: "海老原 憲",
          affliation: "HAVIサプライチェーン・ソリューションズ・ジャパン",
          title:
            "カスタマーサクセス本部 レストランサクセス部兼サクセスエネーブルメント部 シニアマネジャー",
          career:
            "新卒で三井物産に入社、その後ITスタートアップ、フリーランスのWEBプロデューサーや、企業に属してAIやVRを活用した新規事業構築プロデューサーに従事。2023年に同社に入社。サプライチェーンにおける業務プロセスや働き方を見直すBPRプロジェクトを推進。現在は、2つの部門のシニアマネジャーを兼務し、BPRで企画した新しい働き方とパフォーマンス向上に挑戦中。",
        },
        {
          name: "村岸 史隆",
          affliation:
            "NTTデータ デザイン＆テクノロジーコンサルティング事業本部",
          title: "サービスデザイングループ Tangity ADP",
        },
      ],
    },
    "講演R-02": {
      title:
        "流通・小売の未来に必要な取り組み ～データ駆動型経営による新たな店舗形態と業務大変革～",
      begin: "11:00",
      end: "11:40",
      abstract:
        '流通・小売業は生活者に最も近い存在として環境変化に敏感に反応し、自らも変化を続けることで日常生活の便利と日常の笑顔を支えてきました。変化する環境の中で、"さらなる便利"と"日常の中の感動"を追求するため、これからの流通・小売業界においては以下2つの取り組みが重要になるとNTT DATAは考えます。（1）生活者ニーズに沿った商品・サービス/購入体験への“さらなる”対応（2）社会的使命でもある“持続可能な”事業運営（業務省人化・自動化・高精度化）一見相反するこれら2つの取り組みを実現するには、デジタルの経済原理を活用することが重要であり、その未来像をご説明します。',
      keywords: [
        "顧客接点・決済",
        "SCM・ロジスティクス",
        "データ＆インテリジェンス",
        "小売・流通",
      ],
      presenters: [
        {
          name: "田中 貴之",
          affliation: "NTTデータ 第二インダストリ統括事業本部",
          title: "流通・小売事業部 課長",
        },
      ],
    },
    "ランチセッションR-04": {
      title: "グローバルスタートアップと生み出すイノベーション",
      begin: "12:00",
      end: "12:40",
      abstract:
        "近年、日本国内ではスタートアップへの投資や育成が国家レベルで進み始めています。また世界を見てもスタートアップは続々と台頭しており、彼らと共創しイノベーションを起こしていくことが、企業にとって新規ビジネス創出の鍵となります。本講演では、NTT DATAにおいてシリコンバレーを拠点とし先進技術の研究開発やスタートアップ連携を推進しているチームと、主に国内でオープンイノベーションを推進する「豊洲の港から」の連携により生まれたオープンイノベーション事例を紹介。グローバルでオープンイノベーションを成功させる要諦に迫ります。",
      keywords: [
        "顧客接点・決済",
        "データ＆インテリジェンス",
        "ロボティクス・RPA",
        "防災・レジリエンス",
        "小売・流通",
      ],
      presenters: [
        {
          name: "松井 健",
          affliation: "ugo（ユーゴ―）",
          title: "代表取締役CEO",
          career:
            "東京工科大学 メディア学部卒。2006年 株式会社モンスター・ラボの創業メンバーとして参画し、様々な新規事業のスマホアプリやWebシステムを開発する。2011年 IoTデバイス開発会社ミラを創業し様々なコネクテッドデバイスの開発・量産経験を経て、2018年ｕｇｏ株式会社を創業、代表取締役CEOに就任。2021年に業務DXロボット「ugo（ユーゴー）」を警備ロボットとして商用化を開始。警備以外の分野ではデータセンターや発電所など点検分野での導入が進められている。2022年「東京都ベンチャー技術大賞」奨励賞受賞。2023年週刊東洋経済の「すごいベンチャー100」に選出。",
        },
        {
          name: "渡辺 出",
          affliation: "NTTデータ 経営企画本部",
          title: "オープンイノベーション・チーム 部長",
        },
        {
          name: "廣田 和也",
          affliation: "NTTデータグループ グローバルイノベーション本部",
          title: "アライアンス推進室 シニア・スペシャリスト",
        },
      ],
    },
    "ランチセッションR-05": {
      title: "SCM5.0とは？今求められる人間中心のサプライチェーンマネジメント",
      begin: "12:00",
      end: "12:40",
      abstract:
        "サプライチェーンは現在、大きな変動を経験しています。米中経済摩擦やコロナ禍により、部品不足や輸送の中断、供給不安といった予測困難な出来事が発生し、これまでにないほどのぜい弱性が露呈しました。需要だけでなく供給の不確実性への対応、さらにはESG課題への対応が求められる今、ダイナミックな変化に適応できる“レジリエンス“を築くことがサプライチェーンマネジメント（SCM）の進化と成果につながります。一方でSCM改革を進めていくには”人”の観点が重要になります。SCM改革の進め方を”人”の観点からご説明いたします。",
      keywords: [
        "SCM・ロジスティクス",
        "コンサルティング",
        "サステナビリティ",
        "小売・流通",
        "製造",
      ],
      presenters: [
        {
          name: "笹川 亮平",
          affliation: "クニエ CS事業部",
          title: "シニア・パートナー",
          career:
            "国内システムインテグレーター、外資系コンサルティングファームを経てクニエに入社。一貫して製造業のSCM/S＆OP関連プロジェクトに取り組み、SCM/S＆OP業務改革、ERP/SCP構想策定および導入コンサルティングに従事。現在同社のSCMプラクティスの責任者を務める。組立系、プロセス系製造業の企画構想から定着化まで地道な改善活動にも支援実績多数。主な著書として『ダイナミックサプライチェーンマネジメント』がある。",
        },
      ],
    },
    "ランチセッションR-07": {
      title: "共創型社会デザイン ～NTT DATAの流儀～",
      begin: "12:00",
      end: "12:40",
      abstract:
        "複雑化する社会課題。NTT DATAは、社会の変化を後追いするのではなく予測し、未来像を描いて社会課題を解決することが重要だと考えます。そのためには、生活者・行政・企業それぞれにとって価値がある課題解決策を共創する「共創型社会デザイン」が必要です。NTT DATAでは、共創型社会デザインに、価値を全体的な整合性をもって持続的に交換するしくみの観点を取り入れています。本講演ではこうした共創型社会デザインの考え方をご紹介します。",
      keywords: ["コンサルティング", "官公庁・自治体"],
      presenters: [
        {
          name: "松本 良平",
          affliation: "NTTデータ 公共統括本部",
          title: "社会DX推進室長",
        },
      ],
    },
    "講演R-08": {
      title:
        "サステナビリティ対応力は企業競争力の源泉となるか？ ～デジタル活用で企業・製品価値を向上させるアプローチ～",
      begin: "13:00",
      end: "13:40",
      abstract:
        "サステナビリティは企業競争力の源泉になり得るものなのでしょうか？昨今、ビジネスの世界でもサステナビリティへ取り組む必要性が高まっていますが、一部の企業ではビジネスとのひも付けに苦労しています。本講演では、環境・エネルギー分野を中心に幅広い実績を持つ、NTTデータ経営研究所からグローバルにおけるサステナビリティをめぐる潮流がビジネスに与える影響、新たなビジネスチャンス、デジタルの役割等を紹介します。また、IT企業としてお客さま・社会全体のサステナビリティを推進してきたNTT DATAの取り組みも交え、競争力の源泉であるサステナビリティ対応力を高めていくには企業は何をすべきか、どのようなアプローチが必要か議論します。",
      keywords: [
        "カーボンニュートラル",
        "コンサルティング",
        "サステナビリティ",
        "モビリティ",
        "製造",
      ],
      presenters: [
        {
          name: "下垣 徹",
          affliation: "NTTデータグループ サステナビリティ経営推進部",
          title: "グリーンイノベーション推進室 室長",
        },
        {
          name: "村岡 元司",
          affliation: "NTTデータ経営研究所",
          title:
            "執行役員／パートナー 社会・環境戦略コンサルティングユニット ユニット長",
          career:
            "大手商社、シンクタンクを経て、2001年6月より現職。環境エネルギー分野を中心に、地球温暖化対策、事業戦略策定、スマートコミュニティ構想策定、環境インフラ輸出支援、エネルギーを起点としたまちづくりなど、幅広い実績を持つ。寄稿、講演多数。著書に『PFI ビジネス参入の戦略』（B＆Tブックス）、『図解 企業のための環境問題』（東洋経済新報社）、『環境倒産』（B＆Tブックス）、『実践 PFI適用事業』（ぎょうせい）、『成功する！ 地域発ビジネスの進め方』（かんき出版）、『詳解 排出権信託 制度設計と活用事例』（中央経済社）、『環境ビジネスのいま』（NTT出版）（いずれも共著）等",
        },
      ],
    },
    "講演R-09": {
      title:
        "企業価値を生み出すデータ活用のあるべき姿とは ～顧客と伴走し、価値提供し続ける現場リーダーの苦悩と提言～",
      begin: "13:00",
      end: "13:40",
      abstract:
        "データ活用は一般的になってきていますが、推進するにあたってはさまざまな壁にぶつかっている方も多いのではないでしょうか？実際、NTT DATAがデータ活用プラットフォームを提供しているテレコム、製造、金融、ユーティリティなど多岐にわたるお客さまからも、日々悩みや要望が寄せられています。本講演では、お客さまが持つデータ活用に関する悩み、要望、課題と日々対峙しているNTT DATAの現場リーダーとのパネルディスカッションを通して課題解決のポイントを探り、さらにはデータ活用のあるべき姿を提言します。",
      keywords: [
        "クラウド",
        "データ＆インテリジェンス",
        "金融",
        "電力・ガス・水道",
      ],
      presenters: [
        {
          name: "村山 弘城",
          affliation:
            "NTTデータ デザイン＆テクノロジーコンサルティング事業本部",
          title: "Snowflakeビジネス推進室 室長",
        },
        {
          name: "本村 昭太郎",
          affliation: "NTTデータ テレコム・ユーティリティ事業本部",
          title: "モバイルビジネス事業部 課長",
        },
        {
          name: "安土 広志",
          affliation: "NTTデータ 第三金融事業本部",
          title: "保険ITビジネス事業部 課長",
        },
        {
          name: "二本松 良輔",
          affliation: "NTTデータ システムインテグレーション事業本部",
          title: "システムインテグレーション事業部 課長代理",
        },
      ],
    },
    "講演R-11": {
      title:
        "未来展望：ソフトウェアが変えるクルマと社会 ～コネクティッドデータで社会課題を解決～",
      begin: "14:00",
      end: "14:40",
      abstract:
        "NTT DATAでは、自動車業界の成長の鍵としてCX（顧客接点関連サービス）、MX（自動運転を主軸とするモビリティサービス）、EX（EVを主軸とするエネルギーサービス）の3領域を定義しています。本講演では、ICT技術革新による大きな変革期が訪れているMXの領域に着目。車両開発や自動運転、データ連携における変革が相互に影響しあい変わっていく業界の未来を展望します。また、すでに始まっている、コネクティッドデータと他業界のデータ連携における社会課題解決について、トヨタ自動車、NTT DATAの取り組み事例を交えて紹介。さらなる変革の加速に向けてともに考えます。",
      keywords: [
        "カーボンニュートラル",
        "データ＆インテリジェンス",
        "IoT",
        "モビリティ",
        "製造",
      ],
      presenters: [
        {
          name: "田村 誠",
          affliation: "トヨタ自動車 デジタルソフトウェア開発センター",
          title: "e-TOYOTA部 DSデータ事業推進室 室長",
          career:
            "1988年トヨタ自動車の経営企画部門に入社。その後、IoT分野の新規事業企画推進に携わる。日本・中国におけるテレマティクスサービスの導入、日本・フランス・タイにおける小型電気自動車を活用したカーシェアリング事業を推進。現在はデータ事業推進室に所属し、車両データを活用した新規事業創出の推進に取り組んでいる。",
        },
        {
          name: "千葉 祐",
          affliation: "NTTデータ 第一インダストリ統括事業本部",
          title: "自動車事業部 部長",
        },
      ],
    },
    "講演R-12": {
      title:
        "生成AIがもたらす未来 ～進化するAI時代に企業はどう備えるべきか？～",
      begin: "14:00",
      end: "14:40",
      abstract:
        "「ChatGPT」や「DALL·E」をはじめとする生成AIの登場により、世界は大きく変わろうとしています。私たちの生活や働き方、ビジネスに破壊的な変化が起きつつあることを実感している方も多いのではないでしょうか。一方で、セキュリティ、ハルシネーションや回答の不適切性など生成AIの課題も明らかになってきています。本講演では、生成AIの技術的背景と課題を整理しつつ、AIの進展により人々の生活・社会・ビジネスがどう変わっていくか、また来るべき世界で企業はどう備え価値を創出するべきか、具体的なサービスも交えながらご紹介します。",
      keywords: [
        "CRM（Salesforce）",
        "データ＆インテリジェンス",
        "コンサルティング",
        "金融",
        "電力・ガス・水道",
      ],
      presenters: [
        {
          name: "奥田 良治",
          affliation:
            "NTTデータ デザイン＆テクノロジーコンサルティング事業本部",
          title: "デジタルサクセスコンサルティングユニット ユニット長",
        },
        {
          name: "野村 哲郎",
          affliation:
            "NTTデータ デザイン＆テクノロジーコンサルティング事業本部",
          title: "デジタルサクセスコンサルティングユニット 課長",
        },
      ],
    },
    "講演R-13": {
      title:
        "デジタル時代に求められる組織・人材マネジメント ～7つの戦略アクションを徹底解説～",
      begin: "14:00",
      end: "14:40",
      abstract:
        "社会・事業環境変化スピードが加速していく中で、中長期ビジョン・経営戦略・DX戦略等を確実に実行へ移し、そしてビジネスの成果へとつなげていくための鍵は、「組織・人材戦略」と「変化に迅速に対応できる組織アジリティ」です。その一方で現実には、組織運営硬直化、必要人材の獲得難、スキルミスマッチ等の悩みを突破できている企業は限られます。本講演では、各ビジネス・機能を担う責任者がバズワードに惑わされることなく、本質的に対応を検討すべき7つの重要変革テーマを掘り下げます。そして、その概要や必要性背景、陥りがちな罠やその突破方法等について、企業事例等を含めてご紹介します。",
      keywords: [
        "データ＆インテリジェンス",
        "コンサルティング",
        "モビリティ",
        "製造",
      ],
      presenters: [
        {
          name: "長安 賢",
          affliation: "NTTデータ経営研究所",
          title:
            "パートナー 組織・人材変革コンサルティング室 組織・人材変革コンサルティング室長",
          career:
            "大手外資コンサルティングファームにおける20年以上の組織・人材領域のコンサルティング経験を経てNTTデータ経営研究所へ参加。IT・通信・ハイテク・金融・製造・小売・サービス・化学・エネルギー等の幅広い業界において、戦略・将来ビジネスモデルに応じた最適な人事・人材戦略策定、デジタル組織強化、グループガバナンス強化、全社組織改革/最適化、Digital等を含むキーワークフォース強化、社員自律性を生かしたリスキル/リソースシフトモデル構築、人的資本情報・人材ダッシュボード定義、次世代リーダーシップ強化等のリード実績を有する。戦略構想から実行レベルまで、人を生かしアジャイルに変化し続けられる競争力のあるモデル構築を支援。",
        },
      ],
    },
    "講演R-16": {
      title:
        "新たな需要創出に向けたJR東海のデジタル変革 ～アフターコロナの環境変化を捉えた3つの施策と今後のデジタル戦略～",
      begin: "15:00",
      end: "15:40",
      abstract:
        "コロナ禍により大きな事業環境の変化を受けた業界でJR東海がどのように新たな施策を生み出し、そこにNTT DATAがどのように伴走したのか、また、今後どのような成長戦略を一緒に描いているのか、試行錯誤の過程も交えて語ります。",
      keywords: [
        "顧客接点・決済",
        "データ＆インテリジェンス",
        "アプリケーション開発・管理",
        "小売・流通",
      ],
      presenters: [
        {
          name: "小林 丈通",
          affliation: "東海旅客鉄道 事業推進本部",
          title: "DX推進・マーケティング総括 担当課長",
          career:
            "2000年入社。駅ビル開発や新規事業開発などのビジネス開発に携わった後、東海道山陽新幹線のネット予約サービス（EXサービス）のシステム開発を経て、現職であるDX推進・マーケティングチームのプロジェクトリーダーとして、グループ共通営業システムの開発やグループ共通ポイント制度の創設、マーケティングプラットフォームの構築など、デジタルを活用した様々な案件に従事。",
        },
        {
          name: "湯地 克彦",
          affliation: "NTTデータ 第一インダストリ統括事業本部",
          title: "交通・観光・エンタメ事業部 部長",
        },
      ],
    },
    "講演R-18": {
      title:
        "先進技術によるビジネス革新の最先端 ～量子コンピュータ、ブロックチェーン活用などグローバルの最新事例を紹介～",
      begin: "16:00",
      end: "16:40",
      abstract:
        "いま注目される先進技術によるビジネス革新の最先端。世界6か国に拠点を持つ「イノベーションセンタ」が取り組む旬のテーマから、グローバルでのお客さまとの共創事例をピックアップしてお届けします。 -ビジネス拡大フェーズにある、ブロックチェーン、デジタルツイン、量子コンピューティング -今後期待できる技術として、衛星データ活用、AR（Augmented Reality）cloudなど",
      keywords: [
        "ブロックチェーン",
        "量子コンピュータ・イジングマシン",
        "デジタルツイン",
        "金融",
        "製造",
      ],
      presenters: [
        {
          name: "久保 賢治",
          affliation: "香味醗酵",
          title: "代表取締役 最高事業開発責任者",
          career:
            "2017年5月15日、大阪大学 産業科学研究所の成果「嗅覚受容体の反応性に基づく全ての匂いの定量的表現法」を基に、全ヒト嗅覚受容体セルアレイセンサーによる匂い定量化を事業とする株式会社香味醗酵を創業した。",
        },
        {
          name: "古川 洋",
          affliation: "NTTデータグループ 技術革新統括本部",
          title: "イノベーションセンタ センタ長",
        },
        {
          name: "世取山 進二",
          affliation: "NTTデータ 第三金融事業本部",
          title: "次世代決済技術推進室 室長",
        },
      ],
    },
    "講演R-19": {
      title:
        "フランス、デンマークの事例からみる、 これからの地域づくり ～創造と自己実現の場としての地方創生～",
      begin: "16:00",
      end: "16:40",
      abstract:
        "デジタル技術の進展と産業構造の変化とがあいまって、地方圏においても創造性の高い産業が誕生するケースが増えています。地方都市の政策立案者や地域産業の経営層は、こうした新たなチャンスにどう向き合えば良いのでしょうか。本講演では、フランス、デンマークからの有識者を交え、フォーサイトドリブンな地域づくりのあり方を模索します。",
      keywords: ["コンサルティング", "サステナビリティ", "官公庁・自治体"],
      presenters: [
        {
          name: "安岡 美佳",
          affliation: "デンマーク・ロスキレ大学",
          title: "准教授 北欧研究所 代表",
          career:
            "ロスキレ大学准教授/メンバーズ社外取締役/一般社団法人スマートシティ・インスティテュート、エグゼクティブアドバイザー/JETROコンサルタント。北欧におけるITシステム構築手法としての参加型デザインやリビングラボの理論と実践、それら手法の社会文化的影響に関心を持つ。近年は、企業や大学とともにスマートシティ、アバター研究に取り組む。近著「北欧のスマートシティ」（学芸出版社）。",
        },
        {
          name: "江井 仙佳",
          affliation: "NTTデータ経営研究所",
          title: "パートナー 地域未来デザインユニット ユニット長",
          career:
            "地域課題・社会課題の解決をテーマに、地方創生、食とサステナビリティ、レジリエンスといった領域において、政策の立案と社会実装、プロジェクトビジネス創出を担う。東京大学まちづくり大学院　特別講師、日本都市計画家協会理事、（公財）日本都市計画学会　スマートシティ特別委員会　委員、日本商工会議所　地域BCM研究会　専門委員、経済産業　Society5.0国際標準化準備委員会　委員、農林水産省　農山漁村発イノベーション中央サポートセンター検証委員会委員　などを歴任。",
        },
      ],
    },
    "講演R-20": {
      title:
        "産業データ流通によるトレーサビリティ革命 ～製造業が直面するエコシステムの変化とデータ流通による新規ビジネスの可能性～",
      begin: "16:00",
      end: "16:40",
      abstract:
        "製品価値の提供が変わりつつある中で、今後IoTを通じて製品の稼働データ、製造履歴データなどが国境を越えて流通する時代が来ようとしています。自社が所属するエコシステム／サプライチェーンで価値提供を続けて生き残るためには、業務・製品情報のトレーサビリティが必要です。今後想定されるデータスペースへの対応や活用方法と、そのデータを通じて生まれる新しいビジネスの形を解説します。また、新たなビジネスの実現には、データ流通をさせる基盤やアプリケーションの利用と、その上で流通させる自社データの精度向上がポイントとなります。これらの観点で、今から取り組まなければならない改革についてお話しします。",
      keywords: [
        "カーボンニュートラル",
        "SCM・ロジスティクス",
        "システム基盤設計",
        "小売・流通",
        "製造",
      ],
      presenters: [
        {
          name: "須藤 淳一",
          affliation: "クニエCS事業本部",
          title: "シニアパートナー",
          career:
            "メーカーにて製品設計/量産立上業務に従事、その後外資系PLMベンダー、製造業向コンサルティング会社を経てNTTデータビジネスコンサルティング（現QUNIE）入社。自動車、自動車部品、重工業、工作機械、産業機械等の製造業に精通し、設計/開発領域の業務改革/システム導入、および、生産管理、新事業企画（業界特化B2B事業等）など多岐にわたるプロジェクトをリードする。",
        },
      ],
    },
    展示1: {
      title: "生成AIと3Dアバターを活用したデジタルヒューマン",
      begin: "10:00",
      end: "17:30",
      abstract:
        "デジタルヒューマンは、近年急速に進化する生成AIと3Dアバター技術を組み合わせることにより、私たちと同じように人間の姿を持ち、対話し、共に豊かな社会を実現してくれる技術です。特に日本では、労働人口の減少は差し迫った社会課題となっています。デジタルヒューマンは、人手では非採算となる業務や長時間労働にも対応できる存在として、今後社会的ニーズが高まることが期待されています。ぜひ、デジタルヒューマンとのリアルな対話をお試しください。",
      presenters: [
        {
          name: "百田 紳二",
          affliation: "NTTデータグループ 技術革新統括本部",
          title: "イノベーションセンタ 課長",
        },
        {
          name: "大杉 直樹",
          affliation: "NTTデータグループ 技術革新統括本部",
          title: "イノベーションセンタ シニアエキスパート",
        },
        {
          name: "加賀谷 豊明",
          affliation: "NTTデータグループ 技術革新統括本部",
          title: "イノベーションセンタ シニアエキスパート",
        },
      ],
    },
    展示2: {
      title:
        "におい・かおり産業のDX～先進最適化技術による匂いの合成・転送プラットフォーム～",
      begin: "10:00",
      end: "17:30",
      abstract:
        "デジタル技術を活用した先進的な香料の合成方法と、実際に合成された香りを展示します。香味醗酵は、大阪大学発のベンチャー企業として、世界で初めて世の中に存在するすべての匂いを数値化できる技術を実現しました。また、NTT DATAは、量子コンピュータをはじめとした先進的な計算技術を用いて、大規模かつ難度の高い数値計算方法の開発に取り組んでいます。本技術によって高精度・転送可能な匂い情報の取り扱いが可能になり、食品、ヘルスケア、医療、メタバース等の産業にイノベーションをもたらすことが期待されます。",
      presenters: [],
    },
    展示3: {
      title: "クロスモーダルAIによる個性診断/ウェルビーイング度の可視化",
      begin: "10:00",
      end: "17:30",
      abstract:
        "2つのソリューションにて、それぞれ30秒のカメラ映像から、個性とウェルビーイングの状態を分析してレポートします。（1）ニックネーム生成AI: 表情、声、発話内容を統合的に分析するクロスモーダルAIを用いて、他者とは異なる特長（個性）を可視化します。さらに個性をアピールするニックネームを生成します。自分の個性を強みとして認識し、自分らしく生きることを応援します。（2）Face.ing: 顔の映像から心拍数、呼吸数等を測定し、ウェルビーイングの程度（心身が生き生きしているか）を可視化します。センサー等を取り付けることなく、スマートフォン等のカメラに向かうだけで簡単に測定することができます。",
      presenters: [],
    },
  };
}

class GetEventInfoFunction extends EventTimetableFunction {
  constructor() {
    super({
      name: "getEventInfo",
      description:
        "Get the event info of NTT DATA Foresight Day 2024, including the name, theme, venue, organizer, date, begin time, end time, fee, and currency.",
    });
  }

  async call({ parameters }) {
    return EventTimetableFunction.eventInfo;
  }

  async onAvatarTalk({ result, document }) {}
}
export const getEventInfoFunction = new GetEventInfoFunction();

class GetSessionInfoByPresenterFunction extends EventTimetableFunction {
  constructor() {
    super({
      name: "getSessionInfoByPresenter",
      description:
        "Get the title, begin time, end time, abstract, and all presenters of the session(s) by the given presenter name.",
      parameters: [
        new Parameter({
          name: "name",
          type: "string",
          description:
            "The name of the presenter for which the session is to be retrieved.",
          required: true,
        }),
      ],
    });
  }

  async call({ parameters }) {
    var retValue = {};
    for (var key in EventTimetableFunction.timeTable) {
      var session = EventTimetableFunction.timeTable[key];
      if (
        session.presenters &&
        session.presenters.some((presenter) =>
          presenter.name.includes(parameters.name)
        )
      ) {
        retValue[key] = {
          title: session.title,
          begin: session.begin,
          end: session.end,
          abstract: session.abstract,
          presenters: session.presenters,
        };
      }
    }
    return retValue;
  }
}
export const getSessionInfoByPresenterFunction =
  new GetSessionInfoByPresenterFunction();

class GetSessionInfoByKeywordFunction extends EventTimetableFunction {
  constructor() {
    super({
      name: "getSessionInfoByTopicFunction",
      description:
        "Get the title, begin time, end time, abstract, and all presenters of the session(s) by the given keyword.",
      parameters: [
        new Parameter({
          name: "keyword",
          type: "string",
          description: "The keyword for which the session is to be retrieved.",
          required: true,
        }),
      ],
    });
  }

  async call({ parameters }) {
    var retValue = {};
    for (var key in EventTimetableFunction.timeTable) {
      var session = EventTimetableFunction.timeTable[key];
      if (
        session.title.includes(parameters.keyword) ||
        session.abstract.includes(parameters.keyword) ||
        ("keywords" in session && session.keywords.includes(parameters.keyword))
      ) {
        retValue[key] = {
          title: session.title,
          begin: session.begin,
          end: session.end,
          abstract: session.abstract,
          presenters: session.presenters,
        };
      }
    }
    return retValue;
  }
}
export const getSessionInfoByKeywordFunction =
  new GetSessionInfoByKeywordFunction();

class GetRecommendedSessionsFunction extends ChatGPTFunction {
  constructor() {
    super({
      name: "getRecommendedSessionsFunction",
      description:
        "Get the title, begin time, end time, abstract, and all presenters of the recommended session(s).",
      parameters: [
        new ArrayParameter({
          name: "keywords",
          type: "string",
          description:
            "The keywords for which the sessions are to be retrieved.",
          required: true,
        }),
      ],
      prompt: new Prompt({
        messages: [
          {
            role: "system",
            content: `You are the recommendation system for the event sessions. Please suggest some recommended sessions and/or exhibits that I can join at the current time from the below timetable.`,
          },
        ],
        maxTokens: 1024,
      }),
      apiKey: apiKeys.openai,
      failedMessage: "Error: ChatGPT Request Failed",
    });
  }

  static outputFormat = {
    "Name of the recommended session 1": {
      title: "Title of the session 1",
      begin: "Begin time of the session 1",
      end: "End time of the session 1",
      presenters: [
        {
          name: "Name of the presenter 1",
          affiliation: "Affiliation of the presenter 1",
          title: "Affiliation of the presenter 1",
        },
        {
          name: "Name of the presenter 2, after this any number of presenters can be added",
          affiliation: "Affiliation of the presenter 2",
          title: "Affiliation of the presenter 2",
        },
      ],
    },
    "Session 2 name": {
      title:
        "Title of the session 2, after this any number of sessions can be added",
      begin: "Begin time of the session 2",
      end: "End time of the session 2",
      presenters: [
        {
          name: "Name of the presenter 1",
          affiliation: "Affiliation of the presenter 1",
          title: "Affiliation of the presenter 1",
        },
        {
          name: "Name of the presenter 2, after this any number of presenters can be added",
          affiliation: "Affiliation of the presenter 2",
          title: "Affiliation of the presenter 2",
        },
      ],
    },
  };

  async call({ parameters }) {
    // Deep copy the timetable.
    var summarizedTimeTable = {};
    for (var key in EventTimetableFunction.timeTable) {
      var session = EventTimetableFunction.timeTable[key];
      summarizedTimeTable[key] = {
        title: session.title,
        begin: session.begin,
        end: session.end,
        presenters: session.presenters,
      };
    }

    // Remove carrior from the presentors data in the summarizedTimeTable.
    for (var key in summarizedTimeTable) {
      if (summarizedTimeTable[key].presenters) {
        summarizedTimeTable[key].presenters.forEach((presenter) => {
          delete presenter.career;
        });
      }
    }

    // Add summarizedTimeTable to the system part of the prompt.
    this.prompt.messages[0].content += "\n\n";
    this.prompt.messages[0].content += JSON.stringify(
      summarizedTimeTable,
      null,
      2
    );

    this.prompt.messages[0].content += "\n\n";
    this.prompt.messages[0].content += `The output format is the following JSON format: ${JSON.stringify(
      GetRecommendedSessionsFunction.outputFormat,
      null,
      2
    )}`;

    var requestMessage = "";
    if (parameters.keywords && parameters.keywords.length > 0) {
      requestMessage += `I am interested in sessions related to ${parameters.keywords.join(
        ", "
      )}. `;
    } else {
      requestMessage += "I am interested in all sessions. ";
    }

    let date = new Date();
    let localDate = date.toLocaleString("en-US", { timeZone: "Asia/Tokyo" });
    requestMessage += `Please recommend some sessions that I can join at ${localDate}.`;
    this.prompt.messages.push({
      role: "user",
      content: requestMessage,
    });
    var jsonData = await this.fetch();
    // Find the first '{' and the last '}' to extract the JSON data.
    var firstBracket = jsonData.indexOf("{");
    var lastBracket = jsonData.lastIndexOf("}");
    if (firstBracket == -1 || lastBracket == -1) {
      jsonData = "{}";
    } else {
      jsonData = jsonData.substring(firstBracket, lastBracket + 1);
    }
    var retValue = JSON.parse(jsonData);

    // Add abstract to the output from the timetable.
    for (var key in retValue) {
      if (key in EventTimetableFunction.timeTable) {
        retValue[key].abstract = EventTimetableFunction.timeTable[key].abstract;
      }
    }

    return retValue;
  }
}
export const getRecommendedSessionsFunction =
  new GetRecommendedSessionsFunction();
