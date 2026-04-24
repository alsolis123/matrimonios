import Link from "next/link";
import { cookies } from "next/headers";
import { PresentationNav } from "@/components/admin/presentation-nav";
import { getAdminDashboardData } from "@/lib/admin/dashboard";
import {
  ADMIN_SESSION_COOKIE,
  isAdminSessionValueValid,
} from "@/lib/admin/session";

type PresentationPageProps = {
  searchParams: Promise<{ slide?: string }>;
};

export default async function PresentationPage({
  searchParams,
}: PresentationPageProps) {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isAdminSessionValueValid(adminSession)) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#7a1919_0%,#351015_32%,#13070a_72%,#090406_100%)] px-5 py-8 text-foreground sm:px-6 sm:py-10">
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col justify-center rounded-[2rem] border border-amber-100/15 bg-black/25 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/90">
            Presentacion
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-50">
            Necesitas entrar primero a administracion
          </h1>
          <p className="mt-4 text-base leading-7 text-stone-200/80">
            El modo de presentacion usa la misma sesion protegida por PIN.
          </p>
          <div className="mt-8">
            <Link
              className="rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
              href="/administracion"
            >
              Ir a administracion
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const { slide } = await searchParams;
  const dashboard = await getAdminDashboardData();
  const slides = [
    {
      eyebrow: "Panorama general",
      title: "Resumen de participacion",
      body: "Esta vista muestra el volumen actual de respuestas y la distribucion entre hombres y mujeres. Es una lectura rapida del estado general del levantamiento.",
      accent: "amber",
      content: (
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-amber-100/15 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
              Total de encuestas
            </p>
            <p className="mt-4 text-5xl font-semibold text-stone-50">
              {dashboard.totalSubmissions}
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-amber-100/15 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
              Hombres
            </p>
            <p className="mt-4 text-5xl font-semibold text-stone-50">
              {dashboard.menCount}
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-amber-100/15 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
              Mujeres
            </p>
            <p className="mt-4 text-5xl font-semibold text-stone-50">
              {dashboard.womenCount}
            </p>
          </div>
        </div>
      ),
    },
    {
      eyebrow: "Lectura principal",
      title: "Fortaleza agregada actual",
      body: "La categoria con mejor promedio muestra donde, en conjunto, la iglesia refleja mayor estabilidad o consistencia en la evaluacion matrimonial.",
      accent: "emerald",
      content: (
        <div className="rounded-[2rem] border border-emerald-300/15 bg-emerald-500/10 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200">
            Categoria mas fuerte
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-stone-50 sm:text-5xl">
            {dashboard.scoreSummary.strongest.title}
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-200/85">
            {dashboard.scoreSummary.strongest.description}
          </p>
          <p className="mt-6 text-base font-semibold uppercase tracking-[0.2em] text-emerald-200/90">
            Promedio actual: {dashboard.scoreSummary.strongest.average.toFixed(2)} / 5
          </p>
        </div>
      ),
    },
    {
      eyebrow: "Areas sensibles",
      title: "Debilidades agregadas que requieren atencion",
      body: "Estas dos categorias concentran los promedios mas bajos. Son las areas donde probablemente conviene enfocar exhortacion, acompanamiento y accion pastoral.",
      accent: "rose",
      content: (
        <div className="grid gap-5 lg:grid-cols-2">
          {dashboard.scoreSummary.weaknesses.map((weakness) => (
            <article
              className="rounded-[2rem] border border-rose-200/15 bg-rose-500/10 p-6"
              key={weakness.id}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">
                Categoria
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-stone-50">
                {weakness.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-stone-200/85">
                {weakness.description}
              </p>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-rose-200/90">
                Promedio actual: {weakness.average.toFixed(2)} / 5
              </p>
            </article>
          ))}
        </div>
      ),
    },
    {
      eyebrow: "Detalle completo",
      title: "Comparacion de promedios por categoria",
      body: "Esta vista permite recorrer el mapa completo de la evaluacion y comparar de manera simple el peso relativo de cada area.",
      accent: "amber",
      content: (
        <div className="space-y-4">
          {dashboard.scoreSummary.categoryScores.map((category) => (
            <div
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5"
              key={category.id}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-3xl">
                  <p className="text-2xl font-semibold text-stone-50">
                    {category.title}
                  </p>
                  <p className="mt-2 text-base leading-7 text-stone-200/80">
                    {category.description}
                  </p>
                </div>
                <div className="min-w-32">
                  <p className="text-right text-3xl font-semibold text-amber-200">
                    {category.average.toFixed(2)}
                  </p>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-amber-300"
                      style={{ width: `${(category.average / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const totalSlides = slides.length;
  const parsedSlide = Number(slide ?? "0");
  const currentSlide =
    Number.isFinite(parsedSlide) && parsedSlide >= 0 && parsedSlide < totalSlides
      ? parsedSlide
      : 0;
  const activeSlide = slides[currentSlide];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#5a1212_0%,#250b10_32%,#100609_72%,#080305_100%)] px-5 py-6 text-foreground sm:px-6 sm:py-8">
      <section className="mx-auto max-w-7xl space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/90">
              Modo presentacion
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-50 sm:text-4xl">
              Lectura guiada de resultados agregados
            </h1>
          </div>

          <Link
            className="rounded-full border border-amber-200/20 px-5 py-3 text-sm font-semibold text-stone-100 transition hover:border-amber-300/50"
            href="/administracion"
          >
            Volver al panel
          </Link>
        </div>

        <PresentationNav totalSlides={totalSlides} />

        <article className="rounded-[2.5rem] border border-amber-100/12 bg-black/30 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/90">
            {activeSlide.eyebrow}
          </p>
          <h2 className="mt-4 max-w-5xl text-4xl font-semibold leading-tight text-stone-50 sm:text-5xl lg:text-6xl">
            {activeSlide.title}
          </h2>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-stone-200/82">
            {activeSlide.body}
          </p>

          <div className="mt-10">{activeSlide.content}</div>
        </article>
      </section>
    </main>
  );
}
