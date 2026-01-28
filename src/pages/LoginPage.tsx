import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LeafIcon } from "../components/icons";

const LoginPage: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (phone.length < 10) {
      setError("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง");
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(phone, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError("เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setIsLoading(false);
    }
  };

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
            CaneScan
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#6B7280",
              margin: 0,
            }}
          >
            ระบบตรวจโรคใบอ้อยด้วย AI
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <label
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              เบอร์โทรศัพท์
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08XXXXXXXX"
              style={{
                boxSizing: "border-box",
                width: "100%",
                padding: "14px 16px",
                fontSize: "16px",
                border: "2px solid #E5E7EB",
                borderRadius: "12px",
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              maxLength={10}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <label
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              รหัสผ่าน
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="กรอกรหัสผ่าน"
              style={{
                boxSizing: "border-box",
                width: "100%",
                padding: "14px 16px",
                fontSize: "16px",
                border: "2px solid #E5E7EB",
                borderRadius: "12px",
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                backgroundColor: "#FEE2E2",
                color: "#DC2626",
                padding: "12px 16px",
                borderRadius: "10px",
                fontSize: "14px",
              }}
            >
              <span>❌ {error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#22C55E",
              borderRadius: "14px",
              boxShadow: "0 4px 14px rgba(34, 197, 94, 0.4)",
              marginTop: "8px",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "⏳ กำลังเข้าสู่ระบบ..." : "🔐 เข้าสู่ระบบ"}
          </button>
        </form>

        {/* Demo Note */}
        <div
          style={{
            marginTop: "24px",
            padding: "14px",
            backgroundColor: "#F3F4F6",
            borderRadius: "12px",
            textAlign: "center",
            fontSize: "13px",
            color: "#6B7280",
          }}
        >
          <p>
            🧪 <strong>Demo:</strong> ใช้รหัสผ่าน{" "}
            <code
              style={{
                padding: "2px 8px",
                backgroundColor: "#E5E7EB",
                borderRadius: "4px",
                fontFamily: "monospace",
                fontSize: "14px",
              }}
            >
              1234
            </code>
          </p>
        </div>

        {/* Back to Home Link */}
        <Link
          to="/"
          style={{
            display: "block",
            textAlign: "center",
            marginTop: "20px",
            color: "#6B7280",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ← กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
