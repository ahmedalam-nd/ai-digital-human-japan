import { Background } from "../background.js";
import { Tour } from "../tour.js";

export const backgroundIframeFactoryDigitalTwin = new Background({
  names: {
    English: "Fixture installation test against factory digital twin",
    日本語: "工場のデジタルツインに対する什器設置テスト",
    Hindi: "फैक्ट्री डिजिटल ट्विन के खिलाफ फिक्सचर स्थापना परीक्षण",
    Spanish:
      "Prueba de instalación de accesorios contra el gemelo digital de la fábrica",
    Italian:
      "Test di installazione dell'apparecchiatura contro il gemello digitale dell'impianto",
    German: "Test der Vorrichtungsmontage gegen die digitale Zwillingsfabrik",
    French:
      "Test d'installation de l'appareillage contre le jumeau numérique de l'usine",
  },
  url: "https://my.matterport.com/show/?m=N2eGhYenWMt&hl=1&vr=1&play=1",
  prompts: {
    English:
      "This is the factory digital twin. Let's walk around the virtual space and test the equipment installed in the virtual space in reality.",
    日本語:
      "工場のデジタルツインを使って、バーチャル空間に設置された設備を実際に歩き回ってテストしてみましょう。",
    Hindi:
      "यह फैक्ट्री डिजिटल ट्विन है। वर्चुअल स्पेस में स्थापित उपकरणों का परीक्षण करने के लिए वर्चुअल स्पेस में घूमें।",
    Spanish:
      "Este es el gemelo digital de la fábrica. Caminemos por el espacio virtual y probemos el equipo instalado en el espacio virtual en la realidad.",
    Italian:
      "Questo è il gemello digitale dell'impianto. Camminiamo intorno allo spazio virtuale e testiamo l'attrezzatura installata nello spazio virtuale nella realtà.",
    German:
      "Dies ist der digitale Zwillingsfabrik. Gehen wir durch den virtuellen Raum und testen wir die im virtuellen Raum installierte Ausrüstung in der Realität.",
    French:
      "Ceci est le jumeau numérique de l'usine. Marchons dans l'espace virtuel et testons l'équipement installé dans l'espace virtuel dans la réalité.",
  },
  type: "iframe",
  backdropFilter: "none",
  tourList: [
    new Tour({
      names: {
        English: "Floorplan",
        日本語: "フロアプラン",
        Hindi: "फ़्लोरप्लान",
        Spanish: "Plano de planta",
        Italian: "Piantina",
        German: "Grundriss",
        French: "Plan d'étage",
      },
      url: "https://my.matterport.com/show/?m=N2eGhYenWMt&hl=1&vr=1&play=1&sr=.72%2C-.17&ss=62&tag=hBq9hYDKei5&pin-pos=27.98%2C5.23%2C-6.08",
      prompts: {
        English: "You can see the floorplan of the factory here.",
        日本語: "ここで工場のフロアプランを見ることができます。",
        Hindi: "आप यहाँ फैक्ट्री का फ़्लोरप्लान देख सकते हैं।",
        Spanish: "Puede ver el plano de planta de la fábrica aquí.",
        Italian: "Puoi vedere la piantina della fabbrica qui.",
        German: "Sie können hier den Grundriss der Fabrik sehen.",
        French: "Vous pouvez voir le plan d'étage de l'usine ici.",
      },
    }),
    new Tour({
      names: {
        English: "Bacon Slicer",
        日本語: "ベーコンスライサー",
        Hindi: "बेकन स्लाइसर",
        Spanish: "Rebanador de tocino",
        Italian: "Affettatrice di pancetta",
        German: "Speckschneider",
        French: "Trancheuse à bacon",
      },
      url: "https://my.matterport.com/show/?m=N2eGhYenWMt&hl=1&vr=1&play=1&sr=-2.25%2C1.2&ss=80&tag=BjeqV32oXLr&pin-pos=3.58%2C1.32%2C-3.22",
      quotes: {
        English:
          "The machine can slice bacon rapidly and accurately. This machine would be one of the beginning processes in the bacon production process.",
        日本語:
          "ベーコンを素早く正確にスライスすることができる機械。この機械はベーコンの製造工程の最初の工程のひとつとなるでしょう。",
        Hindi:
          "यह मशीन बेकन को तेजी से और सटीकता से काट सकती है। यह मशीन बेकन उत्पादन प्रक्रिया में शुरुआती प्रक्रियाओं में से एक होगी।",
        Spanish:
          "La máquina puede cortar el tocino de forma rápida y precisa. Esta máquina sería uno de los procesos iniciales en el proceso de producción de tocino.",
        Italian:
          "La macchina può affettare il bacon in modo rapido e preciso. Questa macchina sarebbe uno dei processi iniziali nel processo di produzione del bacon.",
        German:
          "Die Maschine kann Speck schnell und präzise schneiden. Diese Maschine wäre einer der ersten Prozesse im Speckherstellungsprozess.",
        French:
          "La machine peut trancher le bacon rapidement et avec précision. Cette machine serait l'un des premiers processus du processus de production de bacon.",
      },
    }),
    new Tour({
      names: {
        English: "Multi Head Weigher",
        日本語: "マルチヘッド秤量機",
        Hindi: "मल्टी हेड वेइगर",
        Spanish: "Báscula de cabezales múltiples",
        Italian: "Bilancia a teste multiple",
        German: "Mehrkopfwaage",
        French: "Balance à têtes multiples",
      },
      url: "https://my.matterport.com/show/?m=N2eGhYenWMt&hl=1&vr=1&play=1&sr=-2.17%2C-1.35&ss=66&tag=i2RWsM67Vqc&pin-pos=37.08%2C1.46%2C-5.96",
      quotes: {
        English:
          "The machine can weigh bacon rapidly and accurately. This machine would be one of the final processes in the bacon production process.",
        日本語:
          "ベーコンを素早く正確に計量することができる機械。この機械はベーコンの製造工程の最終工程のひとつとなるでしょう。",
        Hindi:
          "यह मशीन बेकन को तेजी से और सटीकता से वजन कर सकती है। यह मशीन बेकन उत्पादन प्रक्रिया में अंतिम प्रक्रिया में से एक होगी।",
        Spanish:
          "La máquina puede pesar el tocino de forma rápida y precisa. Esta máquina sería uno de los procesos finales en el proceso de producción de tocino.",
        Italian:
          "La macchina può pesare il bacon in modo rapido e preciso. Questa macchina sarebbe uno dei processi finali nel processo di produzione del bacon.",
        German:
          "Die Maschine kann Speck schnell und präzise wiegen. Diese Maschine wäre einer der letzten Prozesse im Speckherstellungsprozess.",
        French:
          "La machine peut peser le bacon rapidement et avec précision. Cette machine serait l'un des derniers processus du processus de production de bacon.",
      },
    }),
  ],
});
