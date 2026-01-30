import React from "react";
import { LeafIcon } from "../common/icons";
import BackToHomeButton from "../common/BackToHomeButton";

interface AuthFormLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthFormLayout: React.FC<AuthFormLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "linear-gradient(180deg, #F0FDF4 0%, #DCFCE7 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "white",
          borderRadius: "24px",
          padding: "40px 28px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              marginBottom: "12px",
            }}
          >
            <LeafIcon size={56} color="#16A34A" />
          </div>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#166534",
              margin: "0 0 4px 0",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontSize: "14px",
                color: "#6B7280",
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        {children}

        {/* Back to Home Link */}
        <BackToHomeButton
          variant="link"
          style={{ display: "block", textAlign: "center", marginTop: "20px" }}
        />
      </div>
    </div>
  );
};

export default AuthFormLayout;
