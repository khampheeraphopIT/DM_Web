import React from "react";
import {
  ClockIcon,
  DocumentIcon,
  LightbulbIcon,
  ChevronDownIcon,
  ImageIcon,
  WarningIcon,
} from "../common/icons";
import type { HistoryItem } from "../../services/api";

interface HistoryCardProps {
  item: HistoryItem;
  isExpanded: boolean;
  onToggle: () => void;
  diseaseThaiMap: Record<string, string>;
}

const getSeverityColor = (severity: string) => {
  const colors: Record<string, string> = {
    severe: "#DC2626",
    moderate: "#D97706",
    mild: "#059669",
    none: "#10B981",
  };
  return colors[severity?.toLowerCase()] || "#10B981";
};

const getSeverityText = (severity: string) => {
  const texts: Record<string, string> = {
    severe: "รุนแรง",
    moderate: "ปานกลาง",
    mild: "เล็กน้อย",
    none: "ไม่มี",
  };
  return texts[severity?.toLowerCase()] || "ปกติ";
};

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return "ไม่ทราบวันที่";
  }
};

const isNotSugarcane = (item: HistoryItem): boolean => {
  const diseaseName = item.disease_name?.toLowerCase() || "";
  const severity = item.severity?.toLowerCase() || "";

  return (
    (diseaseName.includes("not sugarcane") ||
      diseaseName.includes("ไม่ใช่ใบอ้อย") ||
      severity === "none") &&
    !diseaseName.includes("healthy")
  );
};

const HistoryCard: React.FC<HistoryCardProps> = ({
  item,
  isExpanded,
  onToggle,
  diseaseThaiMap,
}) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        border: isExpanded
          ? "2px solid #16A34A"
          : "1px solid rgba(22, 163, 74, 0.1)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Card Header - Clickable */}
      <div
        onClick={onToggle}
        style={{
          padding: "16px",
          cursor: "pointer",
        }}
      >
        {/* Date & Severity Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
            paddingBottom: "12px",
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              color: "#6B7280",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <ClockIcon size={14} color="#6B7280" />
            {formatDate(item.created_at)}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                padding: "4px 12px",
                borderRadius: "12px",
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
                backgroundColor: getSeverityColor(item.severity),
                boxShadow: `0 2px 8px ${getSeverityColor(item.severity)}44`,
              }}
            >
              {getSeverityText(item.severity)}
            </div>
            <div
              style={{
                transition: "transform 0.3s",
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                display: "flex",
              }}
            >
              <ChevronDownIcon size={20} color="#6B7280" />
            </div>
          </div>
        </div>

        {/* Content with Image */}
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
          {/* Image Thumbnail */}
          {item.image_url && (
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "10px",
                overflow: "hidden",
                flexShrink: 0,
                border: "1px solid #E5E7EB",
                backgroundColor: "#F9FAFB",
              }}
            >
              <img
                src={item.image_url}
                alt="รูปที่สแกน"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          {/* Disease Info */}
          <div style={{ flex: 1 }}>
            {/* Not Sugarcane Leaf Warning */}
            {isNotSugarcane(item) && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 10px",
                  backgroundColor: "#FEF3C7",
                  color: "#92400E",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                <WarningIcon size={14} color="#92400E" />
                ไม่ใช่ใบอ้อย
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#166534",
                    margin: "0 0 4px 0",
                  }}
                >
                  {diseaseThaiMap[item.disease_name] || item.disease_name}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6B7280",
                    margin: 0,
                    fontStyle: "italic",
                  }}
                >
                  {item.disease_name}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  backgroundColor: "#F0FDF4",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  border: "1px solid #DCFCE7",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    color: "#16A34A",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "2px",
                  }}
                >
                  Confidence
                </span>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "800",
                    color: "#16A34A",
                  }}
                >
                  {Math.round(item.confidence * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div
          style={{
            padding: "0 16px 16px",
            borderTop: "1px solid #E5E7EB",
            backgroundColor: "#F9FAFB",
            animation: "slideDown 0.3s ease",
          }}
        >
          {/* Scanned Image - Large View */}
          {item.image_url && (
            <div style={{ marginTop: "16px" }}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#374151",
                  margin: "0 0 8px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ImageIcon size={16} color="#374151" />
                รูปภาพที่สแกน
              </h4>
              <div
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "white",
                }}
              >
                <img
                  src={item.image_url}
                  alt="รูปที่สแกน"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
            </div>
          )}

          {/* Description */}
          {item.description && (
            <div style={{ marginTop: "16px" }}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#374151",
                  margin: "0 0 8px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <DocumentIcon size={16} color="#374151" />
                การวิเคราะห์
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "#4B5563",
                  margin: 0,
                  lineHeight: "1.6",
                  backgroundColor: "white",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                }}
              >
                {item.description}
              </p>
            </div>
          )}

          {/* Recommendation */}
          {item.recommendation && (
            <div style={{ marginTop: "16px" }}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#374151",
                  margin: "0 0 8px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <LightbulbIcon size={16} color="#D97706" />
                คำแนะนำ
              </h4>
              <div
                style={{
                  fontSize: "14px",
                  color: "#4B5563",
                  lineHeight: "1.6",
                  backgroundColor: "white",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  whiteSpace: "pre-line",
                }}
              >
                {item.recommendation}
              </div>
            </div>
          )}

          {/* No details available */}
          {!item.description && !item.recommendation && !item.image_url && (
            <p
              style={{
                marginTop: "16px",
                fontSize: "14px",
                color: "#9CA3AF",
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              ไม่มีรายละเอียดเพิ่มเติม
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryCard;
