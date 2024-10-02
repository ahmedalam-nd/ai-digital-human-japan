export var icasdk;
(() => {
  "use strict";
  var n = {
      d: (e, t) => {
        for (var o in t)
          n.o(t, o) &&
            !n.o(e, o) &&
            Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
      },
      o: (n, e) => Object.prototype.hasOwnProperty.call(n, e),
      r: (n) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(n, "__esModule", { value: !0 });
      },
    },
    e = {};
  n.r(e), n.d(e, { ICA: () => a, ICAWebSocket: () => t });
  var t = (function () {
    function n(n) {
      (this.url = n),
        (this._connection = null),
        (this._onConnectedCallbacks = function () {}),
        (this._onConnectionClosedCallbacks = function () {}),
        (this._onReceiveMsgCallback = function () {}),
        (this._onErrorCallback = function () {});
    }
    return (
      Object.defineProperty(n.prototype, "onConnected", {
        set: function (n) {
          this._onConnectedCallbacks = n;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(n.prototype, "onClose", {
        set: function (n) {
          this._onConnectionClosedCallbacks = n;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(n.prototype, "onError", {
        set: function (n) {
          this._onErrorCallback = n;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(n.prototype, "onReceiveMsg", {
        set: function (n) {
          this._onReceiveMsgCallback = n;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (n.prototype.connect = function () {
        this.__connect();
      }),
      (n.prototype.disconnect = function () {
        this._connection.close();
      }),
      (n.prototype.__connect = function () {
        var n = this;
        null != this._connection && this._connection.close(),
          (this._connection = new WebSocket(this.url)),
          (this._connection.onmessage = function (e) {
            n.__onReceiveMessage(e);
          }),
          (this._connection.onerror = function (n) {}),
          (this._connection.onopen = function (e) {
            n._onConnectedCallbacks();
          }),
          (this._connection.onclose = function (e) {
            n.__onConnectionClosed();
          }),
          (this._connection.onerror = function (e) {
            console.log("connection failed!"), n._onErrorCallback();
          });
      }),
      (n.prototype.send = function (n) {
        console.log(this._connection),
          console.log(this),
          this._connection.send(n);
      }),
      (n.prototype.__onReceiveMessage = function (n) {
        console.log(n);
        var e = n.data;
        this._onReceiveMsgCallback(e);
      }),
      (n.prototype.__onConnectionClosed = function () {
        this._onConnectionClosedCallbacks();
      }),
      n
    );
  })();
  function o() {
    var n = Date.now();
    return (
      "undefined" != typeof performance &&
        "function" == typeof performance.now &&
        (n += performance.now()),
      "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
        var t = (n + 16 * Math.random()) % 16 | 0;
        return (
          (n = Math.floor(n / 16)), ("x" === e ? t : (3 & t) | 8).toString(16)
        );
      })
    );
  }
  var i = (function () {
      function n(n) {
        (this.ip = "127.0.0.1"),
          (this.__websocket = void 0),
          (this.__videoElement = n),
          (this.__onConnected = function () {}),
          (this.__onDisconnected = function () {}),
          (this.__onConnectionError = function () {}),
          (this.__rtcConnection = void 0),
          (this.__onICACommand = function () {}),
          (this.__messageRequests = {});
      }
      return (
        (n.prototype.connect = function (n, e) {
          var o = "ws://" + n + ":" + e;
          (this.__websocket = new t(o)),
            (this.__websocket.onReceiveMsg = this.__RevSocketMsg.bind(this)),
            (this.__websocket.onConnected = function () {
              this.__websocket.send("Websocket Connected!!!!!"),
                this.__onConnected();
            }.bind(this)),
            (this.__websocket.onClose = this.__onDisconnected.bind(this)),
            (this.__websocket.onError = this.__OnWebSocketError.bind(this)),
            this.__websocket.connect();
        }),
        (n.prototype.disconnect = function () {
          this.__websocket.disconnect(),
            (this.__websocket = null),
            void 0 !== this.__rtcConnection &&
              (this.__rtcConnection.close(), (this.__rtcConnection = void 0));
        }),
        (n.prototype.__RevSocketMsg = function (n) {
          var e = JSON.parse(n);
          console.log(n), console.log(e);
          var t = e.kind,
            o = e.data;
          if ("webrtc" === t) this.__HandleWebRTCMsg(o);
          else if ("ica" === t) this.__HandleICAMsg(o);
          else if ("icaRespond" === t) {
            if (void 0 === e.id) return;
            const n = this.__messageRequests[e.id];
            if (void 0 === n) return;
            delete this.__messageRequests[e.id], n[0](o);
          } else if ("icaNoRespond" === t) {
            if (void 0 === e.id) return;
            if (void 0 === this.__messageRequests[e.id]) return;
            delete this.__messageRequests[e.id];
          }
        }),
        (n.prototype.__OnWebSocketError = function () {
          this.__onConnectionError();
        }),
        (n.prototype.__SendMsg = function (n) {
          this.__websocket.send(n);
        }),
        (n.prototype.SendCommand = function (n) {
          const e = o();
          return new Promise((t, o) => {
            (this.__messageRequests[e] = [t, o]),
              this.__websocket.send(
                JSON.stringify({ kind: "ica", id: e, data: n })
              );
          });
        }),
        (n.prototype.SendDirect = function (n) {
          this.__websocket.send(n);
        }),
        (n.prototype.SendGetConfig = function () {
          const n = o();
          return new Promise((e, t) => {
            (this.__messageRequests[n] = [e, t]),
              this.__websocket.send(
                JSON.stringify({ kind: "getConfig", id: n, data: {} })
              );
          });
        }),
        (n.prototype.SendConfig = function (n) {
          this.__websocket.send(JSON.stringify({ kind: "config", data: n }));
        }),
        (n.prototype.__HandleWebRTCMsg = function (n) {
          if (void 0 !== n) {
            var e = n.kind,
              t = n.data;
            if ("rtc" !== e) {
              if ("offer" === e) {
                var o = this;
                let n = t;
                this.__rtcConnection
                  .setRemoteDescription(n)
                  .then(function () {
                    return o.__rtcConnection.createAnswer();
                  })
                  .then(function (n) {
                    o.__rtcConnection.setLocalDescription(n);
                    const e = {
                      kind: "webrtc",
                      data: { kind: "answer", data: n },
                    };
                    o.__websocket.send(JSON.stringify(e));
                  })
                  .then(function () {}.bind(this))
                  .catch(this.__HandleRTCError.bind(this));
              } else if ("answer" === e)
                (o = this),
                  this.__rtcConnection
                    .setRemoteDescription(t)
                    .catch(this.__HandleRTCError.bind(this));
              else if ("icecandidate" === e) {
                console.log("Get ICE Data"),
                  console.log(data),
                  console.log("Adding candidate"),
                  (data = JSON.parse(data)),
                  console.log(data.sdpMLineIndex),
                  console.log(data.sdpMid);
                let n = new RTCIceCandidate({
                  candidate: data.candidate,
                  sdpMLineIndex: data.sdpMLineIndex,
                  sdpMid: data.sdpMid,
                });
                pc.addIceCandidate(n);
              }
            } else {
              (this.__rtcConnection = new RTCPeerConnection()),
                (this.__rtcConnection.onicecandidate =
                  this.__HandleICECandidate.bind(this)),
                (this.__rtcConnection.ontrack =
                  this.__HandleOnTrack.bind(this)),
                (this.__rtcConnection.onconnectionstatechange =
                  this.__HandleConnectionStateChange.bind(this)),
                (this.__rtcConnection.oniceconnectionstatechange =
                  this.__HandleICEConnectionStateChange.bind(this));
              const n = { kind: "webrtc", data: { kind: "ready", data: null } };
              this.__websocket.send(JSON.stringify(n));
            }
          }
        }),
        (n.prototype.__HandleRTCError = function (n) {}),
        (n.prototype.__HandleICECandidate = function (n) {
          const e = { type: "candidate", candidate: null };
          if (n.candidate) {
            console.log("On Candidate"),
              (e.candidate = n.candidate.candidate),
              (e.sdpMid = n.candidate.sdpMid),
              (e.sdpMLineIndex = n.candidate.sdpMLineIndex),
              console.log(n.candidate),
              console.log(JSON.stringify(n.candidate));
            {
              let e = n.candidate,
                t = {
                  kind: "webrtc",
                  data: {
                    kind: "icecandidate",
                    data: {
                      candidate: e.candidate,
                      address: e.address,
                      component: e.component,
                      foundation: e.foundation,
                      port: e.port,
                      priority: e.priority,
                      protocol: e.protocol,
                      relatedAddress: e.relatedAddress,
                      relatedPort: e.relatedPort,
                      sdpMLineIndex: e.sdpMLineIndex,
                      sdpMid: e.sdpMid,
                      tcpType: e.tcpType,
                      type: e.type,
                      usernameFragment: e.usernameFragment,
                    },
                  },
                };
              this.__SendMsg(JSON.stringify(t));
            }
          } else {
            let n = {
              kind: "webrtc",
              data: { kind: "icecandidate", data: null },
            };
            this.__SendMsg(JSON.stringify(n));
          }
        }),
        (n.prototype.__HandleOnTrack = function (n) {
          null != this.__videoElement &&
            (this.__videoElement.srcObject = n.streams[0]);
        }),
        (n.prototype.__HandleConnectionStateChange = function (n) {
          console.log(n);
        }),
        (n.prototype.__HandleICEConnectionStateChange = function (n) {}),
        (n.prototype.__HandleICAMsg = function (n) {
          null != this.__onICACommand && this.__onICACommand(n);
        }),
        Object.defineProperty(n.prototype, "onICACommand", {
          set: function (n) {
            this.__onICACommand = n;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "onConnected", {
          set: function (n) {
            this.__onConnected = n;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "onDisconnected", {
          set: function (n) {
            this.__onDisconnected = n;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "onConnectionError", {
          set: function (n) {
            this.__onConnectionError = n;
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(),
    s = (function () {
      function n() {
        (this.__session = void 0),
          (this.__onICAMessage = function (n) {}),
          (this.__onSpeakStart = function () {}),
          (this.__onSpeakCompleted = function () {});
      }
      return (
        (n.prototype.SetSession = function (n) {
          (this.__session = n),
            (this.__session.onICACommand = this.__OnMessage.bind(this));
        }),
        (n.prototype.__Send = function (n) {
          return void 0 === this.__session
            ? null
            : this.__session.SendCommand(n);
        }),
        (n.prototype.SendMessaging = function () {
          return this.__Send({ kind: "messaging", data: null });
        }),
        (n.prototype.SendSpeak = function (n) {
          var e = { kind: "speak", data: { text: n } };
          return this.__Send(e);
        }),
        (n.prototype.ArrayToBase64 = function (n) {
          const e = new Uint8Array(n.buffer),
            t = e.byteLength;
          let o = "";
          for (let n = 0; n < t; n++) o += String.fromCharCode(e[n]);
          return btoa(o);
        }),
        (n.prototype.SendVoice = function (n, e) {
          switch (e) {
            case "mp3":
              var t = {
                kind: "speakAudio",
                data: { format: "mp3", audio_data: n },
              };
              return this.__Send(t);
            case "wave":
              return (
                (t = {
                  kind: "speakAudio",
                  data: { format: "wave", audio_data: n },
                }),
                this.__Send(t)
              );
          }
        }),
        (n.prototype.SendSwitchState = function (n) {
          var e = { kind: "switchState", data: { state: n } };
          return this.__Send(e);
        }),
        (n.prototype.SendSwitchFaceProfile = function (n) {
          var e = { kind: "switchFaceProfile", data: { profileId: n } };
          return this.__Send(e);
        }),
        (n.prototype.SendPlayAnimation = function (n) {
          var e = { kind: "playAnimation", data: { animationId: n } };
          return this.__Send(e);
        }),
        (n.prototype.SendListPlayAnimationPool = function (n) {
          return this.__Send({ kind: "listPlayAnimationPool", data: {} });
        }),
        (n.prototype.SendPlayAnimationPool = function (n) {
          var e = { kind: "playAnimationPool", data: { poolId: n } };
          return this.__Send(e);
        }),
        (n.prototype.SendPlayBodyIdleAnimation = function (n) {
          var e = { kind: "playBodyIdleAnimation", data: { animationId: n } };
          return this.__Send(e);
        }),
        (n.prototype.SendPlayBodyPerformAnimation = function (n) {
          var e = {
            kind: "playBodyPerformAnimation",
            data: { animationId: n },
          };
          return this.__Send(e);
        }),
        (n.prototype.SendLookAt = function (n, e, t, o, i, s, a, r) {
          var c = {
            kind: "lookAt",
            data: {
              type: n,
              delayTime: e,
              durationTime: t,
              coordinates: o,
              loopTimes: i,
              random: s,
              backToFront: a,
              paramName: r,
            },
          };
          return this.__Send(c);
        }),
        (n.prototype.SendLookAtAssetList = function () {
          return this.__Send({ kind: "lookAtAssetList", data: {} });
        }),
        (n.prototype.SendListCamera = function () {
          return this.__Send({ kind: "listCamera", data: {} });
        }),
        (n.prototype.SendSwitchCamera = function (n) {
          var e = { kind: "switchCamera", data: { camera: n } };
          return this.__Send(e);
        }),
        (n.prototype.SendListAvatarFacialProfile = function () {
          return this.__Send({ kind: "listAvatarFacialProfile", data: {} });
        }),
        (n.prototype.SendUpdateAvatarFacialProfile = function (n) {
          var e = { kind: "updateAvatarFacialProfile", data: { name: n } };
          return this.__Send(e);
        }),
        (n.prototype.SendSetSpeakProfile = function (n) {
          var e = { kind: "SetSpeakProfile", data: { name: n } };
          return this.__Send(e);
        }),
        (n.prototype.SendSetSpeakProfileParameters = function (n, e) {
          var t = {
            kind: "SetSpeakProfileParameters",
            data: { name: n, parameters: e },
          };
          return this.__Send(t);
        }),
        (n.prototype.__OnMessage = function (n) {
          switch (n.kind) {
            case "AvatarSpeakStart":
              this.__onSpeakStart();
              break;
            case "AvatarSpeakCompleted":
              this.__onSpeakCompleted();
          }
          this.__onICAMessage(n);
        }),
        Object.defineProperty(n.prototype, "onICAMessage", {
          set: function (n) {
            this.__onICAMessage = n;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "onSpeakStart", {
          set: function (n) {
            this.__onSpeakStart = n;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "onSpeakCompleted", {
          set: function (n) {
            this.__onSpeakCompleted = n;
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(),
    a = (function () {
      function n(n) {
        (this.command = new s()),
          (this.__session = null),
          (this.__videoElement = n),
          (this.__onConnected = function () {}),
          (this.__onDisconnected = function () {}),
          (this.__onConnectionError = function () {});
      }
      return (
        (n.prototype.connect = function (n, e, t) {
          var o = {};
          void 0 !== t &&
            ((o.width = t.width),
            (o.height = t.height),
            (o.fps = t.fps),
            (o.bitrate = t.bitrate)),
            (this.__session = new i(this.__videoElement)),
            (this.__session.onConnected = function () {
              this.__session.SendConfig(o), this.__onConnected();
            }.bind(this)),
            (this.__session.onDisconnected = function () {
              this.__onDisconnected();
            }.bind(this)),
            (this.__session.onConnectionError = function () {
              this.__onConnectionError();
            }.bind(this)),
            this.__session.connect(n, e),
            this.command.SetSession(this.__session);
        }),
        (n.prototype.disconnect = function () {
          this.__session.disconnect(), (this.__session = null);
        }),
        (n.prototype.SetScreenStreamingSettings = function (n) {
          if (null == this.__session)
            return new Promise((n, e) => {
              n();
            });
          var e = {};
          void 0 !== n &&
            ((e.width = n.width),
            (e.height = n.height),
            (e.fps = n.fps),
            (e.bitrate = n.bitrate)),
            this.__session.SendConfig(e);
        }),
        (n.prototype.GetScreenStreamingStates = function () {
          return null == this.__session
            ? new Promise((n, e) => {
                n();
              })
            : this.__session.SendGetConfig();
        }),
        Object.defineProperty(n.prototype, "onConnected", {
          set: function (n) {
            this.__onConnected = n;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "onDisconnected", {
          set: function (n) {
            this.__onDisconnected = n;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "onConnectionError", {
          set: function (n) {
            this.__onConnectionError = n;
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })();
  icasdk = e;
})();
//# sourceMappingURL=icasdk.js.map
