export default async function handler(req, res) {
  // POST リクエストを処理
  if (req.method === 'POST') {
    const { text } = req.body;

    try {
      const voicevoxBaseUrl = process.env.VOICEVOX_URL || 'http://localhost:50021';
      
      // ngrok で公開された Voicevox サーバーの URL
      const response = await fetch(`${voicevoxBaseUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,              // 音声合成するテキスト
          speaker: 1,              // 使用する話者のID（例: 1番目の話者）
          speed: 1.0,              // 速度（1.0がデフォルト）
          pitch: 1.0,              // 音程（1.0がデフォルト）
          volume: 1.0,             // 音量（1.0がデフォルト）
        }),
      });

      // Voicevox サーバーからのレスポンス確認
      if (!response.ok) {
        throw new Error('Failed to fetch audio from Voicevox');
      }

      // 音声データを取得
      const audioData = await response.arrayBuffer();

      // 音声データを返す
      res.status(200).send(Buffer.from(audioData));
    } catch (error) {
      console.error(error);  // エラーをログに出力
      res.status(500).json({ error: 'Voicevox request failed' });
    }
  } else {
    // POST 以外のリクエストは 405 Method Not Allowed を返す
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
