import { CharacterManager } from "../js/character/character_manager.js";
import { characterSasaki_ja_JP } from "../js/character/ai_ceo/character_sasaki_ja_JP.js";
import { characterSasaki_en_US } from "../js/character/ai_ceo/character_sasaki_en_US.js";
import { characterSasaki_es_ES } from "../js/character/ai_ceo/character_sasaki_es_ES.js";
import { characterSasaki_it_IT } from "../js/character/ai_ceo/character_sasaki_it_IT.js";
import { characterSasaki_de_DE } from "../js/character/ai_ceo/character_sasaki_de_DE.js";
import { characterSasaki_fr_FR } from "../js/character/ai_ceo/character_sasaki_fr_FR.js";

describe("test_character_manager", () => {
  var characterManager;

  beforeEach(async () => {
    characterManager = new CharacterManager({
      characterList: [
        characterSasaki_ja_JP,
        characterSasaki_en_US,
        characterSasaki_es_ES,
        characterSasaki_it_IT,
        characterSasaki_de_DE,
        characterSasaki_fr_FR,
      ],
    });
  });

  afterEach(() => { });

  test("CharacterManager.getCurrentCharacter()", async () => {
    characterManager.changeCharacter({ index: 0 });
    expect(
      characterManager.getCurrentCharacter().getFullName()).toEqual(
        "佐々木 裕"
      );
    characterManager.changeCharacter({ index: 1 });
    expect(
      characterManager.getCurrentCharacter().getFullName()).toEqual(
        "Yutaka Sasaki"
      );
  });
});
