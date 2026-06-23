import type { UrgencyTier } from "@/lib/types";

const COLORS: Record<UrgencyTier, string> = {
  critical: "bg-red-500",
  warning: "bg-amber-500",
  upcoming: "bg-emerald-500",
};

const LABELS: Record<UrgencyTier, string> = {
  critical: "Critical",
  warning: "Warning",
  upcoming: "Upcoming",
};

export default function UrgencyDot({ tier }: { tier: UrgencyTier }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${COLORS[tier]}`} aria-hidden />
      <span className="text-sm font-medium text-slate-600">{LABELS[tier]}</span>
    </span>
  );
}
