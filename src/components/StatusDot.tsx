const COLORS: Record<string, string> = {
  complete: "bg-emerald-500",
  compliant: "bg-emerald-500",
  inconsistent: "bg-amber-500",
  warning: "bg-amber-500",
  missing: "bg-red-500",
  non_compliant: "bg-red-500",
};

export default function StatusDot({ status }: { status: string }) {
  return (
    <span
      className={`inline-block h-2.5 w-2.5 rounded-full ${COLORS[status] ?? "bg-slate-300"}`}
      aria-label={status}
      title={status}
    />
  );
}
