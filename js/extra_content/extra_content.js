export class ExtraContent {
  constructor({ id, content, hidden = false }) {
    this.id = id;
    this.content = content;
    this.hidden = hidden;
    this.initialHidden = hidden;
  }
  static EXTRA_CONTENT_TAG_ID = "extra-content";

  id;
  content;
  hidden;
  initialHidden;
  document = null;

  init() {
    this.hidden = this.initialHidden;
    if (this.hidden) {
      this.hide();
    } else {
      this.show();
    }
  }

  addContent({ document }) {
    this.document = document;
    let contentTag = document.getElementById(ExtraContent.EXTRA_CONTENT_TAG_ID);
    if (contentTag) {
      contentTag.innerHTML += this.content;
      this.addEvent({ document: document });
    }
  }

  addEvent({ document }) {
    // Nothing to do here, but can be overridden in subclasses.
  }

  show() {
    this.hidden = false;
    if (this.document == null) {
      return;
    }
    const contentHtml = this.document.getElementById(this.id);
    if (contentHtml == null) {
      return;
    }
    contentHtml.classList.remove("is-hidden");
  }

  hide() {
    this.hidden = true;
    if (this.document == null) {
      return;
    }
    const contentHtml = this.document.getElementById(this.id);
    if (contentHtml == null) {
      return;
    }
    contentHtml.classList.add("is-hidden");
  }

  static removeContent({ document }) {
    let contentTag = document.getElementById(ExtraContent.EXTRA_CONTENT_TAG_ID);
    if (contentTag) {
      contentTag.innerHTML = "";
    }
  }
}
