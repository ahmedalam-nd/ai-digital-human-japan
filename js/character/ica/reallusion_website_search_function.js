import { GoogleSearchFunction } from "../../function/common_functions/google_search_function.js";

export class ReallusionWebsiteSearchFunction extends GoogleSearchFunction {
  constructor({
    context = "30d0a7cade93b42b3",
    target = "_blank",
    windowFeatures = "",
  }) {
    super({
      name: "ReallusionWebsiteSearch",
      description:
        "Search the Reallusion website about the questions about the Reallusion products. This function shall be called when the user asks about the Reallusion products including iClone, Character Creator, Cartoon Animator, ActorCore, and the plugins, market place, learning materials, and tutorials of those products.",
      context: context,
      failedMessage: "Failed to search the Reallusion website.",
      noSearchResultsMessage:
        "No search results are found on the Reallusion website.",
    });
    this.target = target;
    this.windowFeatures = windowFeatures;
  }

  target;
  windowFeatures;

  NUMBER_OF_SEARCH_RESULTS = 3;

  async call({ parameters }) {
    var items = await super.call({ parameters });
    if (items.length == undefined || items.length == 0) {
      return items;
    }
    var retValue = [];
    for (
      var i = 0;
      i < items.length ||
      ReallusionWebsiteSearchFunction.NUMBER_OF_SEARCH_RESULTS;
      i++
    ) {
      var item = items[i];
      var url = item.link;
      var title = item.title;
      var snippet = item.snippet;
      retValue.push({
        title: title,
        snippet: snippet,
        url: url,
      });
    }
    return retValue;
  }

  async onAvatarTalk({ result, document }) {
    if (result == null || result.length == 0 || document == null) {
      return;
    }
    const handle = window.open(result[0].url, this.target, this.windowFeatures);
    if (handle == null) {
      throw new Error("Failed to open the search result.");
    }
  }
}
