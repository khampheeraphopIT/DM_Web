export interface PredictionResult {
  timestamp?: string;
  disease?: string;
  confidence?: string;
  riskLevel?: string;
  province?: string;
  temperature?: string;
  humidity?: string;
  rainfall?: string;
  probabilities?: Record<string, string>;
  gradcamPath?: string;
  error?: string;
}
