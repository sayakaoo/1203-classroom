

export default async function handler(req, res) {
  // POST リクエストを処理
  if (req.method === 'POST') {
    const { text } = req.body;

    try {
      // ngrok で公開された Voicevox サーバーの URL
      const response = await fetch('https://4947-2400-4051-f81-3e00-ed37-3ce8-5d80-bdea.ngrok-free.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }),
      });

      // 音声データを取得
      const audioData = await response.arrayBuffer();

      // 音声データを返す
      res.status(200).send(Buffer.from(audioData));
    } catch (error) {
      res.status(500).json({ error: 'Voicevox request failed' });
    }
  } else {
    // POST 以外のリクエストは 405 Method Not Allowed を返す
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
