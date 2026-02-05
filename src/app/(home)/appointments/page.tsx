"use client";

import { CalendarDays, CircleX, Mic } from "lucide-react";

export default function AppointmentPage() {
  return (
    <>
      <div className=" text-[#111418] font-display min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
                  नमस्ते बालेन जी 🙏
                </h1>
                <p className="text-gray-500 text-lg">
                  तपाईंको अपोइन्टमेन्ट निम्नानुसार छन्:
                </p>
              </div>

              <button className="flex items-center gap-3 bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all group animate-fade-in-up">
                <div className="bg-white/20 p-2 rounded-full flex items-center justify-center">
                  <Mic color="white" size={22} />
                </div>

                {/* <div className="bg-blue-500 p-2 rounded-xl shadow-md">
                <Mic color="white" size={32} />
                </div> */}

                <span className="font-bold pr-2">नयाँ अपोइन्टमेन्ट</span>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* CARD 1 */}
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="flex-shrink-0 flex md:flex-col items-center justify-center bg-blue-50 text-primary rounded-lg w-full md:w-24 h-16 md:h-24 gap-2 md:gap-0">
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    Mangsir
                  </span>
                  <span className="text-2xl font-black">12</span>
                  <span className="text-xs font-medium md:mt-1">10:00 AM</span>
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {/* <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                      Confirmed
                    </span> */}
                    <span className="text-xs text-gray-400">
                      • General Checkup
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 truncate">
                    Dr. Ram Shrestha
                  </h3>

                  <p className="text-sm text-primary font-medium mb-1">
                    Cardiologist
                  </p>

                  {/* <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <span className="material-symbols-outlined text-[16px]">
                      location_on
                    </span>
                    <span>Norvic International Hospital, Kathmandu</span>
                  </div> */}
                </div>

                <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto mt-2 md:mt-0">
                  <button className="flex-1 md:w-36 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                    {/* <span className="material-symbols-outlined text-[18px]">
                      calendar_month
                    </span> */}
                    <CalendarDays size={18} />
                    पुन:निर्धारण
                  </button>

                  <button className="flex-1 md:w-36 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
                    <CircleX size={18} />
                    निरस्त
                  </button>
                </div>
              </div>

              {/* other cards unchanged except dark classes removed — same pattern */}
            </div>
          </div>
        </main>

        <div className="fixed bottom-6 right-6 md:hidden z-40">
          <button className="bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-600 transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">mic</span>
          </button>
        </div>
      </div>
    </>
  );
}
