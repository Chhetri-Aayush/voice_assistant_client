"use client";
import {
  BotMessageSquare,
  Calendar,
  ClipboardPlus,
  Clock,
  Keyboard,
  Mic,
  User,
} from "lucide-react";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const router = useRouter();
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
                  {/* <span className="material-symbols-outlined text-slate-600 text-[14px]">
                    person
                  </span> */}
                  {/* <BotMessageSquare color="white" size={15} /> */}
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
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
            <ClipboardPlus className="text-blue-600 w-5 h-5" />
            नियुक्ति सारांश
          </h2>

          <div className="space-y-4">
            <SummaryItem icon={<ClipboardPlus />} text="दन्त चिकित्सक" />
            <SummaryItem icon={<Calendar />} text="भोलि" />
            <SummaryItem icon={<Clock />} text="बिहान १० बजे" />
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
            <div className="absolute -inset-6 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
            <button className="relative z-10 glow-btn bg-blue-600 text-white w-28 h-28 rounded-full flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-xl">
              <Mic className="w-10 h-10" />
            </button>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <p className="text-blue-600 font-bold text-sm tracking-wide">
                Hold to Speak / बोल्न थिच्नुहोस्
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SummaryItem({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="bg-white/80 p-4 rounded-2xl border shadow-sm flex gap-2 items-center press-scale hover:scale-105 transition-transform">
      <span className="text-blue-500 flex items-center">{icon}</span>
      <span className="font-semibold">{text}</span>
    </div>
  );
}
