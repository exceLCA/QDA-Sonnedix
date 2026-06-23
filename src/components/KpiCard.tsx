export default function KpiCard({
  label,
  value,
  accent = "default",
}: {
  label: string;
  value: string;
  accent?: "default" | "cyan" | "amber" | "red";
}) {
  const valueColor = {
    default: "text-navy",
    cyan: "text-cyan",
    amber: "text-amber-600",
    red: "text-red-600",
  }[accent];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-semibold ${valueColor}`}>{value}</p>
    </div>
  );
}
