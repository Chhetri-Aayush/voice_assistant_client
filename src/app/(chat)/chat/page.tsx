"use client";
import clsx from "clsx";
import {
  BotMessageSquare,
  Calendar,
  ClipboardPlus,
  Clock,
  Keyboard,
  Mic,
  User,
} from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";

export default function ChatPage() {
  const { recordingBlob, isRecording, startRecording, stopRecording } =
    useAudioRecorder();

  const handleMouseDown = () => {
    // console.log("voice recording is started");
    startRecording();
  };

  const handleMouseUp = () => {
    // console.log("voice recording is stopped and sent to the server");
    stopRecording();
  };

  useEffect(() => {
    if (!recordingBlob) return;

    //audio playing logic
    // const audioUrl = URL.createObjectURL(recordingBlob);
    // const audio = new Audio(audioUrl);
    // console.log("playing audio ");
    // audio.play();
    // audio.onended = () => {
    //   URL.revokeObjectURL(audioUrl);
    // };

    async function sendForTranscription() {
      const formData = new FormData();
      formData.append("audio", recordingBlob!, "audio.webm");
      const response = await fetch("/api/transcribeAudio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Transcription request failed:", response.statusText);
        return;
      }
      const data = await response.json();
      // const text = await transcrbieAudio(formData);
      //TODO: send the transcribed text to the server and also add the transcribed text to the message state so that it can be displayed in the chat
      console.log("transcribed text:", data.transcription);
    }

    sendForTranscription();
  }, [recordingBlob]);

  return (
    <>
      {/* MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        {/* CHAT AREA */}
        <main className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-2xl mx-auto space-y-10 mb-20">
            {/* Assistant */}
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2 px-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <BotMessageSquare color="white" size={15} />
                </div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                  Assistant
                </span>
              </div>

              <div className="glass-bubble p-6 rounded-3xl rounded-tl-none max-w-[90%] press-scale">
                <p className="text-xl font-medium">
                  नमस्ते! म तपाईंलाई कसरी सहयोग गर्न सक्छु?
                </p>
              </div>
            </div>

            {/* User */}
            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-2 px-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  You
                </span>
                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                  <User size={15} />
                </div>
              </div>

              <div className="glass-bubble-user p-6 rounded-3xl rounded-tr-none max-w-[90%] press-scale">
                <p className="text-xl text-white font-medium">
                  म भोलि दन्त चिकित्सकलाई भेट्न चाहन्छु।
                </p>
              </div>
            </div>

            {/* Assistant */}
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2 px-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <BotMessageSquare color="white" size={15} />
                </div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                  Assistant
                </span>
              </div>
              <div className="glass-bubble p-6 rounded-3xl rounded-tl-none max-w-[90%] press-scale">
                <p className="text-xl font-medium">
                  निश्चय नै! मैले भोलि बिहान १० बजेको लागि समय खाली पाएको छु।
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* SIDEBAR */}
        <aside className="w-45 sidebar-glass p-6 flex flex-col shrink-0 press-scale md:w-60 lg:w-75">
          <h2 className="text-xl font-bold tracking-widest mb-6 flex items-center gap-2">
            <ClipboardPlus className="text-blue-600 w-5 h-5" />
            नियुक्ति सारांश
          </h2>

          <div className="space-y-4">
            <SummaryItem
              icon={<ClipboardPlus size={16} />}
              text="दन्त चिकित्सक"
              label="विशेषज्ञ"
            />
            <SummaryItem
              icon={<Calendar size={16} />}
              text="भोलि"
              label="मिति"
            />
            <SummaryItem
              icon={<Clock size={16} />}
              text="बिहान १० बजे"
              label="समय"
            />
          </div>

          {/* <button className="mt-auto bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg glow-btn press-scale flex items-center justify-center gap-2 hover:bg-blue-700 transition-all">
            Confirm Booking
          </button> */}
        </aside>
      </div>

      <div className="relative z-20 px-8 pb-10 pt-4 pointer-events-none">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-10 pointer-events-auto">
          <button className="w-14 h-14 rounded-full glass-bubble flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all active:scale-90">
            <Keyboard className="w-6 h-6" />
          </button>
          <div className="relative group">
            <div
              className={clsx(
                "absolute -inset-6 rounded-full blur-xl transition-all",
                isRecording ? "bg-red-100" : "bg-blue-200",
              )}
            ></div>
            <button
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className={clsx(
                "relative z-10 glow-btn text-white w-28 h-28 rounded-full flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-75 shadow-xl",
                isRecording ? "bg-red-600" : "bg-blue-600",
              )}
            >
              <Mic className="w-10 h-10" />
            </button>
            <div className="absolute -bottom-8 left-[9%] -translate-x-1/2 whitespace-nowrap">
              <p className="text-blue-600 font-bold text-base tracking-wide">
                {!isRecording ? "बोल्न थिच्नुहोस्" : "बोलेपछि छोड्नुहोस्।"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SummaryItem({
  icon,
  text,
  label,
}: {
  icon: ReactNode;
  text: string;
  label: string;
}) {
  return (
    <div className="bg-white/80 p-4 rounded-2xl border shadow-sm hover:scale-105 transition-transform">
      <label className="text-sm font-bold text-slate-500 ">{label}</label>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-blue-500 ">{icon}</span>
        <span className="font-semibold text-lg ">{text}</span>
      </div>
    </div>
  );
}
