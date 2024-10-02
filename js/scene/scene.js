import { Util } from "../util.js";
import { CharacterManager } from "../character/character_manager.js";
import { BackgroundManager } from "../background/background_manager.js";
import { LayoutManager } from "../layout/layout_manager.js";

export class Scene {
  constructor({
    sceneId,
    document = null,
    apiKeys,
    names,
    characterList,
    backgroundList,
    layoutList,
    defaultCharacterIndex = 0,
    defaultBackgroundIndex = 0,
    defaultLayoutIndex = 0,
  }) {
    this.sceneId = sceneId;
    this.apiKeys = apiKeys;
    this.names = names;

    this.characterManager = new CharacterManager({
      document: document,
      characterList: characterList,
      defaultCharacterIndex: defaultCharacterIndex,
    });
    let character = this.characterManager.getCurrentCharacter();
    this.backgroundManager = new BackgroundManager({
      document: document,
      backgroundList: backgroundList,
      language: character.language,
      defaultBackgroundIndex: defaultBackgroundIndex,
    });
    this.layoutManager = new LayoutManager({
      document: document,
      layoutList: layoutList,
      language: character.language,
      defaultLayoutIndex: defaultLayoutIndex,
    });
  }

  sceneId;
  apiKeys = {};
  names = {};
  characterManager = null;
  backgroundManager = null;
  layoutManager = null;

  getName({ language }) {
    return Util.getMapValue({ map: this.names, key: language });
  }

  setAsNewScene({ lastCharacter = null } = {}) {
    let character = this.characterManager.getCurrentCharacter();

    this.characterManager.updateCharacter({ lastCharacter: lastCharacter });
    this.characterManager.createCharacterList();

    this.backgroundManager.clearBackground();
    this.backgroundManager.updateBackground({ language: character.language });
    this.backgroundManager.createBackgroundList({
      language: character.language,
    });

    this.layoutManager.updateLayout();
    this.layoutManager.createLayoutList({ language: character.language });
  }

  setDocument({ document }) {
    this.characterManager.document = document;
    this.backgroundManager.document = document;
    this.layoutManager.document = document;
  }
}
