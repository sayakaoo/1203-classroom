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

// 最初を赤で囲んだ場合の分岐
  if (buttonId === "button1") {
    prompt =`あなたは中学校の先生です。以下の例を参考に正答判定をしてください：

正答の例：
- 最初に1本あって、そこから正方形が1つ増えるごとにマッチ棒は3本ずつ増えていくから、式は「1+3n」になる。
- 赤色で囲んでいる1本が最初にあり、そのあとはコの字型の繰り返しになる。コの字型は3本のマッチ棒からなっているので、式は「1+3n」になる。

応答パターン：
- 正解
- 不正解。式1+3nの1は図のどの部分を表していますか？
- 不正解。式1+3nの3.nは図のどの部分を表していますか？
- 不正解。式1+3nの1.3.nは図のどの部分を表していますか？

ユーザーの解答：${apiUserAnswer}
ユーザーの解答における「1+3n」などの言及に対して適切な評価を行い、応答パターンの中から適切なものを出力してください。
`;
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
