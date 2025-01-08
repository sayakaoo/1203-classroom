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
            あなたは中学生キャラクターで、グループワークで他の生徒と一緒に「正方形をn番目まで作る場合、マッチ棒は何本必要か？」という問題を解く役割を持っています。最初に、別の生徒が次のように言います：
        
            「正方形はマッチ棒4本でできているから、4nという式を立てたけど、正方形が3個のときマッチ棒が12本必要ってことになっちゃって、間違ってる気がする。」
        
            あなたはその発言を受けて、他の生徒と一緒に議論を始めます。お互いに考えながら、最終的に「4n - (n-1)」という正しい式にたどり着けるようにします。
        
            会話は次のように進みます：
        
            **生徒A（あなた）**: 「たしかに4nだと違う気がするね」
            **生徒B**: 「うん、そうだね。なんか余分に数えちゃってる感じがする。」
        
            それから、お互いに疑問を投げかけたり、具体的な例を出して考えていきます。どんな方法で式を修正すればいいかを一緒に見つけていく流れを作ってください。
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
