export interface PredictionResult {
  is_sugarcane: boolean;
  disease?: string;
  disease_th?: string;
  confidence: number;
  symptoms?: string[];
  analysis: string;
  severity?: "mild" | "moderate" | "severe" | "none";
  cause?: string;
  weather_related?: boolean;
  treatment?: string[];
  prevention?: string[];
  // For non-sugarcane
  detected_object?: string;
  detected_object_th?: string;
  observations?: string[];
  sugarcane_differences?: string[];
  fun_fact?: string;
}

export interface ApiResponse {
  success: boolean;
  data?: PredictionResult;
  error?: string;
  error_type?:
    | "rate_limit"
    | "quota_exceeded"
    | "server_overloaded"
    | "invalid_file"
    | "read_error"
    | "unknown";
  retry_after?: number;
  message?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
}
