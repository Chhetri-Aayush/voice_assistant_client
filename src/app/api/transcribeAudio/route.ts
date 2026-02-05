// import speech from "@google-cloud/speech";
// import path from "path";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

// const client = new speech.SpeechClient({
//   keyFilename: path.join(process.cwd(), "google-services.json"),
// });

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audioBlob = formData.get("audio") as Blob | null;

    if (!audioBlob) {
      return new Response(JSON.stringify({ error: "No audio file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // const buffer = await audioBlob.arrayBuffer();
    // const audioBytes = Buffer.from(buffer).toString("base64");

    // const speechRequest = {
    //   audio: {
    //     content: audioBytes,
    //   },
    //   config: {
    //     encoding: "WEBM_OPUS" as const,
    //     sampleRateHertz: 48000,
    //     languageCode: "ne-NP",
    //     enableAutomaticPunctuation: true,
    //   },
    // };

    const transcription = await elevenlabs.speechToText.convert({
      file: audioBlob,
      modelId: "scribe_v2",
      languageCode: "nep",
    });

    console.log("trasnscription:", transcription.text);

    // const [response] = await client.recognize(speechRequest);

    //extraction of the transcibed text
    // const transcription =
    //   response.results
    //     ?.map((result) => result.alternatives?.[0]?.transcript)
    //     .filter(Boolean)
    //     .join(" ") || "";

    return new Response(
      JSON.stringify({
        success: true,
        transcription: transcription.text,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: any) {
    console.error("Transcription error:", error);

    return new Response(
      JSON.stringify({
        error: "Transcription failed: " + error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
