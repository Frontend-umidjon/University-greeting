"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!name.trim()) return;
    router.push(`/card?name=${encodeURIComponent(name)}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f3ff] via-[#fafafa] to-[#eef2ff] px-4">
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl bg-white/80 backdrop-blur-md shadow-[0_20px_60px_rgba(99,102,241,0.15)] p-6 sm:p-8">
        
        {/* Декоративный акцент */}
        <div className="pointer-events-none absolute -top-4 -right-4 w-24 h-24 rounded-full bg-indigo-100 blur-2xl sm:w-28 sm:h-28" />

        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-3">
          Персональная открытка ✨
        </h1>

        <p className="text-sm sm:text-base text-gray-500 text-center mb-6 leading-relaxed">
          Привет, это <span className="font-medium text-gray-700">Cyber University</span>.
          <br className="hidden sm:block" />
          Введите своё имя и получите персональное поздравление.
        </p>

        <input
          className="w-full rounded-xl border border-gray-200 px-4 py-2 sm:py-3 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          placeholder="Введите имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="mt-4 w-full rounded-xl bg-indigo-600 py-2.5 sm:py-3 text-white text-sm sm:text-base hover:bg-indigo-700 transition"
        >
          Посмотреть поздравление
        </button>

        <div className="mt-6 text-xs sm:text-sm text-gray-400 text-center">
          Made by Umidjon
        </div>
      </div>
    </main>
  );
}
