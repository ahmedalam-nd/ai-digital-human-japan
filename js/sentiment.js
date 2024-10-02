// Sentiment	    Sample Values
// Clearly Positive "score": 0.8, "magnitude": 3.0
// Clearly Negative "score": -0.6, "magnitude": 4.0
// Neutral	        "score": 0.1, "magnitude": 0.0
// Mixed	        "score": 0.0, "magnitude": 4.0
export class Sentiment {
  constructor({ apiKey }) {
    this.apiKeyForSentimentAnalysis = apiKey;
  }
  score = 0.0;
  magnitude = 0.0;
  apiKeyForSentimentAnalysis = "";
  static MAX_SCORE = 1.0;
  static MIN_SCORE = -1.0;

  async analyze({ text }) {
    const url =
      "https://language.googleapis.com/v1/documents:analyzeSentiment?key=" +
      this.apiKeyForSentimentAnalysis;
    const data = {
      document: {
        type: "PLAIN_TEXT",
        content: text,
      },
      encodingType: "UTF8",
    };
    const otherparam = {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
      method: "POST",
    };
    return fetch(url, otherparam)
      .then((data) => {
        return data.json();
      })
      .catch((error) => {
        // From this object historyManager is not accessible, so the exception is thrown with the error message.
        throw new Error(
          `Error at fetch(url, otherparam) in SentimentAnalysis.analyze: ${error}`
        );
      })
      .then((parsed_json) => {
        this.score = parsed_json.documentSentiment.score;
        this.magnitude = parsed_json.documentSentiment.magnitude;
        return this.score;
      })
      .catch((error) => {
        // From this object historyManager is not accessible, so the exception is thrown with the error message.
        throw new Error(
          `Error at data.json() in SentimentAnalysis.analyze: ${error}`
        );
      });
  }
}
