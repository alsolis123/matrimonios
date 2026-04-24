"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function AdminPinGate() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const response = await fetch("/api/admin/pin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pin }),
    });

    const payload = (await response.json()) as
      | { ok: true }
      | { ok: false; message: string };

    if (!response.ok || !payload.ok) {
      setError(
        "message" in payload
          ? payload.message
          : "No se pudo validar el PIN.",
      );
      return;
    }

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="rounded-[2rem] border border-amber-100/15 bg-black/25 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/90">
        Acceso administrativo
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-50 sm:text-4xl">
        Ingresa el PIN de liderazgo
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-stone-200/80">
        Esta area esta reservada para revisar resultados agregados, exportar
        datos y entrar al modo de presentacion.
      </p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
            PIN
          </span>
          <input
            autoComplete="one-time-code"
            className="w-full rounded-[1.25rem] border border-amber-100/15 bg-white/5 px-4 py-4 text-lg tracking-[0.3em] text-stone-50 outline-none transition placeholder:text-stone-400 focus:border-amber-300/60"
            inputMode="numeric"
            maxLength={12}
            onChange={(event) => setPin(event.target.value)}
            placeholder="••••"
            type="password"
            value={pin}
          />
        </label>

        {error && (
          <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm leading-6 text-rose-100">
            {error}
          </div>
        )}

        <button
          className="rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={pin.trim().length === 0 || isPending}
          type="submit"
        >
          {isPending ? "Validando..." : "Entrar a administracion"}
        </button>
      </form>
    </div>
  );
}
