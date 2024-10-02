import { Avatar } from "./avatar.js";
import { Util } from "../util.js";

// This class can be used when you do not want to show any avatar.
export class NoAvatar extends Avatar {
  constructor() {
    super();
  }

  async updateSentiment({ message }) {}

  addAvatarContent({ document }) {}

  startIdleAnimation({ document, avatar }) {}

  startSpeechAnimation({ document }) {}
}
