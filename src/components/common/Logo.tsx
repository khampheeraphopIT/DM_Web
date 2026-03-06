import React from "react";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Logo: React.FC<LogoProps> = ({
  size = 40,
  showText = true,
  className,
  style,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={className}
      onClick={() => navigate("/")}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer",
        ...style,
      }}
    >
      <img
        src="/logo.png"
        alt="CaneScan Logo"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "10px",
          objectFit: "cover",
          boxShadow: "0 4px 12px rgba(22, 163, 74, 0.2)",
        }}
      />
      {showText && (
        <span
          style={{
            fontSize: `${size * 0.55}px`,
            fontWeight: "bold",
            color: "#166534",
            letterSpacing: "-0.5px",
          }}
        >
          CaneScan
        </span>
      )}
    </div>
  );
};

export default Logo;
