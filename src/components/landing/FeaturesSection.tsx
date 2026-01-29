import React from "react";
import { CameraIcon, SearchIcon, LeafIcon } from "../icons";

const features = [
  {
    icon: CameraIcon,
    iconBg: "#F0FDF4",
    iconColor: "#16A34A",
    title: "ใช้ง่าย",
    description: "แค่ถ่ายรูปหรืออัพโหลดภาพ ไม่ต้องดาวน์โหลดแอป",
  },
  {
    icon: SearchIcon,
    iconBg: "#EEF2FF",
    iconColor: "#4F46E5",
    title: "แม่นยำ",
    description: "ใช้ AI วิเคราะห์ภาพ ตรวจจับโรคได้หลากหลายชนิด",
  },
  {
    icon: LeafIcon,
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
    title: "ครบถ้วน",
    description: "พร้อมคำแนะนำวิธีรักษาและป้องกันโรค",
  },
];

export const FeaturesSection: React.FC = () => (
  <section
    id="features"
    style={{
      padding: "80px 32px",
      backgroundColor: "#F9FAFB",
    }}
  >
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "600",
          color: "#111827",
          marginBottom: "48px",
        }}
      >
        ทำไมต้อง CaneScan?
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              padding: "32px",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: feature.iconBg,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <feature.icon size={24} color={feature.iconColor} />
            </div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "8px",
              }}
            >
              {feature.title}
            </h3>
            <p
              style={{ fontSize: "14px", color: "#6B7280", lineHeight: "1.6" }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
