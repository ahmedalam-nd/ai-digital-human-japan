import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  connectFirestoreEmulator,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { Util } from "../util.js";
import { apiKeys } from "../apikeys.js";

export class Firebase {
  constructor({ collectionName }) {
    if (Firebase.app == null || Firebase.db == null) {
      Firebase.app = initializeApp(apiKeys.firebaseConfig);
      Firebase.db = getFirestore(Firebase.app);

      // If the host is localhost, use the Firestore emulator
      if (Util.isLocalHost()) {
        connectFirestoreEmulator(Firebase.db, "localhost", 8080);
      }
    }
    this.collectionName = collectionName;
  }

  static app;
  static db;
  collectionName;

  async init() {}
}
