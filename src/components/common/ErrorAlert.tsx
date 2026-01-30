import React from "react";
import { AlertIcon } from "./icons";

interface ErrorAlertProps {
  message: string;
  showIcon?: boolean;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  showIcon = true,
}) => {
  if (!message) return null;

  return (
    <div
      style={{
        backgroundColor: "#FEE2E2",
        color: "#DC2626",
        padding: "12px 16px",
        borderRadius: "10px",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {showIcon && <AlertIcon size={18} color="#DC2626" />}
      <span>{message}</span>
    </div>
  );
};

export default ErrorAlert;
