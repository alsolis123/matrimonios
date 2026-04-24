import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_top,#8d1d1d_0%,#3d0d12_32%,#14070a_72%,#090406_100%)] text-stone-50">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,214,10,0.12),transparent_30%,transparent_70%,rgba(255,214,10,0.08))]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(255,242,176,0.22),transparent_70%)]" />

      <section className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between gap-10 px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-amber-200/30 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-amber-200">
            Matrimonios
          </p>
          <p className="mb-6 text-sm uppercase tracking-[0.24em] text-stone-300/80">
            Iglesia Biblica Vida - Heredia
          </p>
          <h1 className="max-w-3xl font-serif text-5xl leading-none tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Una experiencia cuidada para examinar el matrimonio con honestidad.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-stone-200 sm:text-lg">
            La ruta publica debe mantenerse enfocada en la encuesta. La parte de
            administracion vive aparte para revisar resultados agregados,
            exportaciones y la presentacion interna.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-1">
          <Link className="route-card" href="/encuesta">
            <span className="route-card__eyebrow">Participantes</span>
            <strong className="route-card__title">Comenzar evaluacion</strong>
            <span className="route-card__body">
              Entrada principal para el participante: seleccion de version,
              preguntas una por una y envio de respuestas.
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
