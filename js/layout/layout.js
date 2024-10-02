import { Util } from "../util.js";
export class Layout {
  constructor({ names, ids, classname }) {
    this.names = names;
    this.ids = ids;
    this.classname = classname;
  }
  names = {};
  ids = [];
  classname = "";

  getName({ language }) {
    return Util.getMapValue({ map: this.names, key: language });
  }
}
