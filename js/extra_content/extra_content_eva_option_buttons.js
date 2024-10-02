import { ExtraContent } from "./extra_content.js";

export class EvaOptionButtons extends ExtraContent {
  constructor({ color = "is-link", styles = "is-rounded" }) {
    super({
      content: `<div id="evaButton"></div>`,
    });
    this.color = color;
    this.styles = styles;
  }

  color;
  styles;
  buttonsInfo;
  callerCharacter;

  init() {
    if (this.document == null) {
      return;
    }
    const evaButtons = this.document.getElementById("evaButton");
    if (evaButtons == null) {
      return;
    }
    // Remove evaButtons if it already exists
    evaButtons.innerHTML = "";
  }

  show() {
    if (this.document == null) {
      return;
    }
    const evaButtons = this.document.getElementById("evaButton");
    if (evaButtons == null) {
      return;
    }
    evaButtons.classList.remove("is-hidden");
  }

  addEvent({ document }) {
    // This shall be implemented to avoid Exception in the parent class.
  }

  addButtons({ buttonsInfo, callerCharacter }) {
    this.buttonsInfo = buttonsInfo;
    this.callerCharacter = callerCharacter;
    var buttonArea = this.document.getElementById("evaButton");
    var i = 0;
    for (var buttonInfo of buttonsInfo) {
      var buttonHtml = `<div class="column">
        <button id="evaButton${i}" class="button ${this.color} ${this.styles}">
          ${buttonInfo.name}
        </button>
      </div>`;
      if (buttonInfo.type === "URL") {
        if (buttonInfo.action == "") {
          continue;
        }
        buttonHtml = `<a href="${buttonInfo.action}" target="_blank">${buttonHtml}</a>`;
        buttonArea.innerHTML += buttonHtml;
      } else if (buttonInfo.type === "FLOW") {
        buttonArea.innerHTML += buttonHtml;
        var btn = this.document.getElementById(`evaButton${i}`);
        btn.addEventListener("click", function () {
          // TODO: Evaにflowの起動をリクエストする;
          callerCharacter.fetch(buttonInfo.value);
        });
      }
      i++;
    }
    buttonArea.innerHTML = `<div class="columns"> ${buttonArea.innerHTML} </div>`;
  }
}
