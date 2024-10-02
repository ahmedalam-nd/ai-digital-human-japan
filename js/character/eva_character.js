import { Character } from "./character.js";
import { Util } from "../util.js";
import { historyManager } from "../model/history_manager.js";

export class EvaCharacter extends Character {
  constructor({
    characterId,
    firstName,
    lastName,
    language,
    avatar,
    textToSpeech,
    speechToText,
    errorNotificationMessages,
    extraContents,
    waitingFillMessages,
    evaInfo,
  }) {
    super({
      characterId: characterId,
      firstName: firstName,
      lastName: lastName,
      language: language,
      avatar: avatar,
      textToSpeech: textToSpeech,
      speechToText: speechToText,
      errorNotificationMessages: errorNotificationMessages,
      extraContents: extraContents,
      waitingFillMessages: waitingFillMessages,
      prompt: null,
    });
    this.evaInfo = evaInfo;
    this.historyManager = historyManager;
  }

  evaInfo = {};
  historyManager;

  static AUTH_URL =
    "https://keycloak-americas-admin.eva.bot/auth/realms/EVA-INTELLILINK/protocol/openid-connect/token";

  init({ document }) {
    super.init({ document });
    this.historyManager.init();
    this.evaInfo.sessionCode = "";
  }

  async authEva() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("client_id", this.evaInfo.clientId);
    urlencoded.append("client_secret", this.evaInfo.clientSecret);
    urlencoded.append("grant_type", "client_credentials");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    return fetch(this.evaInfo.authUrl, requestOptions)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: Status: ${response.status} (Eva auth)`);
        }
        return await response.text();
      })
      .then((result) => {
        var data = JSON.parse(result);
        let token = data.access_token;
        return token;
      })
      .catch((error) => error);
  }

  async invokeMsg({ humanText, token, scene }) {
    const myHeaders = new Headers();
    myHeaders.append("API-KEY", this.evaInfo.apiKey);
    myHeaders.append("OS", "Windows");
    myHeaders.append("USER-REF", "postman");
    myHeaders.append("LOCALE", "en-US");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    let jsonData;
    let url;
    if (this.evaInfo.sessionCode === "") {
      jsonData = { code: "%EVA_WELCOME_MSG" };
      url = this.evaInfo.msgUrl;
    } else {
      jsonData = { text: humanText };
      url = `${this.evaInfo.msgUrl}/${this.evaInfo.sessionCode}`;
    }
    const raw = JSON.stringify(jsonData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    return fetch(url, requestOptions)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: Status(Eva auth): ${response.status} `);
        }
        return await response.json();
      })
      .catch((error) => {
        this.prompt.historyManager.recordError({
          sceneId: scene.sceneId,
          characterId: this.characterId,
          errorMessage: error.stack,
        });
        throw new Error(`Error in EvaCharacter.invokeMsg: ${error}`);
      })
      .then(async (result) => {
        if (!this.evaInfo.sessionCode) {
          this.evaInfo.sessionCode = result.sessionCode;
        }
        let textRes;
        for (const ans of result.answers) {
          //let ans = result.answers[i];
          if (ans.type === "IMAGE") {
            let imgUrl = ans.content;
            this.showImage(imgUrl);
          } else if (ans.type === "CAROUSEL") {
            console.log("CAROUSEL DETECTED.");
            await this.addCarouselCard(ans);
            this.initializeCarousel();
          } else if (ans.type === "TEXT" || ans.type === "TEXT_OPTIONS") {
            textRes = ans.content;
            if (ans.buttons.length !== 0) {
              this.makeButton(ans);
            }
            if (ans.technicalText !== null) {
              let productUrl;
              if (ans.technicalText.media === "image") {
                productUrl = ans.technicalText.productUrl;
                this.showImage(ans.technicalText.url, productUrl); // 画像表示関数と差し替える
              }
            }
          }
        }
        return this.removeEmoji({ input: textRes });
      })
      .catch((error) => {
        return this.errorHandling({
          errorMessage: Character.HTTP_ERROR_MESSAGE,
          historyManager: this.historyManager,
          sceneId: scene.sceneId,
          occurredFunction: "EvaCharacter.invokeMsg",
          error: error,
        });
      });
  }

  removeEmoji({ input }) {
    return input
      .replace(/\//g, "")
      .replace(/<p>/g, "")
      .replace(/[\p{Emoji}\p{Symbol}]/gu, "");
  }

  clearButtons() {
    this.extraContents[0].init();
  }

  async fetch({ humanText, apiKey, scene }) {
    this.clearButtons();
    let msg;
    let token = await this.authEva();
    if (token instanceof Error) {
      return this.errorHandling({
        errorMessage: Character.HTTP_ERROR_MESSAGE,
        historyManager: this.historyManager,
        sceneId: scene.sceneId,
        occurredFunction: "EvaCharacter.authEva",
        error: error,
      });
    }
    return await this.invokeMsg({
      humanText: humanText,
      token: token,
      scene: scene,
    });
  }

  showImage(imgUrl, productUrl = null) {
    Util.showModalDialog({
      document: document,
      title: "",
      content: `<p class="card-image has-text-centered">
        ${productUrl != null ? `<a href="${productUrl}" target="_blank">` : ""}
            <img src="${imgUrl}" alt="" />
        ${productUrl != null ? "</a>" : ""}
      </p>`,
    });
  }

  makeButton(answer) {
    this.extraContents[0].init();
    this.extraContents[0].addButtons({
      buttonsInfo: answer.buttons,
      callerCharacter: this,
    });
  }

  async addCarouselCard(carouselInfo) {
    var carouselContent = `<div class="container is-clipped">
      <div class="slider" id="evaCarousel">`;
    for (const content of carouselInfo.content) {
      var card = `<div class="card">
          <div class="card-image ">
            <figure class="image is-covered">
              <img src="${content.imageUrl}" alt="" class="evaCarouselImage" />
            </figure>
          </div>
          <div class="card-content">
            <div class="item__title">${content.title}</div>
            <div class="item__description">${content.subTitle}</div>
          </div>
        </div>`;
      carouselContent += card;
    }
    carouselContent += `</div></div>`;
    Util.showModalDialog({
      document: document,
      title: "",
      content: carouselContent,
    });
  }

  initializeCarousel() {
    Util.loadScript({
      document: document,
      src: "https://cdn.jsdelivr.net/npm/bulma-carousel@4.0.24/dist/js/bulma-carousel.min.js",
      defer: true,
    }).then(() => {
      bulmaCarousel.attach(".slider", {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        breakpoints: [
          { changePoint: 480, slidesToShow: 1, slidesToScroll: 1 },
          { changePoint: 640, slidesToShow: 2, slidesToScroll: 2 },
          { changePoint: 768, slidesToShow: 3, slidesToScroll: 3 },
        ],
      });
    });
  }

  preProcessText({ humanText, scene }) {
    this.historyManager.addMessage({
      sceneId: scene.sceneId,
      characterId: this.characterId,
      role: "user",
      content: humanText,
    });
    return humanText;
  }

  async postProcessText({ characterText, document, scene }) {
    // Error Detection and replace the characterText to the notification message
    for (let key in this.errorNotificationMessages) {
      if (characterText.includes(key)) {
        characterText = Util.getElementRandomly({
          list: this.errorNotificationMessages[key],
        });
        break;
      }
    }

    return this.avatar
      .updateSentiment({ message: characterText })
      .then(() => {
        this.historyManager.addMessage({
          sceneId: scene.sceneId,
          characterId: this.characterId,
          role: "assistant",
          content: characterText,
        });
        return characterText;
      })
      .catch((error) => {
        return this.errorHandling({
          errorMessage: Character.ERROR_TERMINATE_RESPONSE,
          historyManager: this.historyManager,
          sceneId: scene.sceneId,
          occurredFunction: "EvaCharacter.postProcessText",
          error: error,
        });
      });
  }
}
