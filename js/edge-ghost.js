import { Util } from "./util.js";
import { SceneManager } from "./scene/scene_manager.js";

import { sceneAINiceGuy } from "./scene/scene_ai_niceguy.js";
import { scene7andi } from "./scene/scene_ai_7andi.js";
import { sceneICA } from "./scene/scene_ica.js";
import { sceneAIRoleplay } from "./scene/scene_ai_roleplay.js";
import { sceneAIConcierge } from "./scene/scene_ai_concierge.js";
import { sceneMyAIFriend } from "./scene/scene_my_ai_friend.js";
import { sceneAICEO } from "./scene/scene_ai_ceo.js";
import { sceneVREstateTour } from "./scene/scene_vr_estate_tour.js";
import { sceneVRFurnitureTour } from "./scene/scene_vr_furniture_tour.js";
import { sceneVRTourEiji } from "./scene/scene_vr_tour_eiji.js";
import { sceneAISeto } from "./scene/scene_ai_seto.js";
import { sceneAIYoshida } from "./scene/scene_ai_yoshida.js";
import { sceneAIConciergeTB } from "./scene/scene_ai_concierge_tb.js";
import { SpeechToText } from "./speech_to_text/speech_to_text.js";
import { sceneSmartSpeaker } from "./scene/scene_smart_speaker.js";
import { sceneAISalesperson } from "./scene/scene_ai_salesperson.js";
import { AISpeakQueue } from "./ai_speak_queue.js";

export class EdgeGhost {
  constructor({ document, window }) {
    this.document = document;
    this.window = window;
    EdgeGhost.sceneManager = new SceneManager({
      document: document,
      sceneList: [
        sceneAINiceGuy,
        scene7andi,
        sceneICA,
        sceneAIRoleplay,
        sceneSmartSpeaker,
        sceneAIYoshida,
        sceneAIConciergeTB,
        sceneAISalesperson,
        sceneAIConcierge,
        sceneVRFurnitureTour,
        sceneMyAIFriend,
        sceneAICEO,
        sceneAISeto,
        sceneVRTourEiji,
        sceneVREstateTour,
      ],
      defaultSceneIndex: 8,
    });
    SpeechToText.onTextResult = EdgeGhost.callBackend;
    let scene = EdgeGhost.sceneManager.getCurrentScene();
    let character = scene.characterManager.getCurrentCharacter();
    EdgeGhost.aiSpeakQueue = new AISpeakQueue({
      document: document,
      scene: scene,
      character: character,
    });
    character.speechToText.start();
    this._registerEvents({ document: document });
  }

  static USER_INPUT_TEXTAREA_ID = "userinput_textarea";

  document;
  window;
  static aiSpeakQueue;

  changeCharacter({ index }) {
    var scene = EdgeGhost.sceneManager.getCurrentScene();
    scene.characterManager.changeCharacter({ index: index });
    var character = scene.characterManager.getCurrentCharacter();
    EdgeGhost.aiSpeakQueue.initialize({ scene: scene, character: character });

    var language = character.language;
    scene.backgroundManager.changeLanguage({ language: language });
    scene.layoutManager.createLayoutList({ language: language });

    EdgeGhost.sceneManager.createSceneList({
      language: language,
    });
  }

  changeBackground({ index }) {
    var scene = EdgeGhost.sceneManager.getCurrentScene();
    var character = scene.characterManager.getCurrentCharacter();
    var language = character.language;
    scene.backgroundManager.changeBackground({
      index: index,
      language: language,
    });
  }

  changeLayout({ index }) {
    EdgeGhost.sceneManager
      .getCurrentScene()
      .layoutManager.changeLayout({ index: index });
  }

  changeScene({ index }) {
    EdgeGhost.sceneManager.changeScene({ index: index });
    var scene = EdgeGhost.sceneManager.getCurrentScene();
    var character = scene.characterManager.getCurrentCharacter();
    EdgeGhost.aiSpeakQueue.initialize({ scene: scene, character: character });
  }

  // Getting Keyboard Input
  static userType() {
    let userText = document.getElementById(
      EdgeGhost.USER_INPUT_TEXTAREA_ID
    ).value;
    if (userText == "") {
      return;
    }
    document.getElementById(EdgeGhost.USER_INPUT_TEXTAREA_ID).value = "";
    EdgeGhost.callBackend({ humanText: userText });
  }

  startTourFromHTML({ index }) {
    EdgeGhost.startTour({ index: index });
  }

  static startTour({ index }) {
    var scene = EdgeGhost.sceneManager.getCurrentScene();

    scene.backgroundManager
      .getCurrentBackground()
      .changeTour({ document: document, index: index });
    var character = scene.characterManager.getCurrentCharacter();
    EdgeGhost.aiSpeakQueue.startLoading({ scene: scene, character: character });
    EdgeGhost.aiSpeakQueue.push({
      scene: scene,
      character: character,
      text: scene.backgroundManager
        .getCurrentBackground()
        .getCurrentTour()
        .getQuote({
          language: scene.characterManager.getCurrentCharacter().language,
        }),
      waiting: false,
    });
  }

  addBackgroundFraver({ preDataObjChatgpt }) {
    let returnVal = JSON.parse(JSON.stringify(preDataObjChatgpt));
    let character = EdgeGhost.sceneManager
      .getCurrentScene()
      .characterManager.getCurrentCharacter();
    returnVal.messages = JSON.parse(JSON.stringify(character.prompt.messages));
    returnVal.messages[0].content =
      preDataObjChatgpt.messages[0].content +
      " " +
      EdgeGhost.sceneManager
        .getCurrentScene()
        .backgroundManager.getCurrentBackground()
        .getPrompt({ language: character.language });
    return returnVal;
  }

  static callBackend({ humanText }) {
    if (document.getElementById(EdgeGhost.USER_INPUT_TEXTAREA_ID).disabled) {
      return;
    }
    let scene = EdgeGhost.sceneManager.getCurrentScene();
    let character = scene.characterManager.getCurrentCharacter();
    let language = character.language;
    let tourIndex = scene.backgroundManager
      .getCurrentBackground()
      .checkTourTrigger({ text: humanText, language: language });
    if (tourIndex >= 0) {
      EdgeGhost.startTour({ index: tourIndex });
      return;
    }
    EdgeGhost.aiSpeakQueue.startLoading({
      scene: scene,
      character: character,
    });
    humanText = character.preProcessText({
      humanText: humanText,
      scene: scene,
    });
    if (humanText == null || humanText == "") {
      return;
    }
    character
      .fetch({
        humanText: humanText,
        apiKey: scene.apiKeys.openai,
        scene: scene,
      })
      .then((respondedText) => {
        EdgeGhost.aiSpeakQueue.clearWaitingTimer();
        EdgeGhost.aiSpeakQueue.push({
          scene: scene,
          character: character,
          text: respondedText,
          waiting: false,
        });
      });
  }

  _registerEvents({ document }) {
    document.getElementById(EdgeGhost.USER_INPUT_TEXTAREA_ID).onkeypress =
      function (e) {
        if (!e) e = EdgeGhost.window.event;
        const keyCode = e.code || e.key;
        if (keyCode == "Enter") {
          EdgeGhost.userType();
          return false;
        }
      };

    const switchSound = document.getElementById("switchSound");
    switchSound.checked = true;
    switchSound.onchange = function () {
      if (!switchSound.checked) {
        document.getElementById("onOffSoundIcon").textContent = "volume_off";
      } else {
        document.getElementById("onOffSoundIcon").textContent = "volume_up";
      }

      EdgeGhost.sceneManager
        .getCurrentScene()
        .characterManager.getCurrentCharacter()
        .textToSpeech.setEnabled({
          value: switchSound.checked,
        });
    };

    const switchVoice = document.getElementById("switchVoice");
    switchVoice.checked = true;
    switchVoice.onchange = function () {
      if (!switchVoice.checked) {
        document.getElementById("onOffVoiceInputIcon").textContent = "mic_off";
      } else {
        document.getElementById("onOffVoiceInputIcon").textContent =
          "keyboard_voice";
      }
      EdgeGhost.sceneManager
        .getCurrentScene()
        .characterManager.getCurrentCharacter()
        .speechToText.setEnabled({ value: switchVoice.checked });
    };

    const switchMenu = document.getElementById("switchMenu");
    switchMenu.checked = true;
    switchMenu.onchange = function () {
      if (!switchMenu.checked) {
        document.getElementById("onOffSettingIcon").textContent =
          "filter_list_off";
      } else {
        document.getElementById("onOffSettingIcon").textContent = "filter_list";
      }

      const settingInput = document.getElementById("settingInput");
      if (settingInput.hidden) {
        settingInput.hidden = false;
      } else {
        settingInput.hidden = true;
      }

      const settingSwitches = document.getElementById("settingSwitches");
      if (settingSwitches.classList.contains("is-hidden")) {
        settingSwitches.classList.remove("is-hidden");
      } else {
        settingSwitches.classList.add("is-hidden");
      }
    };

    const switchText = document.getElementById("switchText");
    switchText.checked = true;
    switchText.onchange = function () {
      if (switchText.checked) {
        document.getElementById("onOffTextInputIcon").textContent = "subtitles";
      } else {
        document.getElementById("onOffTextInputIcon").textContent =
          "subtitles_off";
      }

      const userinput = document.getElementById("userinput");
      if (userinput.hidden) {
        userinput.hidden = false;
      } else {
        userinput.hidden = true;
      }
    };

    const switchResetData = document.getElementById("switchResetData");
    switchResetData.checked = true;
    switchResetData.onchange = function () {
      switchResetData.checked = false;
      Util.sleep({ ms: 300 }).then(() => {
        EdgeGhost.aiSpeakQueue.clear();
        var character = EdgeGhost.sceneManager
          .getCurrentScene()
          .characterManager.getCurrentCharacter();
        character.init({ document: document });
        switchResetData.checked = true;
      });
    };
  }
}
