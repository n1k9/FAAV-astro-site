# F.A.A.V. — Famiglie Adottive Alto Vicentino

Sito statico dell'associazione, costruito con [Astro](https://astro.build).
URL di produzione: <https://famigleadottivealtovicentino.it>

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
src/
├── assets/            # immagini importate (passate da Vite)
├── content/news/      # articoli .md della collection "news"
├── content.config.ts  # schema e loader della collection
├── layouts/Base.astro # layout unico: <head>, header, nav, footer
├── pages/             # routing basato su file
│   ├── 404.astro
│   ├── chi-siamo.astro
│   ├── contatti.astro
│   ├── index.astro
│   ├── statuto.astro
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

## Note

- L'URL canonico del sito è impostato in `astro.config.mjs` (`site`): serve per i
  link `rel="canonical"` e i meta tag Open Graph. Va aggiornato se il dominio cambia.
- Non c'è ancora un'immagine Open Graph: va creato un'immagine 1200x630 e referenziata
  in `src/layouts/Base.astro` con `og:image`.
- I segnaposto ancora da completare sono marcati con `<!-- TODO: ... -->` nel sorgente
  (testi di home e chi siamo, contatti e social, testo dello statuto, P.IVA in footer).
