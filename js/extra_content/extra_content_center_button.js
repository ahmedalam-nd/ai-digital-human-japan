import { ExtraContent } from "./extra_content.js";

export class ExtraContentCenterButton extends ExtraContent {
  constructor({ id, label, hidden = false, size = "", color = "", event }) {
    super({
      id: id,
      hidden: hidden,
      content: `<div id="${id}" class="columns is-centered${
        hidden ? " is-hidden" : ""
      }">
        <button id="button-${id}" class="is-centered
          ${size != "" ? " " + size : ""}
          ${color != "" ? " " + color : ""}">
        ${label}
      </button>
      </div>`,
    });

    this.label = label;
    this.initialLabel = label;
    this.size = size;
    this.color = color;
    this.event = event;
  }

  label;
  initialLabel;
  size;
  color;
  event;

  init() {
    super.init();
    this.label = this.initialLabel;

    if (this.document == null) {
      return;
    }
    const button = this.document.getElementById(`${this.id}`);
    if (button == null) {
      return;
    }
    button.innerHTML = this.label;
  }

  addEvent({ document }) {
    if (this.document == null) {
      this.document = document;
    }
    const button = this.document.getElementById(`button-${this.id}`);
    if (button == null) {
      return;
    }
    button.addEventListener("click", this.event);
  }

  changeLabel({ newLabel }) {
    this.label = newLabel;
    if (this.document == null) {
      return;
    }
    const button = this.document.getElementById(`button-${this.id}`);
    if (button == null) {
      return;
    }
    button.innerHTML = newLabel;
  }
}
