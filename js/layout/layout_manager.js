import { Util } from "../util.js";

export class LayoutManager {
  constructor({
    document = null,
    layoutList = [],
    language = "English",
    defaultLayoutIndex = 0,
  }) {
    this.document = document;
    this.layoutList = layoutList;
    this.createLayoutList({ language: language });
    if (
      defaultLayoutIndex >= 0 &&
      defaultLayoutIndex < this.layoutList.length
    ) {
      this.changeLayout({ index: defaultLayoutIndex });
    } else {
      this.changeLayout({
        index: Util.getIndexRandomly({ list: this.layoutList }),
      });
    }
  }

  document = null;
  layoutIndex = -1;
  static LIST_ID = "layoutList";

  layoutList = [];

  changeLayout({ index }) {
    if (index == this.layoutIndex) {
      return;
    }
    this.layoutIndex = index;
    if (this.document == null) {
      return;
    }
    this.updateLayout();
  }

  updateLayout() {
    for (let i in this.layoutList[this.layoutIndex].ids) {
      let element = this.document.getElementById(
        this.layoutList[this.layoutIndex].ids[i]
      );
      if (element != null) {
        element.className = this.layoutList[this.layoutIndex].classname;
      }
    }
  }

  createLayoutList({ language }) {
    if (this.document == null) {
      return;
    }
    let targetList = [];
    for (let i = 0; i < this.layoutList.length; i++) {
      targetList.push(this.layoutList[i].getName({ language: language }));
    }
    Util.createList({
      document: this.document,
      listId: LayoutManager.LIST_ID,
      targetList: targetList,
      selectedIndex: this.layoutIndex,
    });
  }

  getCurrentLayout() {
    return this.layoutList[this.layoutIndex];
  }
}
