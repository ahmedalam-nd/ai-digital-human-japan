import { ExtraContent } from "../../extra_content/extra_content.js";
import { EdgeGhost } from "../../edge-ghost.js";

export class ExtraContentFileUploadDemo extends ExtraContent {
  constructor({
    fileSelectionLabel = "Choose a file…",
    fileSubmitLabel = "Submit",
  }) {
    super({
      id: "file-upload",
      hidden: true,
      content: `<div id="file-upload" class="columns is-vcentered">
      <div class="column">
        <div class="file is-boxed is-info">
          <label class="file-label">
            <input class="file-input" type="file" name="resume" />
            <span class="file-cta">
              <span class="file-icon"><i id="fileUploadIcon" class="material-icons has-text-white">description</i></span>
              <span class="file-label-text">${fileSelectionLabel}</span>
            </span>
          </label>
        </div>
      </div>
      <div class="column">
        <button class="button is-info is-hidden">
          <span class="file-submit-icon"><i id="fileSubmitIcon" class="material-icons has-text-white">upload</i></span>
          <span class="file-submit-text">${fileSubmitLabel}</span>
        </button>
      </div>
    </div>
    <progress class="progress is-large is-info is-hidden" max="100"></progress>`,
    });
    this.fileSelectionLabel = fileSelectionLabel;
    this.fileSubmitLabel = fileSubmitLabel;
  }

  fileSelectionLabel;
  fileSubmitLabel;
  timeoutId = null;

  init() {
    if (this.document == null) {
      return;
    }
    let fileInput = document.querySelector(".file-input");
    let fileUploadIcon = document.querySelector("#fileUploadIcon");
    let fileLabelText = document.querySelector(".file-label-text");
    let fileSubmitButton = document.querySelector(".button");
    let progress = document.querySelector(".progress");

    fileInput.disabled = false;
    fileInput.value = "";
    fileInput.files = null;

    fileUploadIcon.innerHTML = "description";
    fileLabelText.innerHTML = this.fileSelectionLabel;

    fileSubmitButton.classList.add("is-hidden");
    fileSubmitButton.disabled = false;

    progress.classList.add("is-hidden");

    if (this.timeoutId != null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  addEvent({ document }) {
    let fileInput = document.querySelector(".file-input");
    let fileUploadIcon = document.querySelector("#fileUploadIcon");
    let fileLabelText = document.querySelector(".file-label-text");
    let fileSubmitButton = document.querySelector(".button");
    let progress = document.querySelector(".progress");
    let fileSelectionLabel = this.fileSelectionLabel;

    fileInput.onchange = function () {
      if (fileInput.files.length > 0) {
        fileUploadIcon.innerHTML = "task";
        fileLabelText.innerHTML = fileInput.files[0].name;
        fileSubmitButton.classList.remove("is-hidden");
      }
    };

    fileSubmitButton.onclick = function () {
      fileInput.disabled = true;
      fileSubmitButton.disabled = true;
      progress.classList.remove("is-hidden");

      if (this.timeoutId != null) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
      this.timeoutId = setTimeout(function () {
        progress.classList.add("is-hidden");

        var fileName = fileLabelText.innerHTML;
        EdgeGhost.callBackend({
          humanText: `稟議書 ${fileName} について、各観点に基づいて内容を詳細にレビューし、欠点や問題点のみを各観点毎に文章で教えてください。`,
        });

        // Clear the file input
        fileInput.disabled = false;
        fileInput.value = "";
        fileInput.files = null;

        fileUploadIcon.innerHTML = "description";

        fileLabelText.innerHTML = fileSelectionLabel;

        fileSubmitButton.classList.add("is-hidden");
        fileSubmitButton.disabled = false;
      }, 5000);
    };
  }
}
