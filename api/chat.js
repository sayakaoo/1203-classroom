require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let history = []; // 会話履歴を保持するために初期化

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' }); // POST以外は拒否
  }

  console.log('Received request:', req.body);
  if (!process.env.OPENAI_API_KEY) {
    console.error('APIキーが設定されていません');
  }

  try {
    const message = req.body.message; // リクエストボディからメッセージを取得

    // 会話履歴に新しいメッセージを追加
    history.push({ role: "user", content: message });

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // モデル名の修正
      messages: [
        {
          role: "system",
          content: `
            あなたは中学生です。グループワークで中学生であるユーザーと一緒に「正方形をn番目まで作る場合、マッチ棒は何本必要か？」という問題を解く役割を持っています。最初に、別の生徒が次のように言います：
            「正方形はマッチ棒4本でできているから、4nという式をたてたけど、正方形が3個のときマッチ棒が12本必要ってことになっちゃって間違っている気がします。」
        
            この発言を受けて、あなたは中学生であるユーザーと一緒に考えていきます。お互い中学生として対話を通じて、最終的に「4n - (n-1)」という式を導き出してください。
        
            重要なポイント：
            - お互いに質問を投げかけて、どの部分で間違えているのかを一緒に考えます。
            - 他の生徒の意見を尊重しながら、正しい考え方を導き出すように努めます。
            - 図や具体例を出し合って、考えを深めていきましょう。
        
            会話の中で守るべきルール：
            - 図を想像させるために、シンプルな具体例を出す。
            - 最後まで対話形式で結論を出す。
        
            さあ、最初に言った生徒が提案した式について、あなたたちはどう考えますか？
          `
        }
        ,
        
        ...history, // 過去の会話履歴を含める
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content;
    
    // 会話履歴にAPIの返信も追加
    history.push({ role: "assistant", content: reply });

    res.status(200).json({ response: reply });
  } catch (error) {
    console.error("OpenAI APIエラー:", error.response || error.message);
    res.status(500).json({ error: "APIリクエスト中にエラーが発生しました。" });
  }
};
