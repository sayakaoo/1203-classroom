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
  if (buttonId === "saveButton1") {
    prompt = `ユーザーは三重引用符で囲んだテキストを提供します。これは「正方形をn番目までつくる場合マッチ棒は何本必要か？」というマッチ棒の規則性問題の回答です。ユーザーは4+3(n-1)という回答の説明をしています。次のステップで手順を実行してください。

"""${apiUserAnswer}"""

ステップ 1: ユーザーの回答「${apiUserAnswer}」を解析し、4+3(n-1)になる理由を適切に説明しているかを判断してください。
ステップ 2: ステップ 1の判断に基づき、次のいずれかを出力してください。
- ユーザーの回答が正解の場合: {"result": "正解", "reason": "<理由の簡潔な要約>"}
- ユーザーの回答が不正解の場合: {"result": "不正解", "reason": "4+3(n-1)の式になる理由が正確に説明されていません。"}

出力形式：
{
  "result": "<正解または不正解>",
  "reason": "<理由>",
  "buttonId": "<buttonId>"
}
`;
  } else if (buttonId === "saveButton3") {
    prompt = `ユーザーは三重引用符で囲んだテキストを提供します。これは「正方形をn番目までつくる場合マッチ棒は何本必要か？」というマッチ棒の規則性問題の回答です。ユーザーは4+3(n-1)という回答の説明をしています。次のステップで手順を実行してください。

    """${apiUserAnswer}"""
    
    ステップ 1: ユーザーの回答「${apiUserAnswer}」を解析し、4+3(n-1)になる理由を適切に説明しているかを判断してください。
    ステップ 2: ステップ 1の判断に基づき、次のいずれかを出力してください。
    - ユーザーの回答が正解の場合: {"result": "正解", "reason": "<理由の簡潔な要約>"}
    - ユーザーの回答が不正解の場合: {"result": "不正解", "reason": "4+3(n-1)の式になる理由が正確に説明されていません。"}
    
    出力形式：
    {
      "result": "<正解または不正解>",
      "reason": "<理由>",
      "buttonId": "<buttonId>"
    }
    `;
  } else if (buttonId === "saveButton4") {
    prompt = `ユーザーは三重引用符で囲んだテキストを提供します。これは「正方形をn番目までつくる場合マッチ棒は何本必要か？」というマッチ棒の規則性問題の回答です。ユーザーは4+3(n-1)という回答の説明をしています。次のステップで手順を実行してください。

    """${apiUserAnswer}"""
    
    ステップ 1: ユーザーの回答「${apiUserAnswer}」を解析し、4+3(n-1)になる理由を適切に説明しているかを判断してください。
    ステップ 2: ステップ 1の判断に基づき、次のいずれかを出力してください。
    - ユーザーの回答が正解の場合: {"result": "正解", "reason": "<理由の簡潔な要約>"}
    - ユーザーの回答が不正解の場合: {"result": "不正解", "reason": "4+3(n-1)の式になる理由が正確に説明されていません。"}
    
    出力形式：
    {
      "result": "<正解または不正解>",
      "reason": "<理由>",
      "buttonId": "<buttonId>"
    }
    `;
  } else if (buttonId === "saveButton5") {
    prompt = `ユーザーは三重引用符で囲んだテキストを提供します。これは「"4+3nという式が正しいか確かめることはできますか？」という問題の回答です。次のステップで手順を実行してください。

    """${apiUserAnswer}"""
    
    ステップ 1: ユーザーの回答「${apiUserAnswer}」を解析し、どのような方法をとろうとしているかを判断してください。
    ステップ 2: ステップ 1の判断に基づき、次のいずれかを出力してください。
    - ユーザーの回答が「具体的な数を当てはめる」や「3個の時を考える」など、数を当てはめようとしている場合: {"result": "具体的な数を使う"}
    - ユーザーの回答がその他の場合: {"result": "その他"}
    
    
    出力形式：
    {
      "result": "<具体的な数を使うまたはその他>"
    }
    `;
  }else if (buttonId === "saveButton7") {
    prompt = `ユーザーは三重引用符で囲んだテキストを提供します。これは「正方形をn番目までつくる場合マッチ棒は何本必要か？」というマッチ棒の規則性問題の回答です。ユーザーは1+3nという回答の説明をしています。次のステップで手順を実行してください。

"""${apiUserAnswer}"""

ステップ 1: ユーザーの回答「${apiUserAnswer}」を解析し、1+3nになる理由を適切に説明しているかを判断してください。
ステップ 2: ステップ 1の判断に基づき、次のいずれかを出力してください。
- ユーザーの回答が正解の場合: {"result": "正解", "reason": "<理由の簡潔な要約>"}
- ユーザーの回答が不正解の場合: {"result": "不正解", "reason": "1+3nの式になる理由が正確に説明されていません。"}

出力形式：
{
  "result": "<正解または不正解>",
  "reason": "<理由>",
  "buttonId": "<buttonId>"
}
`;
  }else if (buttonId === "saveButton8") {
    prompt = `ユーザーは三重引用符で囲んだテキストを提供します。これは「正方形をn番目までつくる場合マッチ棒は何本必要か？」というマッチ棒の規則性問題の回答です。ユーザーは1+3nという回答の説明をしています。次のステップで手順を実行してください。

"""${apiUserAnswer}"""

ステップ 1: ユーザーの回答「${apiUserAnswer}」を解析し、1+3nになる理由を適切に説明しているかを判断してください。
ステップ 2: ステップ 1の判断に基づき、次のいずれかを出力してください。
- ユーザーの回答が正解の場合: {"result": "正解", "reason": "<理由の簡潔な要約>"}
- ユーザーの回答が不正解の場合: {"result": "不正解", "reason": "1+3nの式になる理由が正確に説明されていません。"}

出力形式：
{
  "result": "<正解または不正解>",
  "reason": "<理由>",
  "buttonId": "<buttonId>"
}
`;
  }else if (buttonId === "saveButton10") {
    prompt = `ユーザーは三重引用符で囲んだテキストを提供します。これは「正方形をn番目までつくる場合マッチ棒は何本必要か？」というマッチ棒の規則性問題の回答です。ユーザーは1+3nという回答の説明をしています。次のステップで手順を実行してください。

"""${apiUserAnswer}"""

ステップ 1: ユーザーの回答「${apiUserAnswer}」を解析し、1+3nになる理由を適切に説明しているかを判断してください。
ステップ 2: ステップ 1の判断に基づき、次のいずれかを出力してください。
- ユーザーの回答が正解の場合: {"result": "正解", "reason": "<理由の簡潔な要約>"}
- ユーザーの回答が不正解の場合: {"result": "不正解", "reason": "1+3nの式になる理由が正確に説明されていません。"}

出力形式：
{
  "result": "<正解または不正解>",
  "reason": "<理由>",
  "buttonId": "<buttonId>"
}
`;
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
