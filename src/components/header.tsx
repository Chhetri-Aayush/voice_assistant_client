"use client";
import { Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/authClient";

export default function Header() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      // fetchOptions: {
      //   onError: (ctx) => {
      //     console.error("Sign out failed:", ctx.error);
      //   },
      //   onSuccess: () => {
      //     console.log("Sign out succeeded!");
      //   },
      // },
    });
  };

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
          <button className="text-slate-600 hover:text-blue-500 px-4 py-2">
            चिकित्सकहरू
          </button>

          <button
            onClick={() => router.push("/appointments")}
            className="text-slate-600 hover:text-blue-500 px-4 py-2"
          >
            अपोइन्टमेन्टहरू
          </button>

          <button className="text-slate-600 hover:text-blue-500 px-4 py-2">
            जिज्ञासा
          </button>

          {isPending ? null : session ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2.5 rounded-full font-bold"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-500 border-2 border-slate-200 text-slate-800 px-6 py-2.5 rounded-full font-bold"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
