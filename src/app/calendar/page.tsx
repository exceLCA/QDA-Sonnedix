import UrgencyDot from "@/components/UrgencyDot";
import { daysUntil, formatDate, urgencyTier } from "@/lib/dates";
import { EXPIRY_ALERTS } from "@/lib/expiry-alerts";

const ROW_STYLES: Record<string, string> = {
  critical: "border-l-red-500",
  warning: "border-l-amber-500",
  upcoming: "border-l-emerald-500",
};

export default function CalendarPage() {
  const alerts = EXPIRY_ALERTS.map((alert) => {
    const days = daysUntil(alert.date);
    return { ...alert, days, tier: urgencyTier(days) };
  }).sort((a, b) => a.days - b.days);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-navy">Expiry Calendar</h2>
        <p className="mt-1 text-sm text-slate-500">
          Upcoming document expirations across the portfolio, sorted by urgency.
        </p>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-center justify-between gap-4 rounded-lg border border-l-4 border-slate-200 bg-white p-4 shadow-sm ${ROW_STYLES[alert.tier]}`}
          >
            <div className="min-w-0">
              <p className="font-medium text-navy">{alert.documentLabel}</p>
              <p className="mt-0.5 text-sm text-slate-500">{alert.plantName}</p>
            </div>
            <div className="flex shrink-0 items-center gap-6">
              <UrgencyDot tier={alert.tier} />
              <div className="text-right">
                <p className="text-sm font-medium text-navy">{formatDate(alert.date)}</p>
                <p className="text-xs text-slate-500">
                  {alert.days >= 0 ? `${alert.days} days` : `${Math.abs(alert.days)} days overdue`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
