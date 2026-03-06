import React from "react";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "300px",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      {icon}
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          color: "#374151",
          margin: "16px 0 8px 0",
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            fontSize: "15px",
            color: "#6B7280",
            marginBottom: "24px",
            maxWidth: "300px",
          }}
        >
          {description}
        </p>
      )}
      {action}
    </div>
  );
};

export default EmptyState;
