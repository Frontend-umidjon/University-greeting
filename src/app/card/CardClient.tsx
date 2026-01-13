"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import Image from "next/image";

type Status = "idle" | "loading" | "success" | "error";

export default function CardPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Друг";

  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStatus("loading");

    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setText(data.text);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, [name]);

  const downloadImage = async () => {
    if (!cardRef.current) return;

    const dataUrl = await htmlToImage.toPng(cardRef.current, {
      pixelRatio: 2,
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");
    link.download = `card-${name}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f3ff] via-[#fafafa] to-[#eef2ff] px-4 py-6">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        
        {/* КАРТОЧКА */}
        <div
          ref={cardRef}
          className="relative rounded-2xl bg-white/90 backdrop-blur-md shadow-[0_20px_60px_rgba(99,102,241,0.15)]
                     p-5 sm:p-7 md:p-8"
        >
          {/* Декоративный акцент */}
          <div className="pointer-events-none absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-indigo-100 blur-2xl" />

          {/* ЛОГОТИП */}
          <div className="mb-5 sm:mb-6 flex justify-center">
            <Image
              src="/university-logo.svg"
              alt="Cyber University logo"
              width={140}
              height={90}
              className="opacity-90 sm:w-[160px]"
            />
          </div>

          {/* ПРИВЕТСТВИЕ */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
            Привет, <span className="text-indigo-600">{name}</span> 👋
          </h2>

          {/* ТЕКСТ */}
          {status === "loading" && (
            <p className="text-sm sm:text-base text-gray-500 animate-pulse">
              Подбираем тёплые слова…
            </p>
          )}

          {status === "success" && (
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
              {text}
            </p>
          )}

          {status === "error" && (
            <p className="text-sm text-rose-500">
              Не удалось создать сообщение 🤍
            </p>
          )}

          {/* ПОДПИСЬ */}
          {status === "success" && (
            <div className="mt-6 text-xs sm:text-sm text-gray-500 text-right">
              С уважением,<br />
              <span className="font-medium text-gray-700">
                Cyber University
              </span>
            </div>
          )}
        </div>

        {/* КНОПКА */}
        {status === "success" && (
          <button
            onClick={downloadImage}
            className="mt-4 w-full rounded-xl bg-indigo-600 py-2.5 sm:py-3
                       text-sm sm:text-base text-white hover:bg-indigo-700 transition"
          >
            Скачать как изображение
          </button>
        )}
      </div>
    </main>
  );
}
