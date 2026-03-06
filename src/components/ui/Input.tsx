import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {label && (
        <label
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
          }}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        style={{
          boxSizing: "border-box",
          width: "100%",
          padding: "14px 16px",
          fontSize: "16px",
          border: error ? "2px solid #EF4444" : "2px solid #E5E7EB",
          borderRadius: "12px",
          outline: "none",
          transition: "border-color 0.2s",
          ...props.style,
        }}
      />
      {error && (
        <span
          style={{
            fontSize: "12px",
            color: "#EF4444",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};
