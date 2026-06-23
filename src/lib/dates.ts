import type { UrgencyTier } from "./types";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function daysUntil(dateStr: string, from: Date = new Date()): number {
  const target = new Date(`${dateStr}T00:00:00`);
  const today = new Date(`${from.toISOString().slice(0, 10)}T00:00:00`);
  return Math.round((target.getTime() - today.getTime()) / MS_PER_DAY);
}

export function urgencyTier(days: number): UrgencyTier {
  if (days < 30) return "critical";
  if (days <= 90) return "warning";
  return "upcoming";
}

export function formatDate(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
