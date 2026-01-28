import React from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        textAlign: "center",
        transition: "transform 0.2s",
      }}
    >
      <div
        style={{
          fontSize: "40px",
          marginBottom: "12px",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#166534",
          marginBottom: "8px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: "#6B7280",
          lineHeight: "1.5",
        }}
      >
        {description}
      </p>
    </div>
  );
};
