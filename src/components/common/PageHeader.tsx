import React from "react";
import { LeafIcon } from "./icons";
import BackToHomeButton from "./BackToHomeButton";

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  backButtonLabel?: string;
  rightContent?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = true,
  backButtonLabel = "หน้าหลัก",
  rightContent,
}) => {
  return (
    <header
      style={{
        backgroundColor: "white",
        padding: "16px 20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
      {showBackButton ? (
        <BackToHomeButton label={backButtonLabel} />
      ) : (
        <div style={{ width: "80px" }} />
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <LeafIcon size={28} color="#16A34A" />
        <h1
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#166534",
            margin: 0,
          }}
        >
          {title}
        </h1>
      </div>

      <div
        style={{
          minWidth: "80px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {rightContent}
      </div>
    </header>
  );
};

export default PageHeader;
