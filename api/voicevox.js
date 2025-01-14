const path = require('path');
const { default: axios } = require("axios");
const fs = require("fs");
const express = require("express");
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, '../public')));


const rpc = axios.create({ baseURL: "http://localhost:50021", proxy: false });

// 音声を生成して返すAPIエンドポイント
app.get("/generate-audio", async (req, res) => {
  const text = req.query.text;

  if (!text) {
    return res.status(400).send("テキストが指定されていません");
  }

  try {
    // audio_queryで音声生成のためのパラメータを取得
    const audio_query = await rpc.post('audio_query?text=' + encodeURI(text) + '&speaker=1');

    // synthesisで音声データを取得
    const synthesis = await rpc.post("synthesis?speaker=1", JSON.stringify(audio_query.data), {
      responseType: 'arraybuffer',
      headers: {
        "accept": "audio/wav",
        "Content-Type": "application/json"
      }
    });

    // 音声データをレスポンスとして返す
    res.set('Content-Type', 'audio/wav');
    res.send(synthesis.data);

  } catch (error) {
    console.error(error);
    res.status(500).send("音声合成に失敗しました");
  }
});

// ルートパスにアクセスがあった場合、index.htmlを返す
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// サーバー起動
app.listen(port, () => {
  console.log(`サーバーは http://localhost:${port} で動作しています`);
});
