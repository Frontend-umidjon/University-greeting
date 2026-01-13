import { Suspense } from "react";
import CardClient from "./CardClient";

export default function CardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Загрузка…</div>}>
      <CardClient />
    </Suspense>
  );
}
