import { useEffect, useRef, useState } from "react";

type UseAudioRecorder = {
  startRecording: () => void;
  stopRecording: () => void;
  recordingBlob: Blob | null;
  isRecording: boolean;
  //   playRecording: () => void;
  error: string | null;
};

export function useAudioRecorder(): UseAudioRecorder {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const stopTimeoutRef = useRef<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  //   const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const initRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          setRecordingBlob(blob);
          audioChunksRef.current = [];
        };
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error accessing microphone",
        );
        // console.error("Error accessing microphone:", err);
      }
    };

    initRecorder();

    return () => {
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
      }
      if (mediaRecorderRef.current) {
        const stream = mediaRecorderRef.current.stream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = () => {
    if (!mediaRecorderRef.current) {
      //TODO: play the error soudn like you missed have dont hanve the microphone persmission please turn it on via the browser settings
      setError("Recorder not initialized");
      return;
    }
    audioChunksRef.current = [];
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  //   const stopRecording = () => {
  //     if (!mediaRecorderRef.current) return;
  //     setTimeout(() => {
  //       mediaRecorderRef.current.stop();
  //       setIsRecording(false);
  //     }, 1000);
  //   };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;

    // Clear any existing timer
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
    }

    // Set new timer
    stopTimeoutRef.current = window.setTimeout(() => {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      stopTimeoutRef.current = null;
    }, 200);
  };

  //   const playRecording = () => {
  //     if (!recordingBlob) {
  //       setError("No recording available to play");
  //       return;
  //     }

  //     const audioUrl = URL.createObjectURL(recordingBlob);
  //     const audio = new Audio(audioUrl);
  //     audioRef.current = audio;

  //     console.log(" Playing audio...");
  //     audio.play();

  //     audio.onended = () => {
  //       console.log("Audio playback finished");
  //       URL.revokeObjectURL(audioUrl);
  //     };
  //   };

  return {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
    // playRecording,
    error,
  };
}
