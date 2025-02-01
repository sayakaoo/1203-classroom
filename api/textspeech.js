// /api/textspeech.js
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import fs from 'fs';
import path from 'path';

let client;

// 認証処理
function initializeClient() {
  if (!client) {
    const keyFileContent = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
    if (!keyFileContent) {
      throw new Error('環境変数 GOOGLE_APPLICATION_CREDENTIALS_JSON が設定されていません');
    }
    const tempKeyFilePath = path.join('/tmp', 'google-credentials.json');
    fs.writeFileSync(tempKeyFilePath, keyFileContent);

    client = new TextToSpeechClient({ keyFile: tempKeyFilePath });
  }
}


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    initializeClient();

    const{ text, charaId } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }
    // charaIdに基づいて声を変更
    let voiceName = 'ja-JP-Neural2-C'; // デフォルト
    if (charaId === "1") {
      voiceName = 'ja-JP-Neural2-C'; // charaIdが"1"の場合、別の声を使用
    } else if (charaId === "2") {
      voiceName = 'ja-JP-Wavenet-A'; // charaIdが"2"の場合、さらに別の声を使用
    }

    const request = {
      input: { text },
      voice: {
        languageCode: 'ja-JP',
        name: voiceName, 
      },
      audioConfig: {
        audioEncoding: 'MP3',
        effectsProfileId: ['small-bluetooth-speaker-class-device'],
        pitch: 3,
        speakingRate: 1.3, // ここでスピードを指定
      },
    };
    

    const [response] = await client.synthesizeSpeech(request);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', 'attachment; filename="speech.mp3"');
    res.status(200).send(Buffer.from(response.audioContent, 'base64'));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
