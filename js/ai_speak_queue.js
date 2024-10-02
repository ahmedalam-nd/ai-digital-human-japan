import { Util } from "./util.js";

export class AISpeakQueue {
  constructor({ document, scene, character }) {
    this.document = document;
    this.queue = [];
    this.scene = scene;
    this.character = character;
    this.waitingTimerId = null;
  }

  document;
  queue;
  scene;
  character;
  waitingTimerId;

  initialize({ scene, character }) {
    this.scene = scene;
    this.character = character;
    this.clear();
  }

  isNotInitialized() {
    return this.scene == null || this.character == null;
  }

  isDifferent({ scene, character }) {
    return this.isNotInitialized() && scene != null && character != null;
  }

  push({ scene, character, text, waiting }) {
    if (this.isDifferent({ scene: scene, character: character })) {
      return;
    }
    this.queue.push({
      scene: scene,
      character: character,
      text: text,
      waiting: waiting,
    });
    if (!this.isSpeaking()) {
      this.activate();
    }
  }

  activate() {
    let next = this.shift();
    if (
      !next ||
      this.isDifferent({ scene: next.scene, character: next.character })
    ) {
      return;
    }
    this._avatarTalk({
      scene: next.scene,
      character: next.character,
      characterText: next.text,
      waiting: next.waiting,
    });
  }

  inActivate({ waiting }) {
    if (!this.isEmpty()) {
      this.activate();
      return;
    }

    this.character.avatar.startIdleAnimation({
      document: this.document,
      avatar: this.character.avatar,
    });

    if (waiting) {
      if (this.waitingTimerId != null) {
        Util.showLoadingDots({ document: this.document });
        this.character.speechToText.speaking = false;
        this.character.speechToText.start();
        return;
      }
    }

    Util.clearMessageBox({ document: this.document });
    this.character.speechToText.speaking = false;
    this.character.speechToText.start();
  }

  shift() {
    return this.queue.shift();
  }

  clear() {
    Util.clearMessageBox({ document: this.document });
    this.clearWaitingTimer();
    this.queue = [];
    this.inActivate({ waiting: false });
  }

  isEmpty() {
    return this.queue.length == 0;
  }

  isSpeaking() {
    return this.character.speechToText.speaking;
  }

  startLoading({ scene, character }) {
    // If the scene or character is different, do not start loading.
    if (
      this.isDifferent({ scene: scene, character: character }) ||
      this.isSpeaking()
    ) {
      return;
    }

    this.clearWaitingTimer();
    // If the waiting fill is not enabled or the waiting fill percentage is not under the threshold, show loading dots.
    if (
      !this.character.waitingFillEnabled() ||
      !Util.isUnderPercentage({ percentage: character.waitingFillPercentage })
    ) {
      Util.showLoadingDots({ document: this.document });
      return;
    }

    if (this.isSpeaking()) {
      return;
    }

    Util.showLoadingDots({ document: this.document });
    this.waitingTimerId = setTimeout(() => {
      this.push({
        scene: scene,
        character: character,
        text: Util.getElementRandomly({
          list: character.waitingFillMessages,
        }),
        waiting: true,
      });
    }, character.waitingFillTime);
  }

  async _avatarTalk({ scene, character, characterText, waiting }) {
    if (
      characterText == null ||
      characterText == "" ||
      this.isDifferent({ scene: scene, character: character })
    ) {
      this.inActivate({ waiting: waiting });
      return;
    }

    characterText = await character.postProcessText({
      characterText: characterText,
      document: this.document,
      scene: scene,
    });

    if (!this.isSpeaking()) {
      character.avatar.startSpeechAnimation({ document: this.document });
    }
    character.speechToText.stop();
    character.speechToText.speaking = true;
    Util.showMessageBox({ document: this.document, message: characterText });
    character
      .speak({
        text: characterText,
        onSpeechEnd: () => {
          this.inActivate({ waiting: waiting });
        },
      })
      .catch((error) => {
        character.prompt.historyManager.recordError({
          sceneId: scene.sceneId,
          characterId: character.characterId,
          errorMessage: error.stack,
        });
      });
  }

  clearWaitingTimer() {
    if (this.waitingTimerId != null) {
      clearTimeout(this.waitingTimerId);
    }
    this.waitingTimerId = null;
  }
}
