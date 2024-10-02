"""Flask API script."""
from __future__ import annotations

from flask import Flask, Response, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.errorhandler(ValueError)
@app.errorhandler(KeyError)
def bad_request(err: Exception) -> tuple[Response, int]:
    """Bad request handler."""
    print("bad_request:", repr(err))  # noqa: T201
    if isinstance(err, KeyError):
        return jsonify({"error": "Missing input field"}), 400
    if isinstance(err, ValueError):
        return jsonify({"error": "Invalid data value"}), 400
    return jsonify({"error": str(err)}), 400


@app.route("/v1/match", methods=["GET", "POST"])
def post() -> Response:
    """This function handles the POST request."""
    json_data = request.get_json()
    print(json_data)  # noqa: T201
    flight = json_data["flight"]
    if (flight == "JL841"):
        result = {
            "num": 3,
            "recommend": [
                {
                    "children": 2,
                    "crowded": 2,
                    "female": 2,
                    "genre": "せんべい",
                    "id": 5,
                    "kana": "ばんかくそうほんぽセントレアめいひんかん",
                    "menu": 2,
                    "name": "坂角総本舖 セントレア銘品館",
                    "summary": "愛知県のお土産が買える店",
                    "takeout": 1
                },
                {
                    "children": 1,
                    "crowded": 1,
                    "female": 1,
                    "genre": "売店",
                    "id": 16,
                    "kana": "ジャルプラザちゅうぶくうこうちゅうおうゲートショップ",
                    "menu": 2,
                    "name": "JAL PLAZA 中部空港 中央ゲートショップ",
                    "summary": "フライト直前でも立ち寄れます",
                    "takeout": 1
                },
                {
                    "children": 2,
                    "crowded": 3,
                    "female": 1,
                    "genre": "せんべい",
                    "id": 7,
                    "kana": "えびせんべいのさとセントレアてん",
                    "menu": 2,
                    "name": "えびせんべいの里 セントレア店",
                    "summary": "えびせんべいのお土産店",
                    "takeout": 0
                }
            ]
        }
    elif (flight == "MU530"):
        result = {
            "num": 3,
            "recommend": [
                {
                    "children": 1,
                    "crowded": 2,
                    "female": 2,
                    "genre": "天ぷら",
                    "id": 15,
                    "kana": "てんぷらしもいっしきセントレアてん",
                    "menu": 2,
                    "name": "天ぷら 下の一色 セントレア店",
                    "summary": "空港価格でも比較的お手頃",
                    "takeout": 0
                },
                {
                    "children": 1,
                    "crowded": 3,
                    "female": 1,
                    "genre": "ハンバーガー",
                    "id": 3,
                    "kana": "フレッシュネスバーガーちゅうぶこくさいくうこうてん",
                    "menu": 2,
                    "name": "フレッシュネスバーガー 中部国際空港店",
                    "summary": "新鮮な食材のバーガー",
                    "takeout": 1
                },
                {
                    "children": 1,
                    "crowded": 2,
                    "female": 1,
                    "genre": "洋食",
                    "id": 6,
                    "kana": "コスモス",
                    "menu": 1,
                    "name": "コスモス",
                    "summary": "食べ放題の美味しいハワイ料理",
                    "takeout": 0
                }
            ]
        }
    elif (flight == "CA760"):
        result = {
            "num": 3,
            "recommend": [
                {
                    "children": 2,
                    "crowded": 2,
                    "female": 3,
                    "genre": "とんかつ",
                    "id": 10,
                    "kana": "わこうちゅうぶこくさいくうこういっかいてん",
                    "menu": 2,
                    "name": "和幸 中部国際空港店",
                    "summary": "上手くとんかつの定食店",
                    "takeout": 0
                },
                {
                    "children": 2,
                    "crowded": 2,
                    "female": 3,
                    "genre": "ラーメン",
                    "id": 18,
                    "kana": "ロンフーエアキッチンセントレアてん",
                    "menu": 2,
                    "name": "ロンフーエアキッチン セントレア店",
                    "summary": "内外の旅行者で賑わうフードコート",
                    "takeout": 0
                },
                {
                    "children": 1,
                    "crowded": 2,
                    "female": 2,
                    "genre": "天ぷら",
                    "id": 15,
                    "kana": "てんぷらしもいっしきセントレアてん",
                    "menu": 2,
                    "name": "天ぷら 下の一色 セントレア店",
                    "summary": "空港価格でも比較的お手頃",
                    "takeout": 0
                }
            ]
        }
    else:
        result = {}
    return jsonify(result)
