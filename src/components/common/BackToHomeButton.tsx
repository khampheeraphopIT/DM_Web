import React from "react";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "./icons";

interface BackToHomeButtonProps {
  label?: string;
  showIcon?: boolean;
  variant?: "text" | "outlined" | "link";
  className?: string;
  style?: React.CSSProperties;
}

const BackToHomeButton: React.FC<BackToHomeButtonProps> = ({
  label = "กลับหน้าหลัก",
  showIcon = true,
  variant = "text",
  style: customStyle,
}) => {
  const navigate = useNavigate();

  const baseStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "opacity 0.2s",
    textDecoration: "none",
  };

  const textStyles: React.CSSProperties = {
    ...baseStyles,
    background: "none",
    border: "none",
    color: "#16A34A",
    fontSize: "16px",
    padding: "8px",
  };

  const outlinedStyles: React.CSSProperties = {
    ...baseStyles,
    background: "white",
    border: "1px solid #D1D5DB",
    color: "#6B7280",
    fontSize: "14px",
    padding: "8px 16px",
    borderRadius: "8px",
  };

  const linkStyles: React.CSSProperties = {
    ...baseStyles,
    background: "none",
    border: "none",
    color: "#6B7280",
    fontSize: "14px",
    padding: 0,
    fontWeight: "normal",
  };

  const getStyles = () => {
    switch (variant) {
      case "outlined":
        return outlinedStyles;
      case "link":
        return linkStyles;
      default:
        return textStyles;
    }
  };

  return (
    <button
      onClick={() => navigate("/")}
      style={{ ...getStyles(), ...customStyle }}
      onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
      onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
    >
      {showIcon && variant !== "link" && (
        <BackIcon
          size={18}
          color={variant === "outlined" ? "#6B7280" : "#16A34A"}
        />
      )}
      {variant === "link" && "← "}
      {label}
    </button>
  );
};

export default BackToHomeButton;
