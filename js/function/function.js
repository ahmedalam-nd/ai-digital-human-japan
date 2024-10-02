export class Function {
  constructor({ name, description, parameters = [] }) {
    this.name = name;
    this.description = description;
    this.parameters = parameters;
  }
  name = "";
  description = "";
  parameters = [];
  result = null;
  callOnAvatarTalk = false;

  toJson() {
    var retValue = {
      name: this.name,
      description: this.description,
      required: [],
    };
    if (this.parameters.length > 0) {
      retValue.parameters = {
        type: "object",
        properties: {},
      };
      for (var i in this.parameters) {
        var name = this.parameters[i].name;
        retValue.parameters.properties[name] = this.parameters[i].toJson();
        if (this.parameters[i].required) {
          retValue.required.push(name);
        }
      }
    }
    return retValue;
  }

  async call({ parameters }) {
    // The function mock for the child class to override.
    this.functions[functionIndex].result = null; // Make sure to set the result by the end of the function.
  }

  // By calling this function from the child class, it can make sure the current modal if any will be hidden at first.
  async onAvatarTalk({ result, document }) {
    if (result == null || result.length == 0 || document == null) {
      return;
    }
    var modal = document.querySelector(".modal");
    modal.classList.remove("is-active");
    this.addCloseEventsToModal({ document: document });
  }

  addCloseEventsToModal({ document }) {
    document
      .getElementById("modal-card-footer-item2")
      .classList.add("is-hidden");
    document
      .getElementById("modal-card-footer-item3")
      .classList.add("is-hidden");
    (
      document.querySelectorAll(
        ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .card-footer-item"
      ) || []
    ).forEach(($close) => {
      const $target = $close.closest(".modal");
      $close.addEventListener("click", () => {
        $target.classList.remove("is-active");
      });
    });
  }
}
