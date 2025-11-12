import React from "react";
import type { PredictionResult } from "../../../type/predictionResults";
import { dateTimeTH } from "../../../utils/dateTimeTH";

const diseaseNameMap: Record<string, string> = {
  Healthy: "ปกติ",
  Yellow: "โรคใบเหลือง",
  Rust: "โรคราสนิม",
  Redrot: "โรคเน่าแดง",
  Mosaic: "โรคใบด่าง",
  Notsugarcane: "ไม่ใช่ใบอ้อย",
};

const diseaseDescriptionMap: Record<string, string> = {
  Healthy: "ใบอ้อยอยู่ในสภาพปกติ ไม่พบอาการของโรค",
  Yellow: "พบอาการใบเหลือง อาจเกิดจากเชื้อไวรัสหรือขาดธาตุอาหาร",
  Rust: "พบจุดสนิมบนใบ อาจเกิดจากเชื้อราสนิม (Rust disease)",
  Redrot: "พบอาการเน่าแดงในใบหรือบริเวณโคนต้น",
  Mosaic: "พบลวดลายด่างบนใบ อาจเกิดจากไวรัสใบด่าง",
  Notsugarcane:
    "ภาพที่อัปโหลดไม่ใช่ใบอ้อย กรุณาอัปโหลดภาพใบอ้อยที่ชัดเจนอีกครั้ง",
};

interface ResultDisplayProps {
  result: PredictionResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const diseaseName = result.disease
    ? diseaseNameMap[result.disease] || result.disease
    : "-";
  const description = result.disease
    ? diseaseDescriptionMap[result.disease] || ""
    : "";

  return (
    <div
      style={{
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        margin: "16px",
        borderRadius: "12px",
        backgroundColor: "#FFFFFF",
        padding: "16px",
        width: "100%",
      }}
    >
      <span style={{ fontSize: "20px", fontWeight: "bold" }}>
        ผลการวิเคราะห์
      </span>
      <div style={{ height: "16px" }} />
      {result.error ? (
        <span style={{ color: "#FF0000", fontSize: "16px" }}>
          {result.error}
        </span>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            ผลการตรวจ: {diseaseName}
          </span>
          {description && (
            <div style={{ paddingTop: "4px", paddingBottom: "8px" }}>
              <span style={{ fontSize: "14px", color: "#808080" }}>
                {description}
              </span>
            </div>
          )}
          {result.confidence && (
            <span>ระดับความมั่นใจของโมเดล: {result.confidence}</span>
          )}
          {result.riskLevel && (
            <span>ระดับความเสี่ยงในการเกิดโรค: {result.riskLevel}</span>
          )}
          {result.province && <span>จังหวัด: {result.province}</span>}
          <span>เวลาที่ตรวจ: {dateTimeTH(result.timestamp)}</span>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
