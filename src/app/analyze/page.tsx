"use client";

import { useState } from "react";
import AnalysisResults from "@/components/AnalysisResults";
import UploadZone from "@/components/UploadZone";
import type { DocumentAnalysis } from "@/lib/types";

type Status = "idle" | "analyzing" | "success" | "error";

interface AnalyzeResponse {
  filename: string;
  analysis: DocumentAnalysis;
}

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);

  async function handleAnalyze() {
    if (!file) return;
    setStatus("analyzing");
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed.");
      }

      setResult(data as AnalyzeResponse);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      setStatus("error");
    }
  }

  function handleFileChange(next: File | null) {
    setFile(next);
    setResult(null);
    setError(null);
    setStatus("idle");
  }

  const isAnalyzing = status === "analyzing";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-navy">Analyze Document</h2>
        <p className="mt-1 text-sm text-slate-500">
          Upload a project document for AI-powered classification and compliance analysis against
          Italian renewable energy regulatory standards.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <UploadZone file={file} onFileChange={handleFileChange} disabled={isAnalyzing} />

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            disabled={!file || isAnalyzing}
            onClick={handleAnalyze}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-light disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isAnalyzing && (
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                aria-hidden
              />
            )}
            {isAnalyzing ? "Analyzing document…" : "Analyze Document"}
          </button>
          {isAnalyzing && (
            <span className="text-sm text-slate-500">
              Extracting text and running compliance checks via Claude…
            </span>
          )}
        </div>

        {error && (
          <div className="mt-4 rounded-md border border-l-4 border-red-200 border-l-red-500 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>

      {status === "success" && result && (
        <AnalysisResults filename={result.filename} analysis={result.analysis} />
      )}
    </div>
  );
}
