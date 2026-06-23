import Anthropic from "@anthropic-ai/sdk";
import type { Tool } from "@anthropic-ai/sdk/resources/messages";
import { DOCUMENT_TYPES } from "./document-types";
import { STANDARD_NAMES } from "./standards";
import type { DocumentAnalysis } from "./types";

const MODEL = "claude-sonnet-4-6";
const TOOL_NAME = "submit_compliance_analysis";

const SYSTEM_PROMPT = `You are the compliance analysis engine inside Quality Document Analyzer (QDA), an internal tool used by Sonnedix Italy to review project documents across its portfolio of 200+ solar (and co-located storage) plants.

You will be given the extracted text of a single uploaded project document. Perform the following:

1. Classify the document into exactly one of these document types:
${DOCUMENT_TYPES.map((t) => `   - ${t}`).join("\n")}

2. Extract the key fields that are relevant to this document type — examples include effective/expiry dates, parties and counterparties, plant or SPV name, capacity (MW/MWh), financial terms (tariffs, rent, covenant thresholds), and key conditions or obligations. For each field, report a status:
   - "complete" — the field is clearly present and unambiguous
   - "missing" — the field should be present for this document type but was not found
   - "inconsistent" — the field is present but contains contradictory, ambiguous, or suspicious values

3. Determine which of these Italian/EU regulatory standards are applicable to this document, and check compliance against each applicable one:
${STANDARD_NAMES.map((s) => `   - ${s}`).join("\n")}
   For each applicable standard, assign a status of "compliant", "warning", or "non_compliant", with a one- or two-sentence detail explaining the finding grounded in the document text.

4. Identify any dates in the document that represent expirations, renewals, or deadlines (insurance, certifications, contract terms, permit validity, etc.) and list them as label + ISO date (YYYY-MM-DD). If a date is relative or partial, make a best-effort absolute estimate and note the assumption in the label. If there are no such dates, return an empty array.

5. Compute a completeness_score from 0-100 reflecting how complete and well-documented this file is for its document type (factor in missing/inconsistent fields and non_compliant flags).

6. Write a concise risk_summary (2-4 sentences) covering the most material compliance or completeness risks found.

7. Provide recommended_actions as a short list of concrete next steps for the Sonnedix compliance team (e.g. "Obtain updated insurance certificate before 2026-07-15", "Confirm SPV name matches Antimafia filing").

Ground every finding strictly in the provided document text. Do not invent facts, parties, or values that are not supported by the text — if something cannot be determined, mark it "missing" or note the uncertainty rather than guessing. Call the ${TOOL_NAME} tool exactly once with your complete analysis.`;

const ANALYSIS_TOOL: Tool = {
  name: TOOL_NAME,
  description:
    "Submit the structured compliance analysis result for the uploaded Sonnedix project document.",
  input_schema: {
    type: "object",
    properties: {
      document_type: {
        type: "string",
        enum: [...DOCUMENT_TYPES],
        description: "The classified document type.",
      },
      confidence: {
        type: "number",
        description: "Classification confidence between 0 and 1.",
      },
      extracted_fields: {
        type: "array",
        items: {
          type: "object",
          properties: {
            field: { type: "string" },
            value: { type: "string" },
            status: { type: "string", enum: ["complete", "missing", "inconsistent"] },
          },
          required: ["field", "value", "status"],
        },
      },
      applicable_standards: {
        type: "array",
        items: { type: "string", enum: STANDARD_NAMES },
      },
      compliance_flags: {
        type: "array",
        items: {
          type: "object",
          properties: {
            standard: { type: "string" },
            status: { type: "string", enum: ["compliant", "warning", "non_compliant"] },
            detail: { type: "string" },
          },
          required: ["standard", "status", "detail"],
        },
      },
      expiry_dates: {
        type: "array",
        items: {
          type: "object",
          properties: {
            label: { type: "string" },
            date: { type: "string", description: "ISO 8601 date, YYYY-MM-DD" },
          },
          required: ["label", "date"],
        },
      },
      completeness_score: { type: "number", description: "0-100" },
      risk_summary: { type: "string" },
      recommended_actions: { type: "array", items: { type: "string" } },
    },
    required: [
      "document_type",
      "confidence",
      "extracted_fields",
      "applicable_standards",
      "compliance_flags",
      "expiry_dates",
      "completeness_score",
      "risk_summary",
      "recommended_actions",
    ],
  },
};

export class ClaudeAnalysisError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
  }
}

export async function analyzeDocument(text: string, filename: string): Promise<DocumentAnalysis> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.startsWith("sk-ant-your-key")) {
    throw new ClaudeAnalysisError(
      "ANTHROPIC_API_KEY is not configured on the server. Add it to .env.local and restart the server.",
      500
    );
  }

  const anthropic = new Anthropic({ apiKey });

  let message;
  try {
    message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Filename: ${filename}\n\n--- DOCUMENT TEXT START ---\n${text}\n--- DOCUMENT TEXT END ---`,
        },
      ],
      tools: [ANALYSIS_TOOL],
      tool_choice: { type: "tool", name: TOOL_NAME },
    });
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      throw new ClaudeAnalysisError(`Claude API error: ${err.message}`, err.status ?? 502);
    }
    throw new ClaudeAnalysisError("Failed to reach Claude API.", 502);
  }

  const toolUse = message.content.find(
    (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
  );

  if (!toolUse) {
    throw new ClaudeAnalysisError("Claude did not return a structured analysis.", 502);
  }

  return toolUse.input as DocumentAnalysis;
}
