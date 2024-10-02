import { Firebase } from "./firebase.js";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { Util } from "../util.js";

class HistoryManager extends Firebase {
  constructor({ collectionName }) {
    super({ collectionName: collectionName });
    this.sessionId = Util.getNewSessionId();
  }

  static functionCallingRole = "function_call";

  sessionId;

  init() {
    this.sessionId = Util.getNewSessionId();
  }

  /* Data Model
    Root Collection ID: histories
    Document ID: Scene instance name: e.g., sceneAICEO
    Collection ID: Character instance name: e.g., characterSasaki_sv_SE
    Document ID: UTC Timestamp the session was started.
    Field: <UTC Timestamp by something said>_<user or bot>
    Content: The content of the chat history. Mostly the text data user or bot said.
  */

  /* Usage example:
    const historyManager = new HistoryManager("chatHistory");
    const sceneId = "sceneAICEO"; // Replace with the actual scene instance ID
    const characterId = "characterSasaki_sv_SE"; // Replace with the actual character instance ID
    historyManager.addMessage(sceneId, characterId, { text: "Hello, world!", timestamp: Date.now() });
    historyManager.listen(sceneId, characterId, (messages) => {
      console.log("Received updated messages:", messages);
    });
  */
  // Add a message to the collection
  async addMessage({
    sceneId,
    characterId,
    tool_call_id = null,
    role,
    name = null,
    content,
  }) {
    var timestamp = Util.getUtcNow();
    var record = {
      [timestamp]: {
        role: role,
        content: content,
      },
    };
    if (tool_call_id !== null) {
      record[timestamp].tool_call_id = tool_call_id;
    }
    if (name !== null) {
      record[timestamp].name = name;
    }
    try {
      await setDoc(
        doc(
          collection(
            doc(collection(Firebase.db, this.collectionName), sceneId),
            characterId
          ),
          this.sessionId
        ),
        record,
        { merge: true }
      );
    } catch (error) {
      console.log("Error adding message: ", error);
    }
  }

  // Record a function call
  recordFunctionCall({
    sceneId,
    characterId,
    functionIndex,
    functionName,
    parameters,
  }) {
    this.addMessage({
      sceneId: sceneId,
      characterId: characterId,
      tool_call_id: functionIndex,
      role: HistoryManager.functionCallingRole,
      name: functionName,
      content: parameters,
    });
  }

  // Record an exception
  recordError({ sceneId, characterId, errorMessage }) {
    this.addMessage({
      sceneId: sceneId,
      characterId: characterId,
      role: "error",
      content: errorMessage,
    });
  }

  // Get all messages regarding the session
  async getMessages({ sceneId, characterId, sessionId }) {
    this.sessionId = sessionId;
    try {
      const snapshot = await getDoc(
        collection(
          doc(collection(Firebase.db, this.collectionName), sceneId),
          characterId
        ),
        this.sessionId
      );
      const messages = snapshot.data();
      return messages;
    } catch (error) {
      this.recordError({
        sceneId: sceneId,
        characterId: characterId,
        errorMessage: error.stack,
      });
      console.log("Error getting messages: ", error);
      return [];
    }
  }

  listen({ sceneId, characterId, callback, sessionId }) {
    this.sessionId = sessionId;
    const docRef = doc(
      collection(
        doc(collection(Firebase.db, this.collectionName), sceneId),
        characterId
      ),
      this.sessionId
    );
    onSnapshot(docRef, (doc) => {
      callback(doc.data());
    });
  }
}

export const historyManager = new HistoryManager({
  collectionName: "histories",
});
