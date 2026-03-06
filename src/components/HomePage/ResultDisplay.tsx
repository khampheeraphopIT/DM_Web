import React from "react";
import type { PredictionResult } from "../../utils/types";
import { CameraIcon, AlertIcon } from "../common/icons";

interface ResultDisplayProps {
  result: PredictionResult;
  onScanAgain: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  onScanAgain,
}) => {
  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      severe: "#DC2626",
      moderate: "#D97706",
      mild: "#059669",
      none: "#10B981",
    };
    return colors[severity] || "#10B981";
  };

  const getSeverityText = (severity: string) => {
    const texts: Record<string, string> = {
      severe: "รุนแรง",
      moderate: "ปานกลาง",
      mild: "เล็กน้อย",
      none: "ไม่มี",
    };
    return texts[severity] || "ไม่ทราบ";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {/* Result Header */}
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "24px",
            marginBottom: "20px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: result.is_sugarcane
                ? `linear-gradient(135deg, ${getSeverityColor(result.severity)}, ${getSeverityColor(result.severity)}CC)`
                : "#6B7280",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <AlertIcon size={40} color="white" />
          </div>

          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#166534",
              marginBottom: "8px",
            }}
          >
            {result.disease_th}
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#6B7280",
              marginBottom: "16px",
            }}
          >
            {result.disease}
          </p>

          {/* Confidence & Severity */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                padding: "8px 16px",
                background: "#F0FDF4",
                borderRadius: "12px",
              }}
            >
              <span style={{ color: "#6B7280", fontSize: "12px" }}>
                ความมั่นใจ
              </span>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#16A34A",
                }}
              >
                {Math.round(result.confidence * 100)}%
              </p>
            </div>
            <div
              style={{
                padding: "8px 16px",
                background: "#FEF3C7",
                borderRadius: "12px",
              }}
            >
              <span style={{ color: "#6B7280", fontSize: "12px" }}>
                ความรุนแรง
              </span>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: getSeverityColor(result.severity),
                }}
              >
                {getSeverityText(result.severity)}
              </p>
            </div>
          </div>
        </div>

        {/* Analysis */}
        {result.analysis && (
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "16px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#166534",
                marginBottom: "12px",
              }}
            >
              📝 การวิเคราะห์
            </h3>
            <p
              style={{
                color: "#374151",
                lineHeight: "1.6",
              }}
            >
              {result.analysis}
            </p>
          </div>
        )}

        {/* Symptoms */}
        {result.symptoms && result.symptoms.length > 0 && (
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "16px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#166534",
                marginBottom: "12px",
              }}
            >
              🔍 อาการที่พบ
            </h3>
            <ul
              style={{
                paddingLeft: "20px",
                color: "#374151",
              }}
            >
              {result.symptoms.map((symptom, i) => (
                <li key={i} style={{ marginBottom: "8px" }}>
                  {symptom}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Treatment */}
        {result.treatment && result.treatment.length > 0 && (
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "16px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#166534",
                marginBottom: "12px",
              }}
            >
              💊 วิธีรักษา
            </h3>
            <ul
              style={{
                paddingLeft: "20px",
                color: "#374151",
              }}
            >
              {result.treatment.map((item, i) => (
                <li key={i} style={{ marginBottom: "8px" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Prevention */}
        {result.prevention && result.prevention.length > 0 && (
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#166534",
                marginBottom: "12px",
              }}
            >
              🛡️ วิธีป้องกัน
            </h3>
            <ul
              style={{
                paddingLeft: "20px",
                color: "#374151",
              }}
            >
              {result.prevention.map((item, i) => (
                <li key={i} style={{ marginBottom: "8px" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Scan Again Button */}
        <button
          onClick={onScanAgain}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "16px",
            background: "linear-gradient(135deg, #22C55E, #16A34A)",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "14px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(34, 197, 94, 0.3)",
          }}
        >
          <CameraIcon size={22} color="white" />
          <span>สแกนใหม่</span>
        </button>
      </div>
    </div>
  );
};
