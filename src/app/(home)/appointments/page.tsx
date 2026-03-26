"use client";

import { CalendarDays, CircleX, Loader2, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/authClient";
import toast from "react-hot-toast";

// Updated type to match your Hono "enrichedAppointments" result
type Appointment = {
  id: number;
  status: string;
  doctor: {
    id: number;
    name: string;
    specialization: string;
  };
  department: {
    id: number;
    name: string;
  };
  timeSlot: {
    id: number;
    slotDate: string; // e.g., "2026-03-26"
    slotTime: string; // e.g., "10:00 AM"
    status: string;
  };
};

export default function AppointmentPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/bookedAppointments",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const result = await response.json();
        if (result.success) {
          // Even though backend filters, we double-check for "booked" status here
          const onlyBooked = result.data.filter(
            (apt: Appointment) => apt.status.toLowerCase() === "booked",
          );
          setAppointments(onlyBooked);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("अपोइन्टमेन्टहरू लोड गर्न सकिएन");
      } finally {
        setIsLoadingData(false);
      }
    };

    if (session) fetchAppointments();
  }, [session]);

  // Auth Guard
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

  const handleCancel = async (id: number) => {
    const confirmCancel = window.confirm(
      "के तपाईं यो अपोइन्टमेन्ट रद्द गर्न चाहनुहुन्छ?",
    );
    if (!confirmCancel) return;

    try {
      // Logic to call your cancel API would go here
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      toast.success("अपोइन्टमेन्ट रद्द गरियो");
    } catch (error) {
      toast.error("रद्द गर्न असफल भयो");
    }
  };

  if (isPending || isLoadingData)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );

  return (
    <div className="text-[#111418] font-sans min-h-screen bg-gray-50/50">
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
            नमस्ते बालेन जी 🙏
            {/* नमस्ते {session?.user?.name?.split(" ")[0] || "बालेन"} जी 🙏 */}
          </h1>
          <p className="text-gray-500 text-lg">
            तपाईंको बुक गरिएका अपोइन्टमेन्टहरू:
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {appointments.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <CalendarDays className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-400 font-medium">
                कुनै बुक गरिएको अपोइन्टमेन्ट भेटिएन।
              </p>
            </div>
          ) : (
            appointments.map((apt) => {
              // Date Splitting Logic
              const dateObj = new Date(apt.timeSlot.slotDate);
              const day = dateObj.getDate();
              const month = dateObj.toLocaleString("en-US", { month: "short" });

              return (
                <div
                  key={apt.id}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-6 items-center hover:shadow-md transition-shadow"
                >
                  {/* Date Badge */}
                  <div className="shrink-0 flex flex-col items-center justify-center bg-blue-600 text-white rounded-2xl w-20 h-20 shadow-lg shadow-blue-100">
                    <span className="text-2xl font-bold leading-none">
                      {day}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {month}
                    </span>
                  </div>

                  {/* Info Section */}
                  <div className="grow text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-900">
                        डा. {apt.doctor.name}
                      </h3>
                      <span className="text-[10px] bg-green-100 text-green-700 font-black px-2 py-0.5 rounded-full uppercase">
                        {apt.status}
                      </span>
                    </div>
                    <p className="text-blue-600 font-semibold text-sm mb-3">
                      {apt.department.name} • {apt.doctor.specialization}
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-4 text-gray-500 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} className="text-gray-400" />
                        {apt.timeSlot.slotTime}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleCancel(apt.id)}
                      className="flex flex-1 items-center justify-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors border border-red-100"
                    >
                      <CircleX size={18} /> रद्द गर्नुहोस्
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
