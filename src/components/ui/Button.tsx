import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, #22C55E, #16A34A)",
    color: "white",
    boxShadow: "0 4px 14px rgba(34, 197, 94, 0.4)",
  },
  secondary: {
    background: "linear-gradient(135deg, #3B82F6, #2563EB)",
    color: "white",
    boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
  },
  danger: {
    background: "linear-gradient(135deg, #EF4444, #DC2626)",
    color: "white",
    boxShadow: "0 4px 14px rgba(239, 68, 68, 0.3)",
  },
  ghost: {
    background: "transparent",
    color: "#6B7280",
    boxShadow: "none",
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    padding: "8px 16px",
    fontSize: "14px",
  },
  md: {
    padding: "12px 24px",
    fontSize: "16px",
  },
  lg: {
    padding: "16px 32px",
    fontSize: "18px",
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  fullWidth = false,
  children,
  disabled,
  style,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      style={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        fontWeight: "bold",
        borderRadius: "14px",
        border: "none",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        transition: "transform 0.2s, opacity 0.2s",
        opacity: disabled || loading ? 0.7 : 1,
        width: fullWidth ? "100%" : "auto",
        whiteSpace: "nowrap",
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
      }}
      {...props}
    >
      {loading ? (
        <span>⏳</span>
      ) : icon ? (
        <span style={{ display: "inline-flex", alignItems: "center" }}>
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};
