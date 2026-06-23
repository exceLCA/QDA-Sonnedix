import type { HealthStatus } from "@/lib/types";

const STYLES: Record<HealthStatus, string> = {
  Compliant: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Warning: "bg-amber-50 text-amber-700 border-amber-200",
  Critical: "bg-red-50 text-red-700 border-red-200",
};

const DOT_STYLES: Record<HealthStatus, string> = {
  Compliant: "bg-emerald-500",
  Warning: "bg-amber-500",
  Critical: "bg-red-500",
};

export default function HealthBadge({ status }: { status: HealthStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${STYLES[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOT_STYLES[status]}`} aria-hidden />
      {status}
    </span>
  );
}
