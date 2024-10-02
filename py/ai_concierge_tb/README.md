# Getting started

## Preparation

Create your python environment if you don't have.
(python >= 3.8)
Then activate your python environment.

## Install

Download this directory and install the project dependencies with following command

```bash
python -m venv .venv
.venv\Scripts\activate
python -m pip install .
```

## Run

In order to run the server, use the following command from the root folder of the project

```bash
flask --app src/stub run
```

## Truboule Shooting

### [WinError 10013] An attempt was made to access a socket in a way forbidden by its access permissions (アクセス許可で禁じられた方法でソケットにアクセスしようとしました。)

- If you would face WinError 10013, you can change the port number to 80 as following command.

```bash
flask --app src/stub run --port 80
```

- In that case, you also need to change the port number in the following file.

../js/character/ai_concierge_tb/centrea_airport_functions.js

```javascript
const port = 80;
const apiUrl = `http://localhost:${port}/v1/match`;
```
