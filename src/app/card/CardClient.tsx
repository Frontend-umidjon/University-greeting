"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import Image from "next/image";

type Status = "idle" | "loading" | "success" | "error";

export default function CardClient() {
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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f3ff] via-[#fafafa] to-[#eef2ff] px-4">
      <div className="w-full max-w-md">
        <div
          ref={cardRef}
          className="relative rounded-2xl bg-white/90 backdrop-blur-md shadow-[0_20px_60px_rgba(99,102,241,0.15)] p-8"
        >
          <div className="absolute -top-3 -right-3 w-20 h-20 rounded-full bg-indigo-100 blur-2xl" />

          <div className="mb-6 flex justify-center">
            <Image
              src="/university-logo.png"
              alt="University logo"
              width={80}
              height={80}
            />
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Привет, <span className="text-indigo-600">{name}</span> 👋
          </h2>

          {status === "loading" && (
            <p className="text-gray-500 animate-pulse">
              Подбираем тёплые слова…
            </p>
          )}

          {status === "success" && (
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {text}
            </p>
          )}

          {status === "error" && (
            <p className="text-rose-500">
              Не удалось создать сообщение 🤍
            </p>
          )}

          {status === "success" && (
            <div className="mt-6 text-sm text-gray-500 text-right">
              С уважением,<br />
              <span className="font-medium text-gray-700">
                Название университета
              </span>
            </div>
          )}
        </div>

        {status === "success" && (
          <button
            onClick={downloadImage}
            className="mt-4 w-full rounded-xl bg-indigo-600 py-2 text-white hover:bg-indigo-700 transition"
          >
            Скачать как изображение
          </button>
        )}
      </div>
    </main>
  );
}
