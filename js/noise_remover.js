export class NoiseRemover {
  constructor() {}

  static periodCharacter = {
    English: [".", "?", "!"],
    日本語: ["。", "？", "！"],
    Hindi: ["।", "?", "!"],
    Spanish: [".", "?", "!"],
    Swedish: [".", "?", "!"],
    Italian: [".", "?", "!"],
    German: [".", "?", "!"],
    French: [".", "?", "!"],
    Filipino: [".", "?", "!"],
    Thai: ["?", "!"],
    "中文 (簡体)": ["。", "？", "！"],
  };

  static noiseDict = {
    "**": "",
  };

  static isEndedPeriod({ language, text }) {
    let evalValue = text.slice(-1);
    for (var i = 0; i < NoiseRemover.periodCharacter[language].length; i++) {
      if (evalValue == NoiseRemover.periodCharacter[language][i]) {
        return true;
      }
    }
    return false;
  }

  static removeNoise({ text }) {
    text = text.replace(/(\r\n|\n|\r)/gm, " ");
    text = text.replace(/\s+/g, " ");
    for (var key in NoiseRemover.noiseDict) {
      text = text.replace(new RegExp(key, "g"), NoiseRemover.noiseDict[key]);
    }
    text = text.trim();
    return text;
  }
}
