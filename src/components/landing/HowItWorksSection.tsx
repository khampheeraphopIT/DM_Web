import React from "react";

const steps = [
  {
    number: "01",
    title: "ถ่ายรูปใบอ้อย",
    description: "ถ่ายภาพใบอ้อยที่มีอาการผิดปกติให้ชัดเจน",
    color: "#16A34A",
  },
  {
    number: "02",
    title: "อัพโหลดรูปภาพ",
    description: "กดปุ่มสแกน แล้วเลือกรูปจากคลังภาพในเครื่อง",
    color: "#0891B2",
  },
  {
    number: "03",
    title: "ดูผลวินิจฉัย",
    description: "AI จะวิเคราะห์และแสดงผลพร้อมคำแนะนำภายในไม่กี่วินาที",
    color: "#7C3AED",
  },
];

interface HowItWorksSectionProps {
  onStartScan: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onStartScan,
}) => (
  <section
    id="how-it-works"
    style={{
      padding: "80px 32px",
      backgroundColor: "#FFFFFF",
    }}
  >
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <span
          style={{
            display: "inline-block",
            padding: "6px 16px",
            backgroundColor: "#F0FDF4",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "500",
            color: "#16A34A",
            marginBottom: "16px",
          }}
        >
          ขั้นตอนง่ายๆ
        </span>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "600",
            color: "#111827",
          }}
        >
          วิธีใช้งาน
        </h2>
      </div>

      {/* Steps Timeline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0",
          position: "relative",
        }}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "flex-start",
              position: "relative",
              paddingBottom: index < steps.length - 1 ? "32px" : "0",
            }}
          >
            {/* Timeline Line */}
            {index < steps.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: "31px",
                  top: "64px",
                  width: "2px",
                  height: "calc(100% - 32px)",
                  background: `linear-gradient(to bottom, ${step.color}, ${steps[index + 1].color})`,
                }}
              />
            )}

            {/* Step Number */}
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                backgroundColor: step.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: `0 4px 20px ${step.color}40`,
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#FFFFFF",
                }}
              >
                {step.number}
              </span>
            </div>

            {/* Content Card */}
            <div
              style={{
                flex: 1,
                padding: "24px",
                backgroundColor: "#F9FAFB",
                borderRadius: "16px",
                border: "1px solid #E5E7EB",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "8px",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: "#6B7280",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div style={{ textAlign: "center", marginTop: "48px" }}>
        <button
          onClick={onStartScan}
          style={{
            padding: "14px 40px",
            backgroundColor: "#16A34A",
            border: "none",
            borderRadius: "10px",
            color: "#FFFFFF",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(22, 163, 74, 0.25)",
          }}
        >
          เริ่มใช้งานฟรี
        </button>
      </div>
    </div>
  </section>
);
