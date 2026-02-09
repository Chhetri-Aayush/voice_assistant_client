"use client";
import { Mic, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => router.push("/")}
            >
              <div className="bg-blue-500 p-2 rounded-xl shadow-md">
                <Mic color="white" size={32} />
              </div>
              <h2 className="text-lg font-bold tracking-tight">सहायक AI</h2>
            </div>

            <nav className="hidden md:flex gap-8 items-center">
              {/* <a
                className="text-sm font-medium hover:text-primary transition-colors"
                href="#"
              >
                Dashboard
              </a> */}
              <a
                className="text-base font-medium hover:text-primary transition-colors"
                href="#"
              >
                चिकित्सकहरू
              </a>
              {/* <a
                className="text-sm font-medium hover:text-primary transition-colors"
                href="#"
              >
                Hospitals
              </a> */}
              <a
                className="text-primary text-base font-bold border-b-2 border-primary py-5"
                href="#"
              >
                अपोइन्टमेन्टहरू
                {/* नियुक्तिहरू */}
              </a>
            </nav>

            <div className="flex items-center gap-4">
              {/* <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                <span className="material-symbols-outlined text-gray-600">
                  notifications
                </span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button> */}

              <div className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-primary/20 cursor-pointer">
                <User size={35} color="grey" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
