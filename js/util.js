export class Util {
  constructor() {}

  static getRandomInt({ min, max }) {
    return Math.round(Math.random() * (max - min) + min);
  }

  static getIndexRandomly({ list }) {
    var index = Math.floor(Math.random() * list.length);
    return index;
  }

  static getDoubleRandomly({ min = 0.0, max = 1.0 } = {}) {
    return Math.random() * (max - min) + min;
  }

  static isUnderPercentage({ percentage }) {
    return Math.random() < percentage;
  }

  static getElementRandomly({ list }) {
    var index = Util.getIndexRandomly({ list: list });
    return list[index];
  }

  // Get a random key from the map.
  static getMapKeyRandomly({ map }) {
    let keys = Object.keys(map);
    return keys[Util.getIndexRandomly({ list: keys })];
  }

  static getMapValue({ map, key }) {
    if (map == null) {
      return "";
    }
    var values = Object.values(map);
    if (values.length == 0) {
      return "";
    }
    if (map[key] == null) {
      return values[0];
    }
    return map[key];
  }

  static createList({
    document,
    listId,
    targetList,
    selectedIndex = -1,
    availableCaption = null,
    unavailableCaption = null,
  }) {
    if (document == null) {
      return;
    }
    let targetListElement = document.getElementById(listId);
    targetListElement.disabled = true;
    targetListElement.innerHTML = "";

    let option = document.createElement("option");
    option.value = -1;
    if (targetList.length == 0) {
      if (unavailableCaption == null) {
        option.innerHTML = "No item available";
      } else {
        option.innerHTML = unavailableCaption;
      }
      targetListElement.appendChild(option);
      return;
    }

    if (availableCaption != null) {
      option.innerHTML = availableCaption;
      targetListElement.appendChild(option);
    }
    targetListElement.disabled = false;

    for (let i = 0; i < targetList.length; i++) {
      let option = document.createElement("option");
      option.value = i;
      option.innerHTML = targetList[i];
      if (i == selectedIndex) {
        option.selected = true;
      }
      targetListElement.appendChild(option);
    }
  }

  static clearMessageBox({ document }) {
    if (document == null) {
      return;
    }
    const messageBox = document.getElementById("message_box");
    if (messageBox == null) {
      return;
    }
    messageBox.remove();
  }

  static _getMessageBox({ document }) {
    var messsageBox = document.getElementById("message_box");
    if (messsageBox == null) {
      messsageBox = document
        .getElementById("message_box_template")
        .cloneNode(true);
      messsageBox.id = "message_box";
      messsageBox.style.display = "flex";
      const messageBoxContainer = document.getElementById(
        "message_box_container"
      );
      messageBoxContainer.innerHTML =
        messageBoxContainer.innerHTML + messsageBox.outerHTML;
    }
    return messsageBox;
  }

  // Add loading dots to chat flow.
  static showLoadingDots({ document }) {
    const messageBox = Util._getMessageBox({ document: document });
    messageBox.querySelector("#display_message").style.display = "none";
    messageBox.querySelector("#loading_dots").style.display = "block";
  }

  // Add other text to chat flow.
  static showMessageBox({ document, message }) {
    const messageBox = Util._getMessageBox({ document: document });
    messageBox.querySelector("#display_message").innerHTML = message;
    messageBox.querySelector("#display_message").style.display = "block";
    messageBox.querySelector("#loading_dots").style.display = "none";
  }

  static numberOfOverLapped({ array1, array2 }) {
    // make all elements unique and lowercase
    array1 = [...new Set(array1.map((value) => value.toLowerCase()))];
    array2 = [...new Set(array2.map((value) => value.toLowerCase()))];
    return array1.filter((value) => array2.includes(value)).length;
  }

  static sleep({ ms }) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static getHostName() {
    return location.hostname.split(":")[0];
  }

  static isLocalHost() {
    return (
      Util.getHostName() == "localhost" || Util.getHostName() == "127.0.0.1"
    );
  }

  static getUtcNow() {
    return Date.now();
  }

  static getRandomString({ length }) {
    var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from(Array(length))
      .map(() => S[Math.floor(Math.random() * S.length)])
      .join("");
  }

  static sessionKeyLength = 16;
  static getNewSessionId() {
    return `${Date.now()}_${Util.getRandomString({
      length: Util.sessionKeyLength,
    })}`;
  }

  static showModalDialog({
    document,
    title,
    content,
    showCloseButton = true,
    buttons = null,
  }) {
    var modal = document.querySelector(".modal");
    modal.classList.remove("is-active");
    Util.addCloseEventsToModal({ document: document });

    if (showCloseButton) {
      document
        .getElementById("modal-close-button")
        .classList.remove("is-hidden");
    } else {
      document.getElementById("modal-close-button").classList.add("is-hidden");
    }

    document
      .getElementById("modal-card-footer-item1")
      .classList.add("is-hidden");
    document
      .getElementById("modal-card-footer-item2")
      .classList.add("is-hidden");
    document
      .getElementById("modal-card-footer-item3")
      .classList.add("is-hidden");

    if (buttons == null) {
      document.getElementById("modal-card-footer-item1").innerHTML = "OK";
      document
        .getElementById("modal-card-footer-item1")
        .classList.remove("is-hidden");
    } else {
      var buttonKeys = Object.keys(buttons);
      if (buttonKeys.length > 0) {
        // Make key of the buttons map to the button text, and the value of the buttons map to the button event.
        var maxButtonCount = buttonKeys.length > 3 ? 3 : buttonKeys.length;
        for (let i = 0; i < maxButtonCount; i++) {
          var button = document.getElementById(
            `modal-card-footer-item${i + 1}`
          );
          button.innerHTML = buttonKeys[i];
          button.classList.remove("is-hidden");
          button.addEventListener("click", buttons[buttonKeys[i]]);
        }
      }
    }

    var modal_card = document.querySelector(".modal-card");
    modal_card.classList.add("is-80vw");

    // make modal_content
    document.querySelector(".modal-card-title").innerHTML = title;
    // Create the recommend table and
    var modal_content = document.querySelector(".modal-card-body-content");
    modal_content.innerHTML = content;

    // Show the modal and the content.
    modal.classList.add("is-active"); // Show the modal.
  }

  static closeModalDialog({ document }) {
    var modal = document.querySelector(".modal");
    modal.classList.remove("is-active");
  }

  static showLoadingModalDialog({ document, title, message }) {
    Util.showModalDialog({
      document: document,
      title: title,
      content: `<div class="content">
        <div class="block">${message}</div>
        <div class="block"><progress class="progress is-large is-info" max="100"></progress></div>
      </div>`,
      showCloseButton: false,
      buttons: {},
    });
  }

  static addCloseEventsToModal({ document }) {
    (
      document.querySelectorAll(
        ".modal-close, .modal-card-head .delete, .modal-card-foot .card-footer-item"
      ) || []
    ).forEach(($close) => {
      const $target = $close.closest(".modal");
      $close.addEventListener("click", () => {
        $target.classList.remove("is-active");
      });
    });
  }

  static async loadScript({ document, src, defer = true }) {
    await new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        return resolve("script already loaded.");
      }
      var script = document.createElement("script");
      script.defer = defer;
      script.src = src;
      script.onload = () => {
        return resolve("loaded successfully.");
      };
      script.onerror = () => {
        return reject("failed to load.");
      };
      document.head.appendChild(script);
    });
  }
}
