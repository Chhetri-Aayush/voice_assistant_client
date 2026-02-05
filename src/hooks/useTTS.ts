import { useCallback } from "react";

export function useTTS() {
  const playAudio = useCallback(async (text: string) => {
    try {
      const response = await fetch("/api/transcribeText", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("TTS error:", error);
    }
  }, []);

  return { playAudio };
}
