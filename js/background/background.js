import { Util } from "../util.js";

export class Background {
  constructor({
    names,
    url = null,
    prompts,
    type,
    backdropFilter = "none",
    tourList = [],
    tourTriggerWords = null,
  }) {
    this.names = names;
    this.url = url;
    this.prompts = prompts;
    this.type = type;
    this.backdropFilter = backdropFilter;
    this.tourList = tourList;
    if (tourTriggerWords != null) {
      this.tourTriggerWords = tourTriggerWords;
    } else {
      this.tourTriggerWords = Background.defaultTourTriggerWords;
    }
  }
  names = "";
  url = null;
  prompts = "";
  type = "";
  backdropFilter = "none";
  tourList = [];
  tourIndex = -1;
  static LIST_ID = "tourList";
  static defaultTourTriggerWords = {
    English: "move to",
    日本語: "移動して",
    Hindi: "इसे ले जाएं",
    Spanish: "mover a",
    Italian: "spostare a",
    German: "bewegen zu",
    French: "déplacer à",
    Filipino: "lumipat sa",
    Thai: "ย้ายไป",
    "中文 (簡体)": "搬到",
  };
  static tourAvailableWords = {
    English: "Tour Available",
    日本語: "ツアーが利用可能です",
    Hindi: "टूर उपलब्ध है",
    Spanish: "Tour disponible",
    Italian: "Tour disponibile",
    German: "Tour verfügbar",
    French: "Visite disponible",
    Filipino: "Available ang paglilibot",
    Thai: "มีทัวร์",
    "中文 (簡体)": "提供旅游服务",
  };
  static tourNotAvailableWords = {
    English: "Tour Not Available",
    日本語: "ツアーは利用できません",
    Hindi: "टूर उपलब्ध नहीं है",
    Spanish: "Tour no disponible",
    Italian: "Tour non disponibile",
    German: "Tour nicht verfügbar",
    French: "Visite non disponible",
    Filipino: "Hindi Available ang Tour",
    Thai: "ทัวร์ไม่มีให้บริการ",
    "中文 (簡体)": "旅游不可用",
  };

  getName({ language }) {
    return Util.getMapValue({ map: this.names, key: language });
  }

  getPrompt({ language }) {
    if (this.prompts[language] != null) {
      return this.prompts[language];
    }
    var values = Object.values(this.prompts);
    if (values.length == 0) {
      return "";
    }
    return values[0];
  }

  changeTour({ document, index }) {
    if (
      document == null ||
      index == this.tourIndex ||
      index < 0 ||
      index >= this.tourList.length
    ) {
      return;
    }
    this.tourIndex = index;
    document
      .getElementById("avatar_background_iframe")
      .setAttribute("src", this.tourList[this.tourIndex].url);
  }

  createTourList({ document, language = "English" }) {
    if (document == null) {
      return;
    }
    let targetList = [];
    for (let i = 0; i < this.tourList.length; i++) {
      targetList.push(this.tourList[i].getName({ language: language }));
    }
    Util.createList({
      document: document,
      listId: Background.LIST_ID,
      targetList: targetList,
      availableCaption: Background.tourAvailableWords[language],
      unavailableCaption: Background.tourNotAvailableWords[language],
    });
  }

  getCurrentTour() {
    return this.tourList[this.tourIndex];
  }

  checkTourTrigger({ text, language = "English" }) {
    for (var i = 0; i < this.tourList.length; i++) {
      var tour = this.tourList[i];
      var triggerWord;
      if (tour.triggerWords == null || tour.triggerWords[language] == null) {
        triggerWord = this.tourTriggerWords[language];
      } else {
        triggerWord = tour.triggerWords[language];
      }
      if (text.includes(triggerWord)) {
        if (
          text
            .toLowerCase()
            .includes(tour.getName({ language: language }).toLowerCase())
        ) {
          return i;
        }
      }
    }
    return -1;
  }
}
