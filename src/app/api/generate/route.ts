export const runtime = "nodejs";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "University Greeting Platform",
  },
});

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name || typeof name !== "string") {
      return Response.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        {
          role: "system",
          content:
            "Ты официальный автор поздравлений для университета. Пишешь кратко, тепло и уважительно.",
        },
        {
          role: "user",
          content: `
Создай персональное поздравление с Днём защитников родины то есть 14 января Узбекистан
для человека по имени ${name}.

Требования:
- 1–2 предложения
- официальный, но тёплый тон
- без эмодзи
- без HTML, тегов и спецсимволов
- подходит для университетской открытки
- текст должен быть универсальным и позитивным
`,
        },
      ],
      max_tokens: 60,
      temperature: 0.7,
    });

    let text = completion.choices[0]?.message?.content || "";

    // 🧹 очистка служебных токенов и мусора
    text = text
      .replace(/<\/?s>/g, "")
      .replace(/<\/?[^>]+>/g, "")
      .replace(/\n+/g, " ")
      .trim();

    return Response.json({ text });
  } catch (error) {
    console.error("OPENROUTER ERROR:", error);
    return Response.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}
