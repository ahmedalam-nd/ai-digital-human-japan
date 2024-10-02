import { EventTimetableFunction } from "./foresightday_2024_functions.js";
import { Parameter } from "../../function/parameter.js";
import { historyManager } from "../../model/history_manager.js";
import {
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export class EventTimetableFunctionFirebase extends EventTimetableFunction {
  constructor({ name, description, parameters, dataManager }) {
    super({
      name: name,
      description: description,
      parameters: parameters,
    });
    this.dataManager = dataManager;
  }
  dataManager;
}

export class GetEventInfoFunctionFirebase extends EventTimetableFunctionFirebase {
  constructor({ dataManager }) {
    super({
      name: "getEventInfo",
      description:
        "Get the event info of NTT DATA Foresight Day 2024, including the name, theme, venue, organizer, date, begin time, end time, fee, and currency.",
      dataManager: dataManager,
    });
  }

  async call({ parameters }) {
    var retValue;
    try {
      retValue = await this.dataManager.getDataEntry({ dataName: "eventInfo" });
    } catch (error) {
      historyManager.recordError({
        sceneId: this.dataManager.sceneId,
        characterId: this.dataManager.characterId,
        errorMessage: error.stack,
      });
      throw new Error(`Error in GetEventInfoFunctionFirebase.call: ${error}`);
    }
    return retValue;
  }

  async onAvatarTalk({ result, document }) {}
}

export class GetSessionInfoByPresenterFunctionFirebase extends EventTimetableFunctionFirebase {
  constructor({ dataManager }) {
    super({
      name: "getSessionInfoByPresenter",
      description:
        "Get the title, begin time, end time, abstract, and all presenters of the session(s) by the given presenter name.",
      parameters: [
        new Parameter({
          name: "name",
          type: "string",
          description:
            "The name of the presenter for which the session is to be retrieved.",
          required: true,
        }),
      ],
      dataManager: dataManager,
    });
  }

  async call({ parameters }) {
    const q = query(
      this.dataManager.getCollection({
        sceneId: this.dataManager.sceneId,
        characterId: this.dataManager.characterId,
      }),
      where("presentorNames", "array-contains", parameters.name)
    );

    var retValue = {};
    try {
      var querySnapshot = await getDocs(q);
      for (const doc of querySnapshot.docs) {
        retValue[doc.id] = doc.data();
      }
    } catch (error) {
      historyManager.recordError({
        sceneId: this.dataManager.sceneId,
        characterId: this.dataManager.characterId,
        errorMessage: error.stack,
      });
      throw new Error(`Error in GetEventInfoFunctionFirebase.call: ${error}`);
    }
    return retValue;
  }
}
export class GetSessionInfoByKeywordFunctionFirebase extends EventTimetableFunctionFirebase {
  constructor({ dataManager }) {
    super({
      name: "getSessionInfoByTopicFunction",
      description:
        "Get the title, begin time, end time, abstract, and all presenters of the session(s) by the given keyword.",
      parameters: [
        new Parameter({
          name: "keyword",
          type: "string",
          description: "The keyword for which the session is to be retrieved.",
          required: true,
        }),
      ],
      dataManager: dataManager,
    });
  }

  async call({ parameters }) {
    const q = query(
      this.dataManager.getCollection({
        sceneId: this.dataManager.sceneId,
        characterId: this.dataManager.characterId,
      }),
      where("keywords", "array-contains", parameters.keyword)
    );

    var retValue = {};
    try {
      var querySnapshot = await getDocs(q);
      for (const doc of querySnapshot.docs) {
        retValue[doc.id] = doc.data();
      }
    } catch (error) {
      historyManager.recordError({
        sceneId: this.dataManager.sceneId,
        characterId: this.dataManager.characterId,
        errorMessage: error.stack,
      });
      throw new Error(`Error in GetEventInfoFunctionFirebase.call: ${error}`);
    }
    return retValue;
  }
}
