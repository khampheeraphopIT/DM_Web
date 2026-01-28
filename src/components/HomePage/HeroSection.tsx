import React from "react";
import { FeatureCard } from "./FeatureCard";

interface HeroSectionProps {
  onStartScan: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartScan }) => {
  const features = [
    {
      icon: "📷",
      title: "ถ่ายภาพง่ายๆ",
      description: "แค่ถ่ายรูปใบอ้อยที่สงสัย",
    },
    {
      icon: "🤖",
      title: "AI วิเคราะห์",
      description: "Gemini Vision วินิจฉัยทันที",
    },
    {
      icon: "💊",
      title: "แนะนำการรักษา",
      description: "พร้อมวิธีรักษาและป้องกัน",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Hero Content */}
      <div
        style={{
          textAlign: "center",
          padding: "40px 20px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(32px, 8vw, 48px)",
            fontWeight: "bold",
            color: "#166534",
            marginBottom: "16px",
            lineHeight: "1.2",
          }}
        >
          ระบบวินิจฉัยโรคใบอ้อย
          <br />
          <span style={{ color: "#22C55E" }}>ด้วย AI</span>
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#6B7280",
            maxWidth: "500px",
            margin: "0 auto 32px",
            lineHeight: "1.6",
          }}
        >
          วินิจฉัยโรคใบอ้อยด้วยเทคโนโลยี AI ที่แม่นยำ
          พร้อมคำแนะนำในการรักษาและป้องกัน
        </p>

        <button
          onClick={onStartScan}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "18px 40px",
            background: "linear-gradient(135deg, #22C55E, #16A34A)",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            borderRadius: "16px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 8px 30px rgba(34, 197, 94, 0.4)",
            transition: "transform 0.2s",
          }}
        >
          <span style={{ fontSize: "24px" }}>📷</span>
          <span>เริ่มสแกนเลย</span>
        </button>
      </div>

      {/* Feature Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          maxWidth: "900px",
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};
