import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LeafIcon, CameraIcon } from "../components/icons";

interface ScanHistory {
  id: string;
  date: string;
  image: string;
  disease: string;
  disease_th: string;
  severity: string;
  confidence: number;
}

const HistoryPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Mock data - ในอนาคตจะดึงจาก API/LocalStorage
  const scanHistory: ScanHistory[] = [
    {
      id: "1",
      date: "2026-01-28T14:30:00",
      image: "/placeholder-leaf.jpg",
      disease: "Red Rot",
      disease_th: "โรคใบแดง",
      severity: "moderate",
      confidence: 0.92,
    },
    {
      id: "2",
      date: "2026-01-27T10:15:00",
      image: "/placeholder-leaf.jpg",
      disease: "Healthy",
      disease_th: "ใบอ้อยสุขภาพดี",
      severity: "none",
      confidence: 0.98,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      severe: "#DC2626",
      moderate: "#D97706",
      mild: "#059669",
      none: "#10B981",
    };
    return colors[severity] || "#10B981";
  };

  const getSeverityText = (severity: string) => {
    const texts: Record<string, string> = {
      severe: "รุนแรง",
      moderate: "ปานกลาง",
      mild: "เล็กน้อย",
      none: "ไม่มี",
    };
    return texts[severity] || "ไม่ทราบ";
  };

  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #F0FDF4 0%, #DCFCE7 100%)",
          paddingBottom: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
            textAlign: "center",
            padding: "40px 20px",
          }}
        >
          <CameraIcon size={80} color="#D1D5DB" />
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#374151",
              margin: "16px 0 8px 0",
            }}
          >
            กรุณาเข้าสู่ระบบ
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "#6B7280",
              marginBottom: "24px",
              maxWidth: "300px",
            }}
          >
            คุณต้องเข้าสู่ระบบก่อนเพื่อดูประวัติการสแกน
          </p>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "14px 32px",
              background: "linear-gradient(135deg, #22C55E, #16A34A)",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "14px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(34, 197, 94, 0.3)",
            }}
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #F0FDF4 0%, #DCFCE7 100%)",
        paddingBottom: "40px",
      }}
    >
      {/* Header */}
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
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            color: "#6B7280",
            fontSize: "16px",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          ← กลับ
        </button>
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
            ประวัติการสแกน
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              color: "#6B7280",
            }}
          >
            {user?.name}
          </span>
        </div>
      </header>

      {/* History List */}
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {scanHistory.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              textAlign: "center",
              padding: "40px 20px",
            }}
          >
            <CameraIcon size={80} color="#D1D5DB" />
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#374151",
                margin: "16px 0 8px 0",
              }}
            >
              ยังไม่มีประวัติการสแกน
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "#6B7280",
                marginBottom: "24px",
                maxWidth: "300px",
              }}
            >
              เริ่มสแกนใบอ้อยของคุณเพื่อสร้างประวัติ
            </p>
            <button
              onClick={() => navigate("/")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                background: "linear-gradient(135deg, #22C55E, #16A34A)",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "14px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(34, 197, 94, 0.3)",
              }}
            >
              <CameraIcon size={20} color="white" />
              <span>เริ่มสแกน</span>
            </button>
          </div>
        ) : (
          scanHistory.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "16px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #F3F4F6",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#6B7280",
                    }}
                  >
                    {formatDate(item.date)}
                  </span>
                </div>
                <div
                  style={{
                    padding: "4px 12px",
                    borderRadius: "12px",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "600",
                    backgroundColor: getSeverityColor(item.severity),
                  }}
                >
                  {getSeverityText(item.severity)}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#166534",
                      margin: "0 0 4px 0",
                    }}
                  >
                    {item.disease_th}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6B7280",
                      margin: 0,
                    }}
                  >
                    {item.disease}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#9CA3AF",
                      marginBottom: "2px",
                    }}
                  >
                    ความมั่นใจ
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#16A34A",
                    }}
                  >
                    {Math.round(item.confidence * 100)}%
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
