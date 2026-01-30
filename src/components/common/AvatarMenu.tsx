import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { HistoryIcon, LogoutIcon } from "./icons";

interface AvatarMenuProps {
  size?: number;
}

export const AvatarMenu: React.FC<AvatarMenuProps> = ({ size = 40 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isAuthenticated || !user) {
    return (
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "8px 16px",
            backgroundColor: "transparent",
            color: "#16A34A",
            border: "2px solid #16A34A",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          เข้าสู่ระบบ
        </button>
        <button
          onClick={() => navigate("/register")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#16A34A",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          สมัครสมาชิก
        </button>
      </div>
    );
  }

  const handleMenuClick = (action: string) => {
    setIsOpen(false);
    switch (action) {
      case "profile":
        // TODO: navigate to profile page when implemented
        break;
      case "history":
        navigate("/history");
        break;
      case "logout":
        logout();
        navigate("/");
        break;
    }
  };

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: "#DCFCE7",
          border: "2px solid #16A34A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: size * 0.4,
          fontWeight: "bold",
          color: "#166534",
          transition: "transform 0.2s",
        }}
      >
        {user.name.charAt(0).toUpperCase()}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: size + 8,
            right: 0,
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            minWidth: "180px",
            zIndex: 1000,
            overflow: "hidden",
            border: "1px solid #E5E7EB",
          }}
        >
          {/* User Info */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #E5E7EB",
              backgroundColor: "#F9FAFB",
            }}
          >
            <p
              style={{
                margin: 0,
                fontWeight: "bold",
                color: "#166534",
                fontSize: "14px",
              }}
            >
              {user.name}
            </p>
            <p
              style={{
                margin: "2px 0 0 0",
                color: "#6B7280",
                fontSize: "12px",
              }}
            >
              {user.phone}
            </p>
          </div>

          {/* Menu Items */}
          <div style={{ padding: "8px 0" }}>
            <button
              onClick={() => handleMenuClick("history")}
              style={{
                width: "100%",
                padding: "10px 16px",
                backgroundColor: "transparent",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "14px",
                color: "#374151",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#F3F4F6")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <HistoryIcon size={16} color="#374151" />
              ประวัติการสแกน
            </button>

            <div
              style={{
                height: "1px",
                backgroundColor: "#E5E7EB",
                margin: "4px 0",
              }}
            />

            <button
              onClick={() => handleMenuClick("logout")}
              style={{
                width: "100%",
                padding: "10px 16px",
                backgroundColor: "transparent",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "14px",
                color: "#DC2626",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#FEE2E2")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <LogoutIcon size={16} color="#DC2626" />
              ออกจากระบบ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
