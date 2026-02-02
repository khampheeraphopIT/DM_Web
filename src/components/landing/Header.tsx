import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../common/Logo";
import { AvatarMenu } from "../common/AvatarMenu";
import { MenuIcon, CloseIcon, HistoryIcon, LogoutIcon } from "../common/icons";
import { useAuth } from "../../contexts/AuthContext";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNavClick = (action: string) => {
    setIsMobileMenuOpen(false);
    switch (action) {
      case "features":
        window.location.href = "#features";
        break;
      case "how-it-works":
        window.location.href = "#how-it-works";
        break;
      case "login":
        navigate("/login");
        break;
      case "register":
        navigate("/register");
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
    <>
      <header
        style={{
          padding: isMobile ? "12px 16px" : "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #F3F4F6",
          position: "relative",
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <Logo size={isMobile ? 32 : 36} />

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <a
              href="#features"
              style={{
                color: "#6B7280",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              ฟีเจอร์
            </a>
            <a
              href="#how-it-works"
              style={{
                color: "#6B7280",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              วิธีใช้งาน
            </a>
            <AvatarMenu size={40} />
          </nav>
        )}

        {/* Mobile Hamburger Button */}
        {isMobile && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: "none",
              border: "none",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isMobileMenuOpen ? (
              <CloseIcon size={24} color="#374151" />
            ) : (
              <MenuIcon size={24} color="#374151" />
            )}
          </button>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "56px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 99,
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      {isMobile && isMobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "56px",
            left: 0,
            right: 0,
            backgroundColor: "#FFFFFF",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 100,
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            animation: "slideDown 0.2s ease",
          }}
        >
          {/* User Info (if logged in) */}
          {isAuthenticated && user && (
            <div
              style={{
                padding: "12px",
                backgroundColor: "#F0FDF4",
                borderRadius: "12px",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#DCFCE7",
                  border: "2px solid #16A34A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#166534",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
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
                <p style={{ margin: 0, color: "#6B7280", fontSize: "12px" }}>
                  {user.phone}
                </p>
              </div>
            </div>
          )}

          {/* Nav Links */}
          <button
            onClick={() => handleNavClick("features")}
            style={{
              padding: "12px 16px",
              backgroundColor: "transparent",
              border: "none",
              textAlign: "left",
              fontSize: "15px",
              fontWeight: "500",
              color: "#374151",
              cursor: "pointer",
              borderRadius: "8px",
            }}
          >
            ฟีเจอร์
          </button>
          <button
            onClick={() => handleNavClick("how-it-works")}
            style={{
              padding: "12px 16px",
              backgroundColor: "transparent",
              border: "none",
              textAlign: "left",
              fontSize: "15px",
              fontWeight: "500",
              color: "#374151",
              cursor: "pointer",
              borderRadius: "8px",
            }}
          >
            วิธีใช้งาน
          </button>

          <div
            style={{
              height: "1px",
              backgroundColor: "#E5E7EB",
              margin: "8px 0",
            }}
          />

          {isAuthenticated ? (
            <>
              <button
                onClick={() => handleNavClick("history")}
                style={{
                  padding: "12px 16px",
                  backgroundColor: "transparent",
                  border: "none",
                  textAlign: "left",
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "#374151",
                  cursor: "pointer",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <HistoryIcon size={18} color="#374151" />
                ประวัติการสแกน
              </button>
              <button
                onClick={() => handleNavClick("logout")}
                style={{
                  padding: "12px 16px",
                  backgroundColor: "#FEE2E2",
                  border: "none",
                  textAlign: "left",
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "#DC2626",
                  cursor: "pointer",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <LogoutIcon size={18} color="#DC2626" />
                ออกจากระบบ
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavClick("login")}
                style={{
                  padding: "12px 16px",
                  backgroundColor: "transparent",
                  border: "2px solid #16A34A",
                  textAlign: "center",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#16A34A",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
              >
                เข้าสู่ระบบ
              </button>
              <button
                onClick={() => handleNavClick("register")}
                style={{
                  padding: "12px 16px",
                  backgroundColor: "#16A34A",
                  border: "none",
                  textAlign: "center",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "white",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
              >
                สมัครสมาชิก
              </button>
            </>
          )}
        </div>
      )}

      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
};
