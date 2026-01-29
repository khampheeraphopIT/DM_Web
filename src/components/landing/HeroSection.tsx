import React from "react";
import { CameraIcon } from "../icons";

interface HeroSectionProps {
  onStartScan: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartScan }) => (
  <section
    style={{
      padding: "80px 32px",
      textAlign: "center",
      maxWidth: "800px",
      margin: "0 auto",
    }}
  >
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 16px",
        backgroundColor: "#F0FDF4",
        borderRadius: "20px",
        marginBottom: "24px",
      }}
    >
      <span style={{ fontSize: "14px", color: "#16A34A" }}>
        🌿 AI วิเคราะห์โรคใบอ้อย
      </span>
    </div>

    <h1
      style={{
        fontSize: "48px",
        fontWeight: "700",
        color: "#111827",
        marginBottom: "16px",
        lineHeight: "1.2",
      }}
    >
      ตรวจโรคใบอ้อย
      <br />
      <span style={{ color: "#16A34A" }}>ง่ายและแม่นยำ</span>
    </h1>

    <p
      style={{
        fontSize: "18px",
        color: "#6B7280",
        marginBottom: "40px",
        lineHeight: "1.6",
      }}
    >
      แค่ถ่ายรูปใบอ้อย AI จะวิเคราะห์โรค
      <br />
      พร้อมวิธีรักษาและป้องกันให้ทันที
    </p>

    <button
      onClick={onStartScan}
      style={{
        padding: "16px 48px",
        backgroundColor: "#16A34A",
        border: "none",
        borderRadius: "12px",
        color: "#FFFFFF",
        fontSize: "18px",
        fontWeight: "500",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 4px 14px rgba(22, 163, 74, 0.3)",
      }}
    >
      <CameraIcon size={20} color="#FFFFFF" />
      เริ่มสแกนเลย
    </button>
  </section>
);
