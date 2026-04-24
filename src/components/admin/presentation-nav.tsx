"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PresentationNavProps = {
  totalSlides: number;
};

export function PresentationNav({ totalSlides }: PresentationNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSlide = useMemo(() => {
    const rawValue = Number(searchParams.get("slide") ?? "0");

    if (!Number.isFinite(rawValue) || rawValue < 0) {
      return 0;
    }

    if (rawValue >= totalSlides) {
      return totalSlides - 1;
    }

    return rawValue;
  }, [searchParams, totalSlides]);

  function goToSlide(nextSlide: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("slide", `${nextSlide}`);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-black/25 p-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">
          Navegacion
        </p>
        <p className="mt-2 text-sm text-stone-200/80">
          Vista {currentSlide + 1} de {totalSlides}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          className="rounded-full border border-amber-200/20 px-4 py-2 text-sm font-semibold text-stone-100 transition hover:border-amber-300/50 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={currentSlide === 0}
          onClick={() => goToSlide(currentSlide - 1)}
          type="button"
        >
          Anterior
        </button>

        {Array.from({ length: totalSlides }, (_, index) => {
          const isActive = index === currentSlide;

          return (
            <button
              className={`h-10 w-10 rounded-full text-sm font-semibold transition ${
                isActive
                  ? "bg-amber-300 text-stone-950"
                  : "border border-amber-200/20 bg-white/5 text-stone-100 hover:border-amber-300/50"
              }`}
              key={index}
              onClick={() => goToSlide(index)}
              type="button"
            >
              {index + 1}
            </button>
          );
        })}

        <button
          className="rounded-full border border-amber-200/20 px-4 py-2 text-sm font-semibold text-stone-100 transition hover:border-amber-300/50 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={currentSlide === totalSlides - 1}
          onClick={() => goToSlide(currentSlide + 1)}
          type="button"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
