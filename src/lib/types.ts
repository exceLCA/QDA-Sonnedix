export type HealthStatus = "Compliant" | "Warning" | "Critical";

export type OperationalStatus = "Operational" | "Commissioning" | "Under Construction";

export interface Plant {
  id: string;
  name: string;
  region: string;
  mw: number;
  revenueRegime: string;
  status: OperationalStatus;
  totalDocuments: number;
  documentsMissing: number;
  documentsExpiring: number;
}

export interface PlantWithHealth extends Plant {
  documentsCompliant: number;
  health: HealthStatus;
}

export type FieldStatus = "complete" | "missing" | "inconsistent";

export interface ExtractedField {
  field: string;
  value: string;
  status: FieldStatus;
}

export type ComplianceStatus = "compliant" | "warning" | "non_compliant";

export interface ComplianceFlag {
  standard: string;
  status: ComplianceStatus;
  detail: string;
}

export interface ExpiryDate {
  label: string;
  date: string;
}

export interface DocumentAnalysis {
  document_type: string;
  confidence: number;
  extracted_fields: ExtractedField[];
  applicable_standards: string[];
  compliance_flags: ComplianceFlag[];
  expiry_dates: ExpiryDate[];
  completeness_score: number;
  risk_summary: string;
  recommended_actions: string[];
}

export type UrgencyTier = "critical" | "warning" | "upcoming";

export interface ExpiryAlert {
  id: string;
  documentLabel: string;
  plantName: string;
  date: string;
}

export type StandardCategory =
  | "Permitting"
  | "Incentives"
  | "Grid"
  | "Land Use"
  | "Environmental"
  | "ESG"
  | "Safety"
  | "Corporate"
  | "Finance";

export interface RegulatoryStandard {
  id: string;
  name: string;
  category: StandardCategory;
  description: string;
}
