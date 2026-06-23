import KpiCard from "@/components/KpiCard";
import PlantsTable from "@/components/PlantsTable";
import { computePortfolioKpis, getPlantsWithHealth } from "@/lib/plants";

export default function DashboardPage() {
  const plants = getPlantsWithHealth();
  const kpis = computePortfolioKpis(plants);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-navy">Portfolio Dashboard</h2>
        <p className="mt-1 text-sm text-slate-500">
          Document compliance status across the Sonnedix Italy operating portfolio.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <KpiCard label="Total MW" value={`${kpis.totalMw.toLocaleString()} MW`} />
        <KpiCard label="Total Documents" value={kpis.totalDocuments.toLocaleString()} />
        <KpiCard label="Compliance Rate" value={`${kpis.complianceRate.toFixed(1)}%`} accent="cyan" />
        <KpiCard label="Expiring Soon" value={kpis.expiringSoon.toString()} accent="amber" />
        <KpiCard label="Missing Documents" value={kpis.missingDocuments.toString()} accent="red" />
      </div>

      <PlantsTable plants={plants} />
    </div>
  );
}
