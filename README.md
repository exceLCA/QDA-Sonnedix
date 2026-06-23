# Quality Document Analyzer (QDA)

Internal AI pilot tool for Sonnedix Italy. QDA lets employees upload project
documents (PDF, DOCX, TXT) and get an AI-powered compliance analysis against
Italian renewable energy regulatory standards, plus a portfolio-wide view of
document health across the operating plant fleet.

## Features

- **Portfolio Dashboard** — KPI cards and a sortable table of 8 sample
  Italian solar plants with document compliance health.
- **Analyze Document** — drag-and-drop upload of a PDF/DOCX/TXT file;
  extracts the text server-side and sends it to Claude for classification,
  field extraction, and compliance checks against 12 Italian/EU regulatory
  standards. Results render as a structured panel (classification +
  confidence, extracted fields, compliance cards, risk summary, recommended
  actions, completeness score).
- **Expiry Calendar** — upcoming document expirations across the portfolio,
  sorted by urgency (computed live from each document's expiry date).
- **Regulatory Standards** — reference grid of the 12 standards QDA checks
  against (TU FER, GSE Conto Energia I-V, FER-X, CEI 0-16, CEI 0-21 Rev.
  2025, DL Agricoltura L.101/2024, VIA/VIA Screening, GRESB Infrastructure,
  CSRD/EU Taxonomy, D.Lgs. 81/2008, D.Lgs. 159/2011 Antimafia, Project
  Finance Covenants).

## Tech stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Anthropic Claude API (`claude-sonnet-4-6`) via `@anthropic-ai/sdk`, using
  forced tool-use for reliable structured JSON output
- `pdf-parse` for PDF text extraction, `mammoth` for DOCX
- Deploy-ready for Vercel

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and add your Anthropic API key:

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and set `ANTHROPIC_API_KEY` to a real key from
   [console.anthropic.com](https://console.anthropic.com/settings/keys).

3. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint the project

## How document analysis works

`POST /api/analyze` accepts `multipart/form-data` with a `file` field.

1. The file is validated (type: PDF/DOCX/TXT, size: 4MB max — chosen to stay
   under Vercel's serverless request body limit).
2. Text is extracted server-side: `pdf-parse` for PDFs, `mammoth` for DOCX,
   raw UTF-8 for TXT.
3. The extracted text (capped at 150,000 characters) is sent to Claude
   (`claude-sonnet-4-6`) with a system prompt describing the 14 Sonnedix
   document types, the 12 regulatory standards, and the required output
   shape. Claude is forced to call a `submit_compliance_analysis` tool so
   the response is always valid structured JSON — no fragile prompt
   parsing.
4. The structured result (document type, confidence, extracted fields,
   applicable standards, compliance flags, expiry dates, completeness
   score, risk summary, recommended actions) is returned to the client and
   rendered in the results panel.

The `ANTHROPIC_API_KEY` is only ever read server-side inside
`src/lib/claude.ts` / the API route — it is never sent to the browser.

## Deploying to Vercel

1. Push this repository to GitHub (or use the Vercel CLI directly).
2. Import the project in Vercel.
3. Set the `ANTHROPIC_API_KEY` environment variable in the Vercel project
   settings (Settings → Environment Variables) — do not commit it.
4. Deploy. No other configuration is required.

## Notes

- The Portfolio Dashboard, Expiry Calendar, and Regulatory Standards pages
  use static sample data (`src/lib/plants.ts`, `src/lib/expiry-alerts.ts`,
  `src/lib/standards.ts`) representative of a real Sonnedix Italy portfolio;
  they are not wired to a live database. Health status and KPIs are computed
  from that sample data, not hardcoded.
- Only the Analyze Document page performs a real, live AI analysis using
  whatever file you upload.

---

Quality Document Analyzer v1.0 — AI Pilot Project — Sonnedix Italy — Built
by Rusty Kenny Glade
