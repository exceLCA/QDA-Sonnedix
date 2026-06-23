import { REGULATORY_STANDARDS, STANDARD_CATEGORY_STYLES } from "@/lib/standards";

export default function StandardsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-navy">Regulatory Standards</h2>
        <p className="mt-1 text-sm text-slate-500">
          The 12 regulatory frameworks QDA checks uploaded documents against.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {REGULATORY_STANDARDS.map((standard) => (
          <div key={standard.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-navy">{standard.name}</p>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${STANDARD_CATEGORY_STYLES[standard.category]}`}
              >
                {standard.category}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{standard.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
