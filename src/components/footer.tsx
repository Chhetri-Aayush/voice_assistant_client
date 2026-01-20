export default function Footer() {
  return (
    <footer className="bg-white py-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          {/* <div className="bg-blue-500/10 p-1.5 rounded-lg"></div> */}
          <span className="text-xl font-bold text-slate-800">
            Nepali Voice Assistant
          </span>
        </div>

        {/* <div className="flex flex-wrap justify-center gap-8 text-slate-500 font-medium mb-12">
          <a href="#" className="hover:text-blue-500">
            About Us
          </a>
          <a href="#" className="hover:text-blue-500">
            Privacy
          </a>
          <a href="#" className="hover:text-blue-500">
            Contact
          </a>
          <a href="#" className="hover:text-blue-500">
            FAQ
          </a>
        </div> */}

        <p className="text-slate-400 text-sm">
          © 2026 Nepali Voice Assistant. All rights reserved.
          <br />
          Made for the people of Nepal.
        </p>
      </div>
    </footer>
  );
}
