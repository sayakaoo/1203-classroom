require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' }); // POST以外は拒否
  }
  console.log('Received request:', req.body);
  if (!process.env.OPENAI_API_KEY) {
    console.error('APIキーが設定されていません');
  }


  const { apiUserAnswer, buttonId } = req.body;

  let prompt = ""; // 初期化


  if (buttonId === "button1") {
    prompt = `あなたは教師です。以下のルールで正答判定をしてください：

ユーザーの回答を正答の例に基づいて「正解」または「不正解」のみ表示してください。余分な説明はしないでください。
式「1 + 3n」は正しい答えであると理解しています。ユーザーはこの式に基づいて解答しています。
ユーザーは中学一年生です。教師として、寛大な心で評価してください。厳密過ぎない判断をしてください。
正答の例：

・最初にある一本のマッチ棒が1つ、その後のコの字型は3本のマッチ棒からなり、式は「1 + 3n」となります。
・最初に赤で囲んだ部分が1本あり、その後のコの字型が3本のマッチ棒で構成されているため、式は「1 + 3n」となります。
以下の解答に基づいて評価を行ってください：

ユーザーの解答：${apiUserAnswer}

ユーザーの解答における「3n + 1」などの言及に対して適切な評価を行ってください。`;
  } else if (buttonId === "button2") {
   prompt = `あなたは教師です。以下のルールで正答判定をしてください：
1. ユーザーの回答を正答の例に基づいて「正解」または「不正解」のみ表示してください。余分な説明はしないでください。

正答の例：
- 正方形が1つ増えるごとにマッチ棒は4本ずつ増えていくから、式は「1 + 4N」になる。
- 青色で囲んでいる一本が最初にあり、そのあとはコの字型の繰り返しになる。コの字型は4本のマッチ棒からなっているので、式は「1 + 4n」になる。

以下の解答に基づいて評価を行ってください：
ユーザーの解答：${apiUserAnswer}
ユーザーの解答における「4n + 1」などの言及に対して適切な評価を行ってください。`;
  } else {
    res.send("プロンプトが指定されていません");
  }



  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });

    res.status(200).json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('エラー:', error);
    res.status(500).json({ error: 'サーバーエラーが発生しました' });
  }
};
