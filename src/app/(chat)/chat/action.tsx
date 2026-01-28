"use server";
// import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

// export async function transcrbieAudio(audioFile: File) {
//   const elevenlabs = new ElevenLabsClient({
//     apiKey: process.env.ELEVENLABS_API_KEY,
//   });

//   const transcription = await elevenlabs.speechToText.convert({
//     file: audioFile,
//     modelId: "scribe_v2",
//   });

//   console.log("trasnscription:", transcription);
//   return transcription;
// }

import OpenAI from "openai";

const openai = new OpenAI();

export async function transcrbieAudio(audioFile: FormData) {
  const file = audioFile.get("audio") as Blob;
  // const buffer = await file.arrayBuffer();
  // const audioBase64 = Buffer.from(buffer).toString("base64");

  const transcription = await openai.audio.transcriptions.create({
    file: file,
    model: "whisper-1",
  });
  console.log("trasnscription:", transcription.text);
  return transcription.text;
}
