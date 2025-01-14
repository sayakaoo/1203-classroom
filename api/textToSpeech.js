import { TextToSpeechClient } from "@google-cloud/text-to-speech";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  console.log("Received text: ", text);

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const client = new TextToSpeechClient();
    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      audioConfig: { audioEncoding: "MP3" },
    });

    res.setHeader("Content-Type", "audio/mp3");
    res.send(Buffer.from(response.audioContent));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to synthesize speech" });
  }
}
