export default async function handler(req, res) {
  // POSTリクエストを処理
  if (req.method === 'POST') {
    const { text } = req.body;

    try {
      const voicevoxUrl = process.env.VOICEVOX_URL;  // Vercelの環境変数からURLを取得

      if (!voicevoxUrl) {
        throw new Error('VOICEVOX_URLが設定されていません');
      }

      // Voicevox サーバーにPOSTリクエスト
      const response = await fetch(voicevoxUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,              // 音声合成するテキスト
          speaker: 1,              // 使用する話者ID（例: 1番目の話者）
          speed: 1.0,              // 速度（1.0がデフォルト）
          pitch: 1.0,              // 音程（1.0がデフォルト）
          volume: 1.0,             // 音量（1.0がデフォルト）
        }),
      });

      if (!response.ok) {
        throw new Error(`Voicevoxリクエストに失敗しました: ${response.status}`);
      }

      // 音声データを受け取る
      const audioData = await response.arrayBuffer();

      // 音声データをレスポンスとして返す
      res.status(200).send(Buffer.from(audioData));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '音声生成に失敗しました' });
    }
  } else {
    // POST以外のリクエストには405を返す
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
