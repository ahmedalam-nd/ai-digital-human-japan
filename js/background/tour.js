import { Util } from "../util.js";
export class Tour {
  constructor({ names, url, quotes, triggerWords = null }) {
    this.names = names;
    this.url = url;
    this.quotes = quotes;
    this.triggerWords = triggerWords;
  }
  names = "";
  url = "";
  quotes = {};
  triggerWords = null;

  getName({ language }) {
    return Util.getMapValue({ map: this.names, key: language });
  }

  getQuote({ language }) {
    if (this.quotes[language] != null) {
      return this.quotes[language];
    }
    var values = Object.values(this.quotes);
    if (values.length == 0) {
      return "";
    }
    return values[0];
  }
}
