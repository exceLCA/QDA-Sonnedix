import { DOCUMENT_TYPE_LABELS } from "@/lib/document-types";
import { formatDate } from "@/lib/dates";
import type { ComplianceStatus, DocumentAnalysis } from "@/lib/types";
import StatusDot from "./StatusDot";

const COMPLIANCE_CARD_STYLES: Record<ComplianceStatus, string> = {
  compliant: "border-l-emerald-500 bg-emerald-50/50",
  warning: "border-l-amber-500 bg-amber-50/50",
  non_compliant: "border-l-red-500 bg-red-50/50",
};

const COMPLIANCE_LABEL: Record<ComplianceStatus, string> = {
  compliant: "Compliant",
  warning: "Warning",
  non_compliant: "Non-Compliant",
};

function scoreColor(score: number): string {
  if (score >= 80) return "text-emerald-600";
  if (score >= 50) return "text-amber-600";
  return "text-red-600";
}

function scoreBarColor(score: number): string {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 50) return "bg-amber-500";
  return "bg-red-500";
}

export default function AnalysisResults({
  filename,
  analysis,
}: {
  filename: string;
  analysis: DocumentAnalysis;
}) {
  const confidencePct = Math.round(analysis.confidence * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Document Classification
          </p>
          <p className="mt-2 text-lg font-semibold text-navy">{analysis.document_type}</p>
          <p className="mt-1 text-sm text-slate-500">
            {DOCUMENT_TYPE_LABELS[analysis.document_type] ?? filename}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-accent" style={{ width: `${confidencePct}%` }} />
            </div>
            <span className="text-sm font-medium text-slate-600">{confidencePct}% confidence</span>
          </div>
          <p className="mt-3 truncate text-xs text-slate-400">Source file: {filename}</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Completeness Score
          </p>
          <p className={`mt-2 text-4xl font-bold ${scoreColor(analysis.completeness_score)}`}>
            {Math.round(analysis.completeness_score)}
            <span className="text-lg font-medium text-slate-400">/100</span>
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${scoreBarColor(analysis.completeness_score)}`}
              style={{ width: `${Math.min(100, Math.max(0, analysis.completeness_score))}%` }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-3">
          <h3 className="text-sm font-semibold text-navy">Extracted Fields</h3>
        </div>
        {analysis.extracted_fields.length === 0 ? (
          <p className="px-5 py-4 text-sm text-slate-500">No fields were extracted.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-2 font-medium">Field</th>
                <th className="px-5 py-2 font-medium">Value</th>
                <th className="px-5 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {analysis.extracted_fields.map((f, i) => (
                <tr key={`${f.field}-${i}`}>
                  <td className="px-5 py-2.5 font-medium text-slate-700">{f.field}</td>
                  <td className="px-5 py-2.5 text-slate-600">{f.value || "—"}</td>
                  <td className="px-5 py-2.5">
                    <span className="inline-flex items-center gap-2">
                      <StatusDot status={f.status} />
                      <span className="capitalize text-slate-600">{f.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-navy">Compliance Checks</h3>
        {analysis.compliance_flags.length === 0 ? (
          <p className="text-sm text-slate-500">No applicable regulatory standards were identified.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {analysis.compliance_flags.map((flag, i) => (
              <div
                key={`${flag.standard}-${i}`}
                className={`rounded-lg border border-l-4 border-slate-200 p-4 shadow-sm ${COMPLIANCE_CARD_STYLES[flag.status]}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-navy">{flag.standard}</p>
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-slate-600">
                    <StatusDot status={flag.status} />
                    {COMPLIANCE_LABEL[flag.status]}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-slate-600">{flag.detail}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {analysis.expiry_dates.length > 0 && (
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-3">
            <h3 className="text-sm font-semibold text-navy">Key Dates Found</h3>
          </div>
          <ul className="divide-y divide-slate-100">
            {analysis.expiry_dates.map((d, i) => (
              <li key={`${d.label}-${i}`} className="flex items-center justify-between px-5 py-2.5 text-sm">
                <span className="text-slate-700">{d.label}</span>
                <span className="font-medium text-navy">{formatDate(d.date)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-lg border-l-4 border-accent bg-accent/5 p-5">
        <h3 className="text-sm font-semibold text-navy">Risk Summary</h3>
        <p className="mt-1.5 text-sm text-slate-700">{analysis.risk_summary}</p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-navy">Recommended Actions</h3>
        {analysis.recommended_actions.length === 0 ? (
          <p className="mt-1.5 text-sm text-slate-500">No further actions recommended.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {analysis.recommended_actions.map((action, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
                {action}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
