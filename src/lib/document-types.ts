export const DOCUMENT_TYPES = [
  "AU",
  "PAS",
  "GSE Convention",
  "PPA",
  "STMG",
  "Surface Right",
  "O&M Contract",
  "Insurance",
  "EPC",
  "Fire Safety",
  "VIA",
  "GRESB Evidence",
  "Antimafia Certification",
  "Lender Report",
  "Other / Unclassified",
] as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[number];

export const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  AU: "Autorizzazione Unica (Single Authorization)",
  PAS: "Procedura Abilitativa Semplificata",
  "GSE Convention": "GSE Convenzione (Incentive Agreement)",
  PPA: "Power Purchase Agreement",
  STMG: "Soluzione Tecnica Minima Generale (Grid Connection)",
  "Surface Right": "Surface Right / Land Lease",
  "O&M Contract": "Operations & Maintenance Contract",
  Insurance: "Insurance Policy",
  EPC: "Engineering, Procurement & Construction Contract",
  "Fire Safety": "Fire Safety Certificate (CPI/SCIA Antincendio)",
  VIA: "Valutazione di Impatto Ambientale (EIA)",
  "GRESB Evidence": "GRESB Infrastructure Evidence Document",
  "Antimafia Certification": "Antimafia Certification (D.Lgs. 159/2011)",
  "Lender Report": "Lender / Project Finance Report",
  "Other / Unclassified": "Other / Unclassified Document",
};
