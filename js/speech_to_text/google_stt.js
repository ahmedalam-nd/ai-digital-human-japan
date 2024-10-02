import { SpeechToText } from "./speech_to_text.js";

export class GoogleSTT extends SpeechToText {
  constructor({ languageCode = "en", apiKey }) {
    super({ languageCode: languageCode });
    this.apiKey = apiKey;
    this.activated = false;
  }

  apiKey;
  recognizer;
  activated;

  stream;
  recorder;
  audioData;

  init({ enabled = null } = {}) {
    super.init({ enabled: enabled });
    this.activated = true;
  }

  // This method should be implemented in the child classes.
  start() {
    if (!this.activated) {
      return;
    }
    if (this.speaking) {
      return;
    }
    if (!this.enabled) {
      return;
    }

    navigator.mediaDevices
      .getUserMedia({
        audio: {
          echoCancellation: true,
          echoCancellationType: "system",
          noiseSuppression: false,
        },
      })
      .then((stream) => {
        this.stream = stream;
        this.recorder = new MediaRecorder(this.stream);
        this.runSpeechRecog(this, this.stream);

        this.recorder.ondataavailable = (e) => {
          this.audioData.push(e.data);
        };

        this.recorder.onstop = () => {
          const audioBlob = new Blob(this.audioData);
          let reader = new FileReader();
          var _this = this;
          reader.onload = function () {
            let result = new Uint8Array(reader.result);
            if (result.length === 0) {
              return;
            }
            let file = _this.arrayBufferToBase64(result);

            const content = {
              config: {
                language_code: _this.languageCode,
                sample_rate_hertz: 44100,
                encoding: "MP3",
                enable_automatic_punctuation: true,
                model: "default",
                enableWordTimeOffsets: false,
              },
              audio: { content: file },
            };
            fetch(
              "https://speech.googleapis.com/v1p1beta1/speech:recognize?key=" +
                _this.apiKey,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(content),
              }
            )
              .then(function (response) {
                return response.text();
              })
              .then(function (text) {
                const resultJson = JSON.parse(text);
                const transcript =
                  resultJson.results[0].alternatives[0].transcript;
                if (transcript != "") {
                  console.log(`Recognised: ${transcript}`);
                  SpeechToText.onTextResult.call(undefined, {
                    humanText: transcript,
                  });
                }
              })
              .catch(function (error) {
                console.log("Error: " + error);
              });
          };
          reader.readAsArrayBuffer(audioBlob);
        };
      });
  }

  // This method should be implemented in the child classes.
  stop() {
    if (this.recognizer) {
      this.recognizer.abort();
      this.recognizer.stop();
    }
    if (this.stream) {
      this.stream.getTracks()[0].stop();
    }
    if (this.recorder) {
      this.recorder.stop();
    }
  }

  // This method should be implemented in the child classes.
  terminate() {
    this.activated = false;

    this.stop();
    if (this.recognizer) {
      this.recognizer.onaudiostart = null;
      this.recognizer.onresult = null;
      this.recognizer.onend = null;
      delete this.recognizer;
    }

    if (this.stream) {
      this.stream.getTracks()[0].stop();
      delete this.stream;
    }

    if (this.recorder) {
      this.recorder.ondataavailable = null;
      this.recorder.onstop = null;
      delete this.recorder;
    }
  }

  runSpeechRecog(caller, stream) {
    if (!this.recognizer) {
      var SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition != null) {
        this.recognizer = new SpeechRecognition(stream);
      }
      this.recognizer.lang = this.languageCode;
    }

    if (!this.recognizer.onaudiostart) {
      this.recognizer.onaudiostart = function () {
        caller.startRecording();
      };
    }

    if (!this.recognizer.onresult) {
      this.recognizer.onresult = function (event) {
        var results = event.results;
        for (var i = event.resultIndex; i < results.length; i++) {
          if (!event.results[i].isFinal) continue;
          caller.stopRecording();
          caller.runSpeechRecog(caller, stream);
          return;
        }
      };
    }

    if (!this.recognizer.onend) {
      this.recognizer.onend = () => {
        if (this.speaking) {
          return;
        }
        this.start();
      };
    }
    try {
      this.recognizer.start();
    } catch (e) {
      console.log("Error: " + e);
    }
  }

  startRecording() {
    this.audioData = [];
    this.recorder.start();
  }

  stopRecording() {
    this.recorder.stop();
  }

  arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = new Float32Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
