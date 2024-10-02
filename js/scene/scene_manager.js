import { Util } from "../util.js";

export class SceneManager {
  constructor({ document, sceneList, defaultSceneIndex = 0 }) {
    SceneManager.document = document;
    this.sceneList = sceneList;
    for (let i = 0; i < this.sceneList.length; i++) {
      this.sceneList[i].setDocument({ document: document });
    }

    let index = 0;
    if (defaultSceneIndex >= 0 && defaultSceneIndex < sceneList.length) {
      index = defaultSceneIndex;
    }
    this.changeScene({ index: index });
  }
  static document = null;
  sceneList = [];
  sceneIndex = -1;
  static LIST_ID = "sceneList";

  changeScene({ index }) {
    if (index == this.sceneIndex) {
      return;
    }
    if (SceneManager.document == null) {
      return;
    }
    if (index < 0 || index >= this.sceneList.length) {
      return;
    }

    var lastCharacter =
      this.sceneIndex >= 0
        ? this.getCurrentScene().characterManager.getCurrentCharacter()
        : null;
    this.sceneIndex = index;
    this.getCurrentScene().setAsNewScene({ lastCharacter: lastCharacter });
    this.createSceneList({
      language:
        this.getCurrentScene().characterManager.getCurrentCharacter().language,
    });
  }

  getCurrentScene() {
    return this.sceneList[this.sceneIndex];
  }

  createSceneList({ language }) {
    if (SceneManager.document == null) {
      return;
    }
    let targetList = [];
    for (let i = 0; i < this.sceneList.length; i++) {
      targetList.push(this.sceneList[i].getName({ language: language }));
    }
    Util.createList({
      document: SceneManager.document,
      listId: SceneManager.LIST_ID,
      targetList: targetList,
      selectedIndex: this.sceneIndex,
    });
  }
}
