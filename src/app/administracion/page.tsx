import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { AdminPinGate } from "@/components/admin/admin-pin-gate";
import {
  ADMIN_SESSION_COOKIE,
  isAdminSessionValueValid,
} from "@/lib/admin/session";
import { getAdminDashboardData } from "@/lib/admin/dashboard";

export const metadata: Metadata = {
  title: "Administracion | Matrimonios",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isAdminSessionValueValid(adminSession)) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#7a1919_0%,#351015_32%,#13070a_72%,#090406_100%)] px-5 py-8 text-foreground sm:px-6 sm:py-10">
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl flex-col justify-center">
          <AdminPinGate />
        </section>
      </main>
    );
  }

  const dashboard = await getAdminDashboardData();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#7a1919_0%,#351015_32%,#13070a_72%,#090406_100%)] px-5 py-8 text-foreground sm:px-6 sm:py-10">
      <section className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-[2rem] border border-amber-100/15 bg-black/25 px-6 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/90">
                Administracion
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-50 sm:text-4xl">
                Resumen general de la encuesta matrimonial
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-stone-200/80">
                Vista agregada para liderazgo. Aqui revisamos tendencias, fuerza
                relativa por categoria y el estado general de las respuestas
                recolectadas.
              </p>
            </div>

            <AdminLogoutButton />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-amber-100/15 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
              Encuestas completadas
            </p>
            <p className="mt-4 text-4xl font-semibold text-stone-50">
              {dashboard.totalSubmissions}
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-amber-100/15 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
              Hombres
            </p>
            <p className="mt-4 text-4xl font-semibold text-stone-50">
              {dashboard.menCount}
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-amber-100/15 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
              Mujeres
            </p>
            <p className="mt-4 text-4xl font-semibold text-stone-50">
              {dashboard.womenCount}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-[2rem] border border-amber-100/15 bg-black/25 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
              Promedios por categoria
            </p>
            <div className="mt-5 space-y-4">
              {dashboard.scoreSummary.categoryScores.map((category) => (
                <div
                  className="rounded-[1.25rem] border border-white/8 bg-white/5 p-4"
                  key={category.id}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <strong className="text-base text-stone-100">
                        {category.title}
                      </strong>
                      <p className="mt-1 text-sm leading-6 text-stone-300">
                        {category.description}
                      </p>
                    </div>
                    <span className="text-lg font-semibold text-amber-200">
                      {category.average.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-emerald-300/15 bg-emerald-500/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200">
                Categoria mas fuerte
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-stone-50">
                {dashboard.scoreSummary.strongest.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-stone-200/85">
                Promedio actual: {dashboard.scoreSummary.strongest.average.toFixed(2)} / 5
              </p>
            </div>

            <div className="rounded-[2rem] border border-rose-200/15 bg-rose-500/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-200">
                Categorias mas debiles
              </p>
              <div className="mt-4 space-y-3">
                {dashboard.scoreSummary.weaknesses.map((weakness) => (
                  <div
                    className="rounded-[1.25rem] border border-white/8 bg-black/20 p-4"
                    key={weakness.id}
                  >
                    <strong className="text-base text-stone-50">
                      {weakness.title}
                    </strong>
                    <p className="mt-1 text-sm text-stone-200/80">
                      Promedio actual: {weakness.average.toFixed(2)} / 5
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-amber-100/15 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
                Acciones siguientes
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-stone-50 transition hover:bg-white/16"
                  href="/api/export"
                >
                  Descargar export CSV
                </a>
                <Link
                  className="rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
                  href="/administracion/presentacion"
                >
                  Abrir modo presentacion
                </Link>
                <p className="text-sm leading-6 text-stone-300">
                  Ultima encuesta completada:{" "}
                  {dashboard.latestCompletion
                    ? new Date(dashboard.latestCompletion).toLocaleString(
                        "es-CR",
                        {
                          dateStyle: "medium",
                          timeStyle: "short",
                        },
                      )
                    : "Aun no hay respuestas registradas."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
