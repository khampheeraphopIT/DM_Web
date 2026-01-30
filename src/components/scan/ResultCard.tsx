import React from "react";
import type { PredictionResult } from "../../utils/types";
import { LeafIcon, CameraIcon } from "../common/icons";

interface ResultCardProps {
  result: PredictionResult;
  imagePreview?: string | null;
  onScanAgain: () => void;
}

// Severity config
const getSeverityConfig = (severity?: string) => {
  switch (severity) {
    case "severe":
      return { label: "รุนแรง", color: "#DC2626", bg: "#FEF2F2" };
    case "moderate":
      return { label: "ปานกลาง", color: "#D97706", bg: "#FFFBEB" };
    case "mild":
      return { label: "เล็กน้อย", color: "#16A34A", bg: "#F0FDF4" };
    default:
      return { label: "ไม่มี", color: "#16A34A", bg: "#F0FDF4" };
  }
};

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  imagePreview,
  onScanAgain,
}) => {
  const severityConfig = getSeverityConfig(result.severity);
  const confidencePercent = Math.round((result.confidence || 0) * 100);

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #E5E7EB",
        overflow: "hidden",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Report Header */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid #E5E7EB",
          backgroundColor: "#F9FAFB",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              backgroundColor: result.is_sugarcane ? "#F0FDF4" : "#EEF2FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {result.is_sugarcane ? (
              <LeafIcon size={20} color="#16A34A" />
            ) : (
              <CameraIcon size={20} color="#4F46E5" />
            )}
          </div>
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#111827",
                margin: 0,
              }}
            >
              รายงานผลการวิเคราะห์
            </h2>
            <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
              CaneScan AI Diagnosis Report
            </p>
          </div>
        </div>
        <span
          style={{
            fontSize: "12px",
            color: "#9CA3AF",
          }}
        >
          {new Date().toLocaleDateString("th-TH", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Main Content - Split View */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* Left: Image */}
        {imagePreview && (
          <div
            style={{
              flex: "1 1 200px",
              minWidth: "200px",
              padding: "24px",
              borderRight: "1px solid #E5E7EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FAFAFA",
            }}
          >
            <img
              src={imagePreview}
              alt="Analyzed"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        )}

        {/* Right: Diagnosis Summary */}
        <div
          style={{
            flex: "2 1 300px",
            padding: "24px",
          }}
        >
          {result.is_sugarcane ? (
            <>
              {/* Disease Name */}
              <div style={{ marginBottom: "20px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  ผลวินิจฉัย
                </span>
                <h3
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: result.disease === "Healthy" ? "#16A34A" : "#111827",
                    margin: "4px 0 0 0",
                  }}
                >
                  {result.disease_th || result.disease}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#9CA3AF",
                    margin: "2px 0 0 0",
                  }}
                >
                  {result.disease}
                </p>
              </div>

              {/* Stats Row */}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {/* Confidence */}
                <div
                  style={{
                    flex: "1 1 140px",
                    padding: "16px",
                    backgroundColor: "#F9FAFB",
                    borderRadius: "12px",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#6B7280" }}>
                    ความมั่นใจ
                  </span>
                  <div style={{ marginTop: "8px" }}>
                    <div
                      style={{
                        height: "8px",
                        backgroundColor: "#E5E7EB",
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${confidencePercent}%`,
                          backgroundColor:
                            confidencePercent >= 80 ? "#16A34A" : "#D97706",
                          borderRadius: "4px",
                          transition: "width 0.5s ease",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#111827",
                        display: "block",
                        marginTop: "6px",
                      }}
                    >
                      {confidencePercent}%
                    </span>
                  </div>
                </div>

                {/* Severity */}
                {result.severity && result.disease !== "Healthy" && (
                  <div
                    style={{
                      flex: "1 1 140px",
                      padding: "16px",
                      backgroundColor: severityConfig.bg,
                      borderRadius: "12px",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#6B7280" }}>
                      ระดับความรุนแรง
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "20px",
                        fontWeight: "600",
                        color: severityConfig.color,
                        marginTop: "8px",
                      }}
                    >
                      {severityConfig.label}
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Not Sugarcane */}
              <div style={{ marginBottom: "20px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  ผลการตรวจสอบ
                </span>
                <h3
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#4F46E5",
                    margin: "4px 0 0 0",
                  }}
                >
                  ไม่ใช่ใบอ้อย
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6B7280",
                    margin: "8px 0 0 0",
                  }}
                >
                  ตรวจพบ:{" "}
                  <strong>
                    {result.detected_object_th || result.detected_object}
                  </strong>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Details Sections */}
      <div style={{ padding: "24px", borderTop: "1px solid #E5E7EB" }}>
        {/* Analysis */}
        {result.analysis && (
          <Section title="🔍 การวิเคราะห์" content={result.analysis} />
        )}

        {/* Symptoms */}
        {result.symptoms && result.symptoms.length > 0 && (
          <Section title="📋 อาการที่พบ" items={result.symptoms} />
        )}

        {/* Observations for non-sugarcane */}
        {result.observations && result.observations.length > 0 && (
          <Section title="👁️ จุดสังเกต" items={result.observations} />
        )}

        {/* Treatment */}
        {result.treatment && result.treatment.length > 0 && (
          <Section
            title="💊 วิธีรักษา"
            items={result.treatment}
            color="#0891B2"
          />
        )}

        {/* Prevention */}
        {result.prevention && result.prevention.length > 0 && (
          <Section
            title="🛡️ วิธีป้องกัน"
            items={result.prevention}
            color="#16A34A"
          />
        )}

        {/* Fun Fact for non-sugarcane */}
        {result.fun_fact && (
          <div
            style={{
              marginTop: "20px",
              padding: "16px",
              backgroundColor: "#FFFBEB",
              borderRadius: "12px",
              borderLeft: "4px solid #F59E0B",
            }}
          >
            <span
              style={{ fontSize: "13px", fontWeight: "600", color: "#92400E" }}
            >
              💡 ความรู้ที่น่าสนใจ
            </span>
            <p
              style={{
                fontSize: "14px",
                color: "#78350F",
                margin: "8px 0 0 0",
                lineHeight: "1.6",
              }}
            >
              {result.fun_fact}
            </p>
          </div>
        )}
      </div>

      {/* Footer Action */}
      <div
        style={{
          padding: "20px 24px",
          borderTop: "1px solid #E5E7EB",
          backgroundColor: "#F9FAFB",
          textAlign: "center",
        }}
      >
        <button
          onClick={onScanAgain}
          style={{
            padding: "12px 32px",
            backgroundColor: "#16A34A",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "500",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(22, 163, 74, 0.3)",
          }}
        >
          สแกนรูปใหม่
        </button>
      </div>
    </div>
  );
};

// Helper component for sections
const Section: React.FC<{
  title: string;
  content?: string;
  items?: string[];
  color?: string;
}> = ({ title, content, items, color = "#374151" }) => (
  <div style={{ marginBottom: "20px" }}>
    <h4
      style={{
        fontSize: "14px",
        fontWeight: "600",
        color: color,
        marginBottom: "10px",
      }}
    >
      {title}
    </h4>
    {content && (
      <p
        style={{
          fontSize: "15px",
          color: "#4B5563",
          lineHeight: "1.7",
          margin: 0,
        }}
      >
        {content}
      </p>
    )}
    {items && (
      <ul
        style={{
          margin: 0,
          paddingLeft: "20px",
          color: "#4B5563",
          fontSize: "15px",
          lineHeight: "1.8",
        }}
      >
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    )}
  </div>
);
