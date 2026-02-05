import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

export async function POST(request: Request) {
  const { text } = await request.json();

  const client = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY,
  });

  const audioBuffer = await client.textToSpeech.convert(
    "cgSgspJ2msm6clMCkdW9",
    {
      text: text,
      modelId: "eleven_v3",
      outputFormat: "mp3_44100_128",
    },
  );

  return new Response(audioBuffer, {
    headers: { "Content-Type": "audio/mpeg" },
  });
}
