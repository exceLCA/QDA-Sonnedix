import type { HealthStatus, Plant, PlantWithHealth } from "./types";

export const PLANTS: Plant[] = [
  {
    id: "aprilia-2",
    name: "Sonnedix Aprilia 2",
    region: "Lazio",
    mw: 14,
    revenueRegime: "Subsidy-free PPA",
    status: "Operational",
    totalDocuments: 87,
    documentsMissing: 1,
    documentsExpiring: 3,
  },
  {
    id: "ponte-barca",
    name: "Sonnedix Ponte Barca",
    region: "Lazio",
    mw: 32,
    revenueRegime: "FER-X",
    status: "Commissioning",
    totalDocuments: 64,
    documentsMissing: 5,
    documentsExpiring: 6,
  },
  {
    id: "sicilia-pv-1",
    name: "Sonnedix Sicilia PV-1",
    region: "Sicily",
    mw: 70,
    revenueRegime: "PPA + BESS",
    status: "Under Construction",
    totalDocuments: 112,
    documentsMissing: 4,
    documentsExpiring: 9,
  },
  {
    id: "lazio-portfolio-a",
    name: "Sonnedix Lazio Portfolio A",
    region: "Lazio",
    mw: 91,
    revenueRegime: "Conto Energia IV",
    status: "Operational",
    totalDocuments: 156,
    documentsMissing: 0,
    documentsExpiring: 5,
  },
  {
    id: "puglia-solar",
    name: "Sonnedix Puglia Solar",
    region: "Puglia",
    mw: 45,
    revenueRegime: "Conto Energia III",
    status: "Operational",
    totalDocuments: 98,
    documentsMissing: 0,
    documentsExpiring: 2,
  },
  {
    id: "sardinia-pv",
    name: "Sonnedix Sardinia PV",
    region: "Sardinia",
    mw: 28,
    revenueRegime: "Conto Energia V",
    status: "Operational",
    totalDocuments: 74,
    documentsMissing: 0,
    documentsExpiring: 2,
  },
  {
    id: "emilia-bess",
    name: "Sonnedix Emilia BESS",
    region: "Emilia-Romagna",
    mw: 18,
    revenueRegime: "MACSE",
    status: "Under Construction",
    totalDocuments: 56,
    documentsMissing: 2,
    documentsExpiring: 3,
  },
  {
    id: "basilicata-pv",
    name: "Sonnedix Basilicata PV",
    region: "Basilicata",
    mw: 55,
    revenueRegime: "Conto Energia II",
    status: "Operational",
    totalDocuments: 134,
    documentsMissing: 0,
    documentsExpiring: 0,
  },
];

export function computeHealth(documentsMissing: number, documentsExpiring: number): HealthStatus {
  if (documentsMissing >= 3 || documentsExpiring >= 8) return "Critical";
  if (documentsMissing >= 1 || documentsExpiring >= 3) return "Warning";
  return "Compliant";
}

export function withHealth(plant: Plant): PlantWithHealth {
  const documentsCompliant = plant.totalDocuments - plant.documentsMissing - plant.documentsExpiring;
  return {
    ...plant,
    documentsCompliant,
    health: computeHealth(plant.documentsMissing, plant.documentsExpiring),
  };
}

export function getPlantsWithHealth(): PlantWithHealth[] {
  return PLANTS.map(withHealth);
}

export interface PortfolioKpis {
  totalMw: number;
  totalDocuments: number;
  complianceRate: number;
  expiringSoon: number;
  missingDocuments: number;
}

export function computePortfolioKpis(plants: PlantWithHealth[]): PortfolioKpis {
  const totalMw = plants.reduce((sum, p) => sum + p.mw, 0);
  const totalDocuments = plants.reduce((sum, p) => sum + p.totalDocuments, 0);
  const totalCompliant = plants.reduce((sum, p) => sum + p.documentsCompliant, 0);
  const expiringSoon = plants.reduce((sum, p) => sum + p.documentsExpiring, 0);
  const missingDocuments = plants.reduce((sum, p) => sum + p.documentsMissing, 0);
  const complianceRate = totalDocuments === 0 ? 0 : (totalCompliant / totalDocuments) * 100;

  return { totalMw, totalDocuments, complianceRate, expiringSoon, missingDocuments };
}
