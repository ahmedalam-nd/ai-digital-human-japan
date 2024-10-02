import { Util } from "../util.js";
import { DataManager } from "./data_manager.js";
import { EventTimetableFunction } from "../character/ai_concierge/foresightday_2024_functions.js";
import { EventTimetableFunctionFirebase } from "../character/ai_concierge/foresightday_2024_functions_firebase.js";

export class Foresightday2024DataManager extends DataManager {
  constructor({ sceneId, characterId }) {
    super({ collectionName: "data" });
    this.sceneId = sceneId;
    this.characterId = characterId;
    this.init();
  }

  sceneId;
  characterId;

  init() {
    super.init();

    // If the host is localhost, put the timetable data to Firestore for testing
    if (Util.isLocalHost()) {
      this.exists({ dataName: "eventInfo" }).then((exists) => {
        if (!exists) {
          var eventInfo = EventTimetableFunction.eventInfo;
          eventInfo["order"] = 0;
          eventInfo["id"] = "eventInfo";
          this.putData({
            dataName: "eventInfo",
            content: eventInfo,
          });
          var i = 1;
          for (var key in EventTimetableFunction.timeTable) {
            var content = EventTimetableFunctionFirebase.timeTable[key];
            content["order"] = i;
            content["id"] = key;
            this.putData({
              dataName: `sessionInfo_${i++}`,
              content: content,
            });
          }
        }
      });
    }
  }

  /* Data Model
    Root Collection ID: histories
    Document ID: Scene instance name: e.g., sceneAICEO
    Collection ID: Character instance name: e.g., characterSasaki_sv_SE
    Document ID: UTC Timestamp the session was started.
    dataName: The name of the data to be stored.
    content: The content of the data. JSON object can be stored as is.
  */
  async putData({ dataName, content }) {
    super.putData({
      sceneId: this.sceneId,
      characterId: this.characterId,
      dataName: dataName,
      content: content,
    });
  }

  async getDataEntry({ dataName }) {
    return super.getDataEntry({
      sceneId: this.sceneId,
      characterId: this.characterId,
      dataName: dataName,
    });
  }

  async exists({ dataName }) {
    return super.exists({
      sceneId: this.sceneId,
      characterId: this.characterId,
      dataName: dataName,
    });
  }

  listenData({ callback, dataName }) {
    super.listenData({
      sceneId: this.sceneId,
      characterId: this.characterId,
      dataName: dataName,
      callback: callback,
    });
  }
}
