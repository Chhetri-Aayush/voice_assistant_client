import { AudioLines, CalendarCheck, Loader, Speech } from "lucide-react";

export default function Main() {
  return (
    <main>
      <section className="pt-12 pb-24 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-tight">
          डाक्टरको अपोइन्टमेन्ट बुक गर्न <br />
          <span className="text-blue-500 text-6xl md:text-7xl">
            सजिलै बोल्नुहोस्
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-600 mb-16 leading-relaxed">
          Speak in Nepali to book your doctor's appointment. No typing, no
          complexity. Just talk.
        </p>

        <div className="flex flex-col items-center gap-6 ">
          <button className="group relative flex flex-col items-center justify-center gap-4 bg-primary text-white w-64 h-64 rounded-full shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-full transition-opacity"></div>
            <AudioLines size={72} />
            <span className="text-2xl font-bold">Start Speaking</span>
            <span className="text-lg opacity-90 font-medium">
              बोल्न सुरु गर्नुहोस्
            </span>
          </button>

          <p className="text-slate-500 font-medium animate-pulse">
            Tap the above to start
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* CARD 1 */}
          <div className="bg-white p-10 rounded-4xl border border-blue-50 text-center card-shadow card-shadow-hover hover:-translate-y-2 transition-transform duration-300">
            <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mb-8 mx-auto">
              <Speech size={64} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              १. नेपालीमा बोल्नुहोस्
            </h3>
            <p className="text-lg text-slate-600 font-medium mb-2">
              Talk in Nepali
            </p>
            <p className="text-slate-500 leading-relaxed">
              Simply tell us which doctor you want to see and when.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white p-10 rounded-4xl border border-purple-50 text-center card-shadow card-shadow-hover hover:-translate-y-2 transition-transform duration-300">
            <div className="w-24 h-24 bg-purple-100 text-purple-600 rounded-3xl flex items-center justify-center mb-8 mx-auto">
              <Loader size={64} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              २. हामी बुझ्छौं
            </h3>
            <p className="text-lg text-slate-600 font-medium mb-2">
              AI understands you
            </p>
            <p className="text-slate-500 leading-relaxed">
              Our smart assistant understands your Nepali perfectly.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white p-10 rounded-4xl border border-green-50 text-center card-shadow card-shadow-hover hover:-translate-y-2 transition-transform duration-300">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mb-8 mx-auto">
              <CalendarCheck size={64} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              ३. बुक भयो!
            </h3>
            <p className="text-lg text-slate-600 font-medium mb-2">
              Appointment is booked
            </p>
            <p className="text-slate-500 leading-relaxed">
              Your appointment is confirmed instantly. It's that easy!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
