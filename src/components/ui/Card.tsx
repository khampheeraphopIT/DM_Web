import React from "react";

interface CardProps {
  children: React.ReactNode;
  padding?: string;
  maxWidth?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = "32px 24px",
  maxWidth = "420px",
  style,
}) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth,
        backgroundColor: "white",
        borderRadius: "24px",
        padding,
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
