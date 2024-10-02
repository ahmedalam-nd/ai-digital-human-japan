import { Function } from "../function.js";
import { Parameter } from "../parameter.js";
import { apiKeys } from "../../apikeys.js";

export class GoogleSearchFunction extends Function {
  constructor({
    name,
    description,
    context, // Context ID given by Google Custom Search API Console
    failedMessage = null,
    noSearchResultsMessage = null,
  }) {
    super({
      name: name,
      description: description,
      parameters: [
        new Parameter({
          name: "query",
          type: "string",
          description:
            "The search query for the Google Search. This query will be passed directly to the Google Search to retrieve the search results.",
          required: true,
        }),
      ],
    });
    this.context = context;
    this.apiKey = apiKeys.google_custom_search;
    this.failedMessage = failedMessage;
    this.noSearchResultsMessage = noSearchResultsMessage;
  }

  static END_POINT_URL = "https://www.googleapis.com/customsearch/v1";
  context;
  apiKey;
  failedMessage;
  noSearchResultsMessage;

  async fetch({ query }) {
    return await fetch(
      `${GoogleSearchFunction.END_POINT_URL}?key=${this.apiKey}&cx=${
        this.context
      }&q=${encodeURIComponent(query)}`,
      {
        method: "GET",
      }
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: Status: ${response.status}`);
        }
        return await response.json();
      })
      .then((json) => {
        if (json.items == null || json.items.length == 0) {
          if (this.noSearchResultsMessage != null) {
            return this.noSearchResultsMessage;
          }
          return "No search results are found.";
        }
        return json.items;
      })
      .catch((error) => {
        if (this.failedMessage != null) {
          return this.failedMessage;
        }
        // From this object historyManager is not accessible, so the exception is thrown with the error message.
        throw new Error(`Error in ChatGPTFunction.fetch: ${error}`);
      });
  }

  async call({ parameters }) {
    if (parameters.query == null) {
      throw new Error("GoogleSearchFunction.call: query is not provided.");
    }
    var retValue = await this.fetch({ query: parameters.query });
    return retValue;
  }
}
