import { NextRequest, NextResponse } from "next/server";
import { ClaudeAnalysisError, analyzeDocument } from "@/lib/claude";
import { ExtractionError, MAX_FILE_SIZE_BYTES, extractText, isAcceptedFile } from "@/lib/extract-text";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data with a 'file' field." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file was uploaded." }, { status: 400 });
  }

  if (file.size === 0) {
    return NextResponse.json({ error: "The uploaded file is empty." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const maxMb = MAX_FILE_SIZE_BYTES / (1024 * 1024);
    return NextResponse.json(
      { error: `File is too large. Maximum supported size is ${maxMb}MB.` },
      { status: 413 }
    );
  }

  if (!isAcceptedFile(file.name, file.type)) {
    return NextResponse.json(
      { error: "Unsupported file type. Please upload a PDF, DOCX, or TXT file." },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const text = await extractText(buffer, file.name, file.type);
    const analysis = await analyzeDocument(text, file.name);

    return NextResponse.json({ filename: file.name, analysis });
  } catch (err) {
    if (err instanceof ExtractionError) {
      return NextResponse.json({ error: err.message }, { status: 422 });
    }
    if (err instanceof ClaudeAnalysisError) {
      return NextResponse.json({ error: err.message }, { status: err.status ?? 502 });
    }

    console.error("Unexpected error in /api/analyze:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while analyzing the document." },
      { status: 500 }
    );
  }
}
