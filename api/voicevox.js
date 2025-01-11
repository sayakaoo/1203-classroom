export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text, speaker, speed, pitch, volume } = req.body;

    // Voicevoxサーバーにリクエストを送信
    try {
      const voicevoxUrl = process.env.VOICEVOX_URL;
      const response = await fetch(voicevoxUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

      const audioData = await response.arrayBuffer();
      res.status(200).send(Buffer.from(audioData));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '音声生成に失敗しました' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
