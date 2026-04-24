import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matrimonios",
  description: "Encuesta de evaluacion matrimonial para la iglesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <div className="flex-1">{children}</div>
        <footer className="border-t border-amber-100/10 bg-[#090406] px-5 py-6 text-stone-200 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-white px-1.5 py-1 shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
                <Image
                  alt="Iglesia Biblica Vida"
                  height={22}
                  priority
                  src="/iglesia-biblica-vida-logo.png"
                  width={75}
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-50">
                  Iglesia Biblica Vida - Heredia
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                  Ministerio de matrimonios
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm text-stone-400 sm:items-end">
              <p>Todos los derechos reservados.</p>
              <Link
                className="text-stone-300 transition hover:text-amber-200"
                href="/administracion"
              >
                Acceso administrativo
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
