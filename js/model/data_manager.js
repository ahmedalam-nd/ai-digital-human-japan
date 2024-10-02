import { Firebase } from "./firebase.js";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { historyManager } from "./history_manager.js";

export class DataManager extends Firebase {
  constructor({ collectionName }) {
    super({ collectionName: collectionName });
  }

  /* Data Model
    Root Collection ID: histories
    Document ID: Scene instance name: e.g., sceneAICEO
    Collection ID: Character instance name: e.g., characterSasaki_sv_SE
    Document ID: UTC Timestamp the session was started.
    dataName: The name of the data to be stored.
    content: The content of the data. JSON object can be stored as is.
  */
  async putData({ sceneId, characterId, dataName, content }) {
    try {
      await setDoc(
        doc(
          this.getCollection({ sceneId: sceneId, characterId: characterId }),
          dataName
        ),
        content,
        { merge: true }
      );
    } catch (error) {
      console.log("Error adding message: ", error);
    }
  }

  async getDataEntry({ sceneId, characterId, dataName }) {
    try {
      const snapshot = await getDoc(
        doc(Firebase.db, this.collectionName, sceneId, characterId, dataName)
      );
      const data = snapshot.data();
      return data;
    } catch (error) {
      historyManager.recordError({
        sceneId: sceneId,
        characterId: characterId,
        errorMessage: error.stack,
      });
      console.log("Error getting data: ", error);
      return [];
    }
  }

  getCollection({ sceneId, characterId }) {
    return collection(
      doc(collection(Firebase.db, this.collectionName), sceneId),
      characterId
    );
  }

  // Check if the data exists
  async exists({ sceneId, characterId, dataName }) {
    try {
      const snapshot = await getDoc(
        doc(Firebase.db, this.collectionName, sceneId, characterId, dataName)
      );
      return snapshot.exists();
    } catch (error) {
      historyManager.recordError({
        sceneId: sceneId,
        characterId: characterId,
        errorMessage: error.stack,
      });
      console.log("Error getting data: ", error);
      return false;
    }
  }

  listenData({ sceneId, characterId, callback, dataName }) {
    const docRef = doc(
      Firebase.db,
      this.collectionName,
      sceneId,
      characterId,
      dataName
    );
    onSnapshot(docRef, (doc) => {
      callback(doc.data());
    });
  }
}
