"use client";
import { Mic } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <nav className="bg-white/70 backdrop-blur-md border-b border-slate-200/50 py-4 px-8 flex justify-between items-center shrink-0">
      <div className="flex items-center gap-3">
        <div
          className="bg-blue-600 p-1.5 rounded-xl shadow-sm flex items-center justify-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Mic className="text-white w-8 h-8" />
        </div>
        <span className="text-xl font-bold text-slate-900">सहायक AI</span>
      </div>
    </nav>
  );
}
