import mammoth from "mammoth";

export const ACCEPTED_EXTENSIONS = [".pdf", ".docx", ".txt"] as const;
export const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024; // 4MB — stays under Vercel's serverless request body limit
export const MAX_EXTRACTED_CHARS = 150_000;

export class ExtractionError extends Error {}

function getExtension(filename: string): string {
  const idx = filename.lastIndexOf(".");
  return idx === -1 ? "" : filename.slice(idx).toLowerCase();
}

export function isPdfFile(filename: string, mimeType: string): boolean {
  return getExtension(filename) === ".pdf" || mimeType === "application/pdf";
}

export function isAcceptedFile(filename: string, mimeType: string): boolean {
  const ext = getExtension(filename);
  if ((ACCEPTED_EXTENSIONS as readonly string[]).includes(ext)) return true;
  return (
    mimeType === "application/pdf" ||
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    mimeType === "text/plain"
  );
}

export async function extractText(buffer: Buffer, filename: string, mimeType: string): Promise<string> {
  const ext = getExtension(filename);

  let text: string;

  if (
    ext === ".docx" ||
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    text = result.value;
  } else if (ext === ".txt" || mimeType === "text/plain") {
    text = buffer.toString("utf-8");
  } else {
    throw new ExtractionError(`Unsupported file type: ${ext || mimeType}`);
  }

  const trimmed = text.trim();
  if (trimmed.length < 20) {
    throw new ExtractionError(
      "Could not extract readable text from this file. It may be a scanned/image-only document without a text layer."
    );
  }

  return trimmed.length > MAX_EXTRACTED_CHARS ? trimmed.slice(0, MAX_EXTRACTED_CHARS) : trimmed;
}
