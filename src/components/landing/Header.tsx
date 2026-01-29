import React from "react";
import { LeafIcon } from "../icons";

interface HeaderProps {
  isAuthenticated: boolean;
  user?: { name: string } | null;
  onLogout: () => void;
  onLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  user,
  onLogout,
  onLogin,
}) => (
  <header
    style={{
      padding: "16px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#FFFFFF",
      borderBottom: "1px solid #F3F4F6",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <LeafIcon size={28} color="#16A34A" />
      <span style={{ fontSize: "20px", fontWeight: "600", color: "#1F2937" }}>
        CaneScan
      </span>
    </div>
    <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
      <a
        href="#features"
        style={{ color: "#6B7280", textDecoration: "none", fontSize: "14px" }}
      >
        ฟีเจอร์
      </a>
      <a
        href="#how-it-works"
        style={{ color: "#6B7280", textDecoration: "none", fontSize: "14px" }}
      >
        วิธีใช้งาน
      </a>
      {isAuthenticated ? (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#374151", fontSize: "14px" }}>
            {user?.name}
          </span>
          <button
            onClick={onLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "transparent",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              color: "#6B7280",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            ออกจากระบบ
          </button>
        </div>
      ) : (
        <button
          onClick={onLogin}
          style={{
            padding: "8px 20px",
            backgroundColor: "#16A34A",
            border: "none",
            borderRadius: "8px",
            color: "#FFFFFF",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          เข้าสู่ระบบ
        </button>
      )}
    </nav>
  </header>
);
