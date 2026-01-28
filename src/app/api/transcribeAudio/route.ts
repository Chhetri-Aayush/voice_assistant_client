import speech from "@google-cloud/speech";
import path from "path";

const client = new speech.SpeechClient({
  keyFilename: path.join(process.cwd(), "google-services.json"),
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

    const buffer = await audioBlob.arrayBuffer();
    const audioBytes = Buffer.from(buffer).toString("base64");

    const speechRequest = {
      audio: {
        content: audioBytes,
      },
      config: {
        encoding: "WEBM_OPUS" as const,
        sampleRateHertz: 48000,
        languageCode: "ne-NP",
        enableAutomaticPunctuation: true,
      },
    };

    const [response] = await client.recognize(speechRequest);

    //extraction of the transcibed text
    const transcription =
      response.results
        ?.map((result) => result.alternatives?.[0]?.transcript)
        .filter(Boolean)
        .join(" ") || "";

    return new Response(
      JSON.stringify({
        success: true,
        transcription: transcription,
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
