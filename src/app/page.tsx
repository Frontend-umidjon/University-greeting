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
      <div className="w-full max-w-sm rounded-2xl bg-white/80 backdrop-blur-md shadow-[0_20px_60px_rgba(99,102,241,0.15)] p-8">
        
        {/* Акцент */}
        <div className="absolute -top-3 -right-3 w-20 h-20 rounded-full bg-indigo-100 blur-2xl" />

        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          Персональная открытка ✨
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
         Привет это Cyber University 
         У нас есть желание для тебя введи своё имя 
         и получи персональную открытку
        </p>

        <input
          className="w-full rounded-xl border border-gray-200 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
          placeholder="Введите имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="mt-4 w-full rounded-xl bg-indigo-600 py-2 text-white hover:bg-indigo-700 transition"
        >
          Посмотреть желание
        </button>

        <div className="mt-6 text-xs text-gray-400 text-center">
          Made by Umidjon
        </div>
      </div>
    </main>
  );
}
