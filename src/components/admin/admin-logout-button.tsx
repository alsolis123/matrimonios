"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setError(null);
    setIsLoading(true);

    const response = await fetch("/api/admin/pin", {
      method: "DELETE",
    });

    if (!response.ok) {
      setError("No se pudo cerrar la sesion administrativa.");
      setIsLoading(false);
      return;
    }

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        className="rounded-full border border-amber-200/25 px-4 py-2 text-sm font-semibold text-stone-200 transition hover:border-amber-300/50 hover:text-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={isLoading || isPending}
        onClick={handleLogout}
        type="button"
      >
        {isLoading || isPending ? "Cerrando..." : "Cerrar sesion"}
      </button>
      {error && <p className="text-xs text-rose-200">{error}</p>}
    </div>
  );
}
