"use client";

import { CalendarDays, CircleX, Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Appointment = {
  id: number;
  month: string;
  day: string;
  time: string;
  department: string;
  doctor: string;
  type: string;
};

export default function AppointmentPage() {
  const router = useRouter();

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      month: "माघ",
      day: "२५",
      time: "बिहान १०:०० बजे",
      department: "कार्डियोलोजी",
      doctor: "डाक्टर राम श्रेष्ठ",
      type: "General Checkup",
    },
  ]);
  const handleDelete = (id: number) => {
    const updatedAppointments = appointments.filter((apt) => apt.id !== id);
    setAppointments(updatedAppointments);

    // Optional: Log to console to verify
    console.log(`Appointment ${id} removed`);
  };

  /*
  useEffect(() => {
    fetch("http://localhost:8000/deleteAppointment", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);
  */

  return (
    <div className="text-[#111418] font-display min-h-screen flex flex-col">
      <main className="grow">
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

            <button
              className="cursor-pointer flex items-center gap-3 bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all group"
              onClick={() => router.push("/chat")}
            >
              <div className="bg-white/20 p-2 rounded-full flex items-center justify-center">
                <Mic color="white" size={22} />
              </div>
              <span className="font-bold pr-2">नयाँ अपोइन्टमेन्ट</span>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* 3. Mapping over the appointments array */}
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start md:items-center"
              >
                {/* Date/Time Section */}
                <div className="shrink-0 flex md:flex-col items-center justify-center bg-blue-50 text-primary rounded-lg w-full md:w-24 h-16 md:h-24 gap-2 md:gap-0">
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    {apt.month}
                  </span>
                  <span className="text-2xl font-black">{apt.day}</span>
                  <span className="text-xs font-medium md:mt-1 text-center px-1">
                    {apt.time}
                  </span>
                </div>

                {/* Info Section */}
                <div className="grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-400">• {apt.type}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 truncate">
                    {apt.doctor}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-1">
                    {apt.department}
                  </p>
                </div>

                {/* Actions Section */}
                <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto mt-2 md:mt-0">
                  <button className="flex-1 md:w-36 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                    <CalendarDays size={18} />
                    पुन:निर्धारण
                  </button>

                  <button
                    onClick={() => handleDelete(apt.id)}
                    className="flex-1 md:w-36 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                  >
                    <CircleX size={18} />
                    निरस्त
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile Floating Button */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <button className="bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-600 transition-colors flex items-center justify-center">
          <Mic size={30} />
        </button>
      </div>
    </div>
  );
}
