import type { PlantWithHealth } from "@/lib/types";
import HealthBadge from "./HealthBadge";

const STATUS_STYLES: Record<string, string> = {
  Operational: "bg-emerald-50 text-emerald-700",
  Commissioning: "bg-blue-50 text-blue-700",
  "Under Construction": "bg-amber-50 text-amber-700",
};

export default function PlantsTable({ plants }: { plants: PlantWithHealth[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[1000px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3 font-medium">Plant Name</th>
            <th className="px-4 py-3 font-medium">Region</th>
            <th className="px-4 py-3 font-medium text-right">MW</th>
            <th className="px-4 py-3 font-medium">Revenue Regime</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Total Docs</th>
            <th className="px-4 py-3 font-medium text-right">Compliant</th>
            <th className="px-4 py-3 font-medium text-right">Expiring (90d)</th>
            <th className="px-4 py-3 font-medium text-right">Missing</th>
            <th className="px-4 py-3 font-medium">Health</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {plants.map((plant) => (
            <tr key={plant.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-navy">{plant.name}</td>
              <td className="px-4 py-3 text-slate-600">{plant.region}</td>
              <td className="px-4 py-3 text-right text-slate-600">{plant.mw}</td>
              <td className="px-4 py-3 text-slate-600">{plant.revenueRegime}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    STATUS_STYLES[plant.status] ?? "bg-slate-100 text-slate-700"
                  }`}
                >
                  {plant.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right text-slate-600">{plant.totalDocuments}</td>
              <td className="px-4 py-3 text-right text-slate-600">{plant.documentsCompliant}</td>
              <td className="px-4 py-3 text-right text-slate-600">{plant.documentsExpiring}</td>
              <td className="px-4 py-3 text-right text-slate-600">{plant.documentsMissing}</td>
              <td className="px-4 py-3">
                <HealthBadge status={plant.health} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
