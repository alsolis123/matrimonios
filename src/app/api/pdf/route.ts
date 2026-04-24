import { getSurveyResultByToken } from "@/lib/results/service";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return new Response("Falta el token del resultado.", { status: 400 });
  }

  const result = await getSurveyResultByToken(token);

  if (!result) {
    return new Response("No se encontro el resultado solicitado.", {
      status: 404,
    });
  }

  const completedAt = new Date(result.submission.completedAt).toLocaleString(
    "es-CR",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  );

  const weaknessSections = result.summary.weaknesses
    .map(
      (weakness) => `
        <section class="block weakness">
          <p class="eyebrow">Area que necesita crecer</p>
          <h2>${escapeHtml(weakness.title)}</h2>
          <p class="description">${escapeHtml(weakness.description)}</p>
          <p class="score">Promedio: ${weakness.average.toFixed(2)} / 5</p>
          <h3>Sugerencias para esta semana</h3>
          <ul>
            ${weakness.suggestions
              .map((suggestion) => `<li>${escapeHtml(suggestion)}</li>`)
              .join("")}
          </ul>
        </section>
      `,
    )
    .join("");

  const categoriesTable = result.summary.categoryScores
    .map(
      (category) => `
        <tr>
          <td>${escapeHtml(category.title)}</td>
          <td>${escapeHtml(category.description)}</td>
          <td>${category.average.toFixed(2)}</td>
        </tr>
      `,
    )
    .join("");

  const html = `<!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Resultado Matrimonial</title>
      <style>
        :root {
          --bg: #f7f2eb;
          --ink: #221619;
          --muted: #5b4a4f;
          --accent: #8f251f;
          --gold: #b88422;
          --panel: #fffdf9;
          --line: #e6d8ca;
          --green: #e7f3eb;
          --rose: #f8e6e7;
        }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          background: var(--bg);
          color: var(--ink);
          font-family: Georgia, "Times New Roman", serif;
        }
        .page {
          max-width: 900px;
          margin: 0 auto;
          padding: 32px 24px 64px;
        }
        .toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }
        .toolbar button {
          border: 0;
          border-radius: 999px;
          background: var(--accent);
          color: white;
          padding: 12px 18px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }
        .note {
          font-family: Arial, sans-serif;
          color: var(--muted);
          font-size: 14px;
        }
        .hero, .block {
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 24px;
          margin-bottom: 20px;
        }
        .hero {
          background: linear-gradient(180deg, rgba(143,37,31,0.08), rgba(255,255,255,0.98));
        }
        .eyebrow {
          margin: 0;
          font-family: Arial, sans-serif;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.24em;
          color: var(--gold);
          font-weight: 700;
        }
        h1 {
          margin: 14px 0 10px;
          font-size: 42px;
          line-height: 1.05;
        }
        h2 {
          margin: 12px 0 10px;
          font-size: 28px;
        }
        h3 {
          margin: 18px 0 8px;
          font-size: 16px;
          font-family: Arial, sans-serif;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        p {
          margin: 0;
          line-height: 1.7;
        }
        .meta {
          margin-top: 14px;
          color: var(--muted);
          font-family: Arial, sans-serif;
          font-size: 14px;
        }
        .strength {
          background: var(--green);
        }
        .weakness {
          background: var(--rose);
        }
        .description {
          color: var(--muted);
        }
        .score {
          margin-top: 12px;
          font-family: Arial, sans-serif;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        ul {
          margin: 12px 0 0;
          padding-left: 18px;
        }
        li {
          margin: 0 0 8px;
          line-height: 1.6;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 14px;
          font-family: Arial, sans-serif;
        }
        th, td {
          border-bottom: 1px solid var(--line);
          padding: 12px 10px;
          vertical-align: top;
          text-align: left;
          font-size: 14px;
          line-height: 1.5;
        }
        th {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
        }
        @media print {
          body { background: white; }
          .page { max-width: none; padding: 0; }
          .toolbar { display: none; }
          .hero, .block { break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <main class="page">
        <div class="toolbar">
          <button onclick="window.print()">Guardar como PDF</button>
          <p class="note">Se abrira el cuadro de impresion del navegador para guardar este resumen como PDF.</p>
        </div>

        <section class="hero">
          <p class="eyebrow">Resultado personal</p>
          <h1>Resumen de evaluacion matrimonial</h1>
          <p>Este resumen busca ayudarte a reconocer con claridad una fortaleza y dos areas que necesitan crecer, junto con acciones concretas para esta semana.</p>
          <p class="meta">Encuesta completada el ${escapeHtml(completedAt)}.</p>
        </section>

        <section class="block strength">
          <p class="eyebrow">Fortaleza principal</p>
          <h2>${escapeHtml(result.summary.strongest.title)}</h2>
          <p class="description">${escapeHtml(result.summary.strongest.description)}</p>
          <p class="score">Promedio: ${result.summary.strongest.average.toFixed(2)} / 5</p>
        </section>

        ${weaknessSections}

        <section class="block">
          <p class="eyebrow">Vista general</p>
          <h2>Promedios por categoria</h2>
          <table>
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Descripcion</th>
                <th>Promedio</th>
              </tr>
            </thead>
            <tbody>
              ${categoriesTable}
            </tbody>
          </table>
        </section>
      </main>
      <script>
        setTimeout(() => {
          window.print();
        }, 250);
      </script>
    </body>
  </html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
