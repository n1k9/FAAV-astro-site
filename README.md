# F.A.A.V. — Famiglie Adottive Alto Vicentino

Sito statico dell'associazione, costruito con [Astro](https://astro.build).
URL di produzione: <https://famiglieadottivealtovicentino.it>

## Comandi

| Comando           | Azione                                                      |
| :---------------- | :---------------------------------------------------------- |
| `npm install`     | Installa le dipendenze                                     |
| `npm run dev`     | Avvia il server di sviluppo su `localhost:4321`            |
| `npm run check`   | Controlla i tipi e gli errori (`astro check`)              |
| `npm run build`   | Esegue `astro check` e genera il sito in `./dist/`         |
| `npm run preview` | Serve localmente la build di produzione                    |

## Struttura

```text
public/
├── documenti/          # PDF e altri file scaricabili (copiati così come sono)
└── img/                # immagini referenziate dai contenuti
src/
├── assets/             # immagini importate (passate da Vite)
├── components/         # componenti riusabili (es. DocumentoPdf.astro)
├── content/
│   ├── news/           # articoli .md della collection "news"
│   └── documenti/      # schede .md della collection "documenti"
├── content.config.ts   # schema e loader delle collection
├── layouts/Base.astro  # layout unico: <head>, header, nav, footer
├── pages/              # routing basato su file
│   ├── 404.astro
│   ├── chi-siamo.astro
│   ├── contatti.astro
│   ├── documenti/index.astro  # elenco dei documenti scaricabili
│   ├── index.astro
│   ├── statuto.astro   # anteprima del PDF dello statuto
│   └── news/
│       ├── index.astro  # elenco
│       └── [id].astro    # dettaglio, una pagina per entry della collection
└── styles/global.css
```

## Contenuti: come si aggiunge una news

1. Crea `src/content/news/YYYY-MM-DD-titolo.md`. Il nome del file (senza estensione)
   diventa l'URL: `/news/YYYY-MM-DD-titolo/`.
2. Frontmatter obbligatorio:

   ```md
   ---
   title: "Titolo della news"
   date: 2026-10-04
   summary: "Testo breve, usato in home, in elenco e come meta description."
   ---

   Corpo dell'articolo in Markdown.
   ```

Lo schema è definito in `src/content.config.ts`: `title` e `date` sono obbligatori,
`summary` è opzionale. `date` è la data di pubblicazione dell'articolo.

## Documenti: come si aggiunge un PDF

1. Copia il file in `public/documenti/` in **minuscolo-kebab-case**, senza spazi né
   accenti (es. `statuto-faav-2020-rev1.pdf`). La cartella `public/documenti/` viene
   servita così com'è: l'URL del file è `/documenti/<nome-file>`.
2. Crea la scheda in `src/content/documenti/<nome-file>.md`:

   ```md
   ---
   title: "Statuto dell'associazione (rev. 2020)"
   file: /documenti/statuto-faav-2020-rev1.pdf
   page: /statuto/
   description: Testo vigente dello statuto, revisione 2020.
   order: 1
   ---
   ```

   - `file`: percorso del PDF in `public/` (obbligatorio)
   - `page`: URL di una pagina che ne mostra l'anteprima; se assente, il titolo
     nell'elenco `/documenti/` apre direttamente il file
   - `order`: posizione nell'elenco, default 99
   - `updated`: data di revisione, opzionale (mostrata come "Aggiornato al …")

La pagina `/documenti/` elenca le schede in automatico. `/statuto/` mostra l'anteprima
del PDF tramite `src/components/DocumentoPdf.astro` (stesso componente da riusare per
un eventuale `regolamento.astro`).

## Note

- L'URL canonico del sito è impostato in `astro.config.mjs` (`site`): serve per i
  link `rel="canonical"` e i meta tag Open Graph. Va aggiornato se il dominio cambia.
- Non c'è ancora un'immagine Open Graph: va creato un'immagine 1200x630 e referenziata
  in `src/layouts/Base.astro` con `og:image`.
- I segnaposto ancora da completare sono marcati con `<!-- TODO: ... -->` nel sorgente
  (testi di home e chi siamo, contatti e social, P.IVA in footer, altri direttivi).
