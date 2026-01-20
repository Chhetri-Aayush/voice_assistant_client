"use client";
import { Mic } from "lucide-react";

export default function Header() {
  return (
    <header>
      <nav className="py-6 px-8 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 p-2 rounded-2xl shadow-md">
            <Mic color="white" size={32} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            सहायक AI
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-slate-600 font-medium hover:text-blue-500 px-4 py-2 transition-colors">
            Help / मद्दत
          </button>
          <button className="text-slate-600 font-medium hover:text-blue-500 px-4 py-2 transition-colors">
            Help / मद्दत
          </button>
          <button className="text-slate-600 font-medium hover:text-blue-500 px-4 py-2 transition-colors">
            Help / मद्दत
          </button>
          <button className="bg-white border-2 border-slate-200 text-slate-700 px-6 py-2.5 rounded-full font-bold hover:bg-slate-300 transition-all cursor-pointer">
            Login
          </button>
        </div>
      </nav>
    </header>
  );
}
