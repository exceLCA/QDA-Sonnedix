"use client";

import { useCallback, useRef, useState } from "react";

const ACCEPTED = ".pdf,.docx,.txt";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function UploadZone({
  file,
  onFileChange,
  disabled,
}: {
  file: File | null;
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const dropped = e.dataTransfer.files?.[0];
      if (dropped) onFileChange(dropped);
    },
    [disabled, onFileChange]
  );

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-12 text-center transition-colors ${
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-50"
            : isDragging
              ? "border-cyan bg-cyan/5"
              : "border-slate-300 bg-white hover:border-accent hover:bg-accent/5"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          className="hidden"
          disabled={disabled}
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
        />
        {file ? (
          <div>
            <p className="font-medium text-navy">{file.name}</p>
            <p className="mt-1 text-sm text-slate-500">{formatBytes(file.size)}</p>
            <button
              type="button"
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                onFileChange(null);
              }}
              className="mt-3 text-sm font-medium text-accent hover:underline disabled:text-slate-400"
            >
              Remove file
            </button>
          </div>
        ) : (
          <div>
            <p className="font-medium text-navy">Drag and drop a document here</p>
            <p className="mt-1 text-sm text-slate-500">or click to browse — PDF, DOCX, or TXT (max 4MB)</p>
          </div>
        )}
      </div>
    </div>
  );
}
