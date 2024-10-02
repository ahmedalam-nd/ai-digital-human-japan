import { Util } from "../util.js";
import { ExtraContent } from "../extra_content/extra_content.js";

export class CharacterManager {
  constructor({ document = null, characterList, defaultCharacterIndex = 0 }) {
    this.document = document;
    this.characterList = characterList;
    if (
      defaultCharacterIndex < 0 ||
      defaultCharacterIndex >= characterList.length
    ) {
      defaultCharacterIndex = Util.getIndexRandomly({
        list: this.characterList,
      });
    }
    this.changeCharacter({ index: defaultCharacterIndex });
    this.createCharacterList();
  }
  characterIndex = -1;
  document = null;
  static LIST_ID = "characterList";
  characterList = [];

  changeCharacter({ index }) {
    if (index == this.characterIndex) {
      return;
    }
    var lastCharacter = this.getCurrentCharacter();
    this.characterIndex = index;
    if (this.document == null) {
      return;
    }
    // Nothing happen, if the item is null because of the delimiter specified in the list.
    if (this.characterList[index] == null) {
      return;
    }
    this.updateCharacter({ lastCharacter: lastCharacter });
  }

  updateCharacter({ lastCharacter = null } = {}) {
    if (lastCharacter != null) {
      lastCharacter.textToSpeech.init();
      lastCharacter.speechToText.terminate();
      lastCharacter.avatar.removeAvatarContent({ document: this.document });
    }

    Util.clearMessageBox({ document: this.document });
    ExtraContent.removeContent({ document: this.document });
    this.getCurrentCharacter().addContent({ document: this.document });
    if (lastCharacter != null) {
      this.getCurrentCharacter().speechToText.init({
        enabled: lastCharacter.speechToText.enabled,
      });
      this.getCurrentCharacter().textToSpeech.init({
        enabled: lastCharacter.textToSpeech.enabled,
      });
    } else {
      this.getCurrentCharacter().speechToText.init();
      this.getCurrentCharacter().textToSpeech.init();
    }
  }

  createCharacterList() {
    if (this.document == null) {
      return;
    }
    let targetList = [];
    for (let i = 0; i < this.characterList.length; i++) {
      targetList.push(this.characterList[i].getCharacterLabel());
    }

    Util.createList({
      document: this.document,
      listId: CharacterManager.LIST_ID,
      targetList: targetList,
      selectedIndex: this.characterIndex,
    });
  }

  getCurrentCharacter() {
    return this.characterList[this.characterIndex];
  }
}
