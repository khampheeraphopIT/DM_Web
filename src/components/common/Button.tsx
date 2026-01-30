import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  onClick,
  type = "button",
  fullWidth = false,
  style: customStyle,
}) => {
  const isDisabled = disabled || loading;

  const sizeStyles = {
    sm: { padding: "8px 16px", fontSize: "14px" },
    md: { padding: "14px 28px", fontSize: "16px" },
    lg: { padding: "16px 32px", fontSize: "18px" },
  };

  const variantStyles = {
    primary: {
      background: "linear-gradient(135deg, #22C55E, #16A34A)",
      color: "white",
      border: "none",
      boxShadow: "0 4px 16px rgba(34, 197, 94, 0.3)",
    },
    secondary: {
      background: "white",
      color: "#16A34A",
      border: "2px solid #22C55E",
      boxShadow: "none",
    },
    outline: {
      background: "transparent",
      color: "#6B7280",
      border: "1px solid #D1D5DB",
      boxShadow: "none",
    },
  };

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontWeight: "bold",
    borderRadius: "14px",
    cursor: isDisabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    opacity: isDisabled ? 0.6 : 1,
    width: fullWidth ? "100%" : "auto",
    textDecoration: "none",
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...customStyle,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={baseStyle}
      onMouseOver={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.opacity = "0.9";
        }
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.opacity = isDisabled ? "0.6" : "1";
      }}
    >
      {loading ? (
        <>
          <span style={{ animation: "spin 1s linear infinite" }}>⏳</span>
          กำลังโหลด...
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
