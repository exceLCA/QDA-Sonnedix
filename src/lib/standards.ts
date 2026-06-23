import type { RegulatoryStandard } from "./types";

export const REGULATORY_STANDARDS: RegulatoryStandard[] = [
  {
    id: "tu-fer",
    name: "TU FER",
    category: "Permitting",
    description:
      "Testo Unico per le Fonti Rinnovabili (D.Lgs. 190/2024) — the consolidated national framework governing authorization procedures for renewable energy plants, including AU and PAS pathways.",
  },
  {
    id: "gse-conto-energia",
    name: "GSE Conto Energia I-V",
    category: "Incentives",
    description:
      "The five successive Conto Energia feed-in-tariff schemes administered by GSE (Gestore dei Servizi Energetici) for PV plants commissioned between 2005 and 2013.",
  },
  {
    id: "fer-x",
    name: "FER-X",
    category: "Incentives",
    description:
      "The current competitive-auction and incentive-tariff mechanism (D.M. FER-X) for new renewable capacity, successor to the Conto Energia and FER-1 schemes.",
  },
  {
    id: "cei-0-16",
    name: "CEI 0-16",
    category: "Grid",
    description:
      "Technical rule for connecting active and passive users to the MV distribution network, covering protection systems and grid interface requirements.",
  },
  {
    id: "cei-0-21-rev2025",
    name: "CEI 0-21 Rev. 2025",
    category: "Grid",
    description:
      "Technical rule for LV grid connections, updated in 2025 with revised requirements for storage interoperability and dynamic grid support functions.",
  },
  {
    id: "dl-agricoltura",
    name: "DL Agricoltura L.101/2024",
    category: "Land Use",
    description:
      "Law 101/2024 restricting ground-mounted PV installation on agricultural land and setting siting conditions to protect agri-food production.",
  },
  {
    id: "via-screening",
    name: "VIA / VIA Screening",
    category: "Environmental",
    description:
      "Environmental Impact Assessment and pre-assessment screening required for utility-scale plants under national and regional environmental codes.",
  },
  {
    id: "gresb-infrastructure",
    name: "GRESB Infrastructure",
    category: "ESG",
    description:
      "Annual GRESB Infrastructure Asset Assessment benchmarking ESG performance and management practices across the operating portfolio.",
  },
  {
    id: "csrd-eu-taxonomy",
    name: "CSRD / EU Taxonomy",
    category: "ESG",
    description:
      "EU Corporate Sustainability Reporting Directive and Taxonomy Regulation alignment, governing sustainability disclosures and green-activity classification.",
  },
  {
    id: "dlgs-81-2008",
    name: "D.Lgs. 81/2008",
    category: "Safety",
    description:
      "Italy's consolidated occupational health and safety code, applicable to construction sites, O&M activities, and EPC contractor obligations.",
  },
  {
    id: "dlgs-159-2011-antimafia",
    name: "D.Lgs. 159/2011 Antimafia",
    category: "Corporate",
    description:
      "Anti-mafia code requiring certification and informativa antimafia for SPVs, contractors, and counterparties above statutory thresholds.",
  },
  {
    id: "project-finance-covenants",
    name: "Project Finance Covenants",
    category: "Finance",
    description:
      "Lender-imposed financial and operational covenants under non-recourse project finance facilities, monitored via periodic compliance and lender reports.",
  },
];

export const STANDARD_NAMES = REGULATORY_STANDARDS.map((s) => s.name);

export const STANDARD_CATEGORY_STYLES: Record<string, string> = {
  Permitting: "bg-blue-50 text-blue-700 border-blue-200",
  Incentives: "bg-cyan-50 text-cyan-700 border-cyan-200",
  Grid: "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Land Use": "bg-lime-50 text-lime-700 border-lime-200",
  Environmental: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ESG: "bg-purple-50 text-purple-700 border-purple-200",
  Safety: "bg-orange-50 text-orange-700 border-orange-200",
  Corporate: "bg-slate-100 text-slate-700 border-slate-300",
  Finance: "bg-amber-50 text-amber-700 border-amber-200",
};
