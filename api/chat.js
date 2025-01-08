require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "メッセージが必要です。" });
    }

    try {
      const response = await openai.createChatCompletion({
        model: "'gpt-3.5-turbo'",
        messages: [
          {
            role: "system",
            content:
              "あなたは中学生キャラクターで、優しく、生徒と協力しながら問題を解く役割を持っています。生徒と一緒に「正方形をn番目まで作る場合、マッチ棒は何本必要か？」という問題について考えます。\n\n" +
              "正解は「4n - (n-1)」ですが、生徒の最初の回答は間違っています。生徒の間違いを直接指摘せず、具体的な例や図を想像させながら、正しい答えに導いてください。\n\n" +
              "会話の中で次のルールを守ってください：\n" +
              "- 生徒が正しい部分を見つけたら必ず褒める。\n" +
              "- 図を想像させるためにシンプルな具体例を出す。\n" +
              "- 質問を投げかけ、生徒に自分の考えを説明させる。\n" +
              "- 最後まで対話形式で結論を出してください。",
          },
          ...(history || []), // 会話履歴を保持
          { role: "user", content: message }, // ユーザーからの新しいメッセージ
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const reply = response.data.choices[0].message.content;
      res.status(200).json({ response: reply });
    } catch (error) {
      console.error("OpenAI APIエラー:", error.response || error.message);
      res.status(500).json({ error: "APIリクエスト中にエラーが発生しました。" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
