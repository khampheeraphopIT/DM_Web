import React from "react";
import { useNavigate } from "react-router-dom";
import { LeafIcon, UserIcon, LogoutIcon } from "../icons";

interface HeaderProps {
  isAuthenticated: boolean;
  user: { name: string } | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  user,
  onLogout,
}) => {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
        margin: "16px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LeafIcon size={32} color="#16A34A" />
        </div>
        <span
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#166534",
          }}
        >
          CaneScan
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {isAuthenticated && user ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 16px",
              background: "#F3F4F6",
              borderRadius: "24px",
            }}
          >
            <UserIcon size={20} color="#6B7280" />
            <span
              style={{
                fontSize: "14px",
                color: "#374151",
              }}
            >
              {user.name}
            </span>
            <button
              onClick={() => navigate("/history")}
              style={{
                fontSize: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 8px",
              }}
              title="ดูประวัติ"
            >
              📊
            </button>
            <button
              onClick={onLogout}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 8px",
              }}
              title="ออกจากระบบ"
            >
              <LogoutIcon size={18} color="#EF4444" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "10px 24px",
              background: "#22C55E",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "24px",
              fontWeight: "600",
              fontSize: "14px",
              boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
            }}
          >
            เข้าสู่ระบบ
          </button>
        )}
      </div>
    </nav>
  );
};
