import { ExtraContent } from "./extra_content.js";

export class ExtraContentProgressbar extends ExtraContent {
  constructor({
    id,
    label,
    labelColor = "",
    valueLabel = "",
    max = 100,
    value = 0,
    hidden = false,
    size = "",
    color = "",
  }) {
    super({
      id: id,
      hidden: hidden,
      content: `<div id="${id}" class="columns is-centered${
        hidden ? " is-hidden" : ""
      }">
        <div class="column has-text-right has-text-weight-bold
        ${labelColor != "" ? " " + labelColor : ""}
        ">
          ${label}
        </div>
        <div class="column is-three-quarters">
          <progress class="progress
          ${size != "" ? " " + size : ""}
          ${color != "" ? " " + color : ""}" value="${value}" max="${max}">
            ${value / max}%
          </progress>
        </div>
        <div class="column has-text-left has-text-weight-bold
        ${labelColor != "" ? " " + labelColor : ""}
        ">
          ${valueLabel}
        </div>
      </div>`,
    });
    this.label = label;
    this.initialLabel = label;
    this.valueLabel = valueLabel;
    this.initialValueLabel = valueLabel;
    this.max = max;
    this.initialMax = max;
    this.value = value;
    this.initialValue = value;
    this.size = size;
    this.color = color;
  }

  label;
  initialLabel;
  valueLabel;
  initialValueLabel;
  max;
  initialMax;
  value;
  initialValue;
  size;
  color;

  init() {
    super.init();
    this.label = this.initialLabel;
    this.valueLabel = this.initialValueLabel;
    this.max = this.initialMax;
    this.value = this.initialValue;

    if (this.document == null) {
      return;
    }
    const progressbar = this.document.getElementById(this.id);
    if (progressbar == null) {
      return;
    }
    progressbar.querySelector("progress").value = this.value;
    progressbar.querySelector("progress").max = this.max;
    progressbar.querySelector("progress").innerHTML = `${
      this.value / this.max
    }%`;
    progressbar.querySelector(".has-text-left").innerHTML = this.valueLabel;
  }

  setValueInZeroMiddle({ value, valueLabel = "" }) {
    this.setValue({ value: value + this.max / 2, valueLabel: valueLabel });
  }

  setValue({ value, valueLabel = "" }) {
    if (this.document == null) {
      return;
    }
    const progressbar = this.document.getElementById(this.id);
    if (progressbar == null) {
      return;
    }
    this.value = value;
    progressbar.querySelector("progress").value = this.value;
    progressbar.querySelector("progress").innerHTML = `${
      this.value / this.max
    }%`;
    if (valueLabel != "") {
      this.valueLabel = valueLabel;
      progressbar.querySelector(".has-text-left").innerHTML = this.valueLabel;
    }
  }
}
