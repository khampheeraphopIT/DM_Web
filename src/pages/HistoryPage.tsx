import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LeafIcon,
  CameraIcon,
  LockIcon,
  DatabaseIcon,
} from "../components/common/icons";
import { useGetHistory } from "../hooks/useDisease";
import { useAuth } from "../contexts/AuthContext";
import HistoryCard from "../components/history/HistoryCard";
import PageHeader from "../components/common/PageHeader";
import UserInfoCard from "../components/common/UserInfoCard";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import BackToHomeButton from "../components/common/BackToHomeButton";
import type { HistoryItem } from "../services/api";

const diseaseThaiMap: Record<string, string> = {
  "Red Rot": "โรคเหี่ยวเน่าแดง",
  "Sugarcane Streak Virus": "ไวรัสใบขีดอ้อย",
  "Sugarcane Mosaic Virus": "ไวรัสใบด่างอ้อย",
  "Bacterial Blight": "โรคขอบใบแห้ง",
  Rust: "โรคราสนิม",
  Smut: "โรคราเขม่าดำ",
  "Yellow Leaf": "โรคใบเหลือง",
  Healthy: "ใบอ้อยสุขภาพดี",
  "Brown Spot": "โรคใบจุดสีน้ำตาล",
  "Pokkah Boeng": "โรคยอดบิด (Pokkah Boeng)",
  "Grassy Shoot": "โรคกอตะไคร้",
  "Leaf Fleck": "โรคใบจุดขาว",
};

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { data: scanHistory = [], isLoading } = useGetHistory();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Not logged in - show login prompt
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #F0FDF4 0%, #DCFCE7 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
        }}
      >
        <EmptyState
          icon={<LeafIcon size={80} color="#D1D5DB" />}
          title="กรุณาเข้าสู่ระบบ"
          description="เข้าสู่ระบบเพื่อดูประวัติการสแกนของคุณ"
          action={
            <div style={{ display: "flex", gap: "12px" }}>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="primary"
                  icon={<LockIcon size={18} color="white" />}
                >
                  เข้าสู่ระบบ
                </Button>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button variant="secondary">สมัครสมาชิก</Button>
              </Link>
            </div>
          }
        />
        <BackToHomeButton variant="link" style={{ marginTop: "24px" }} />
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
      <PageHeader title="ประวัติการสแกน" />

      {/* User Info */}
      {user && (
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto 16px",
            padding: "0 20px",
          }}
        >
          <UserInfoCard name={user.name} phone={user.phone} />
        </div>
      )}

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
        {isLoading ? (
          <div
            style={{ textAlign: "center", padding: "40px", color: "#6B7280" }}
          >
            กำลังดึงข้อมูล...
          </div>
        ) : scanHistory.length === 0 ? (
          <EmptyState
            icon={<CameraIcon size={80} color="#D1D5DB" />}
            title="ยังไม่มีประวัติการสแกน"
            description="เริ่มสแกนใบอ้อยของคุณเพื่อบันทึกประวัติ"
            action={
              <Button
                variant="primary"
                icon={<CameraIcon size={20} color="white" />}
                onClick={() => navigate("/scan")}
              >
                เริ่มสแกนเลย
              </Button>
            }
          />
        ) : (
          scanHistory.map((item: HistoryItem) => (
            <HistoryCard
              key={item.id}
              item={item}
              isExpanded={expandedId === item.id}
              onToggle={() => toggleExpand(item.id)}
              diseaseThaiMap={diseaseThaiMap}
            />
          ))
        )}
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
          opacity: 0.6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <DatabaseIcon size={14} color="#166534" />
        <p style={{ fontSize: "12px", color: "#166534", margin: 0 }}>
          ข้อมูลบันทึกในระบบ PostgreSQL
        </p>
      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              max-height: 0;
            }
            to {
              opacity: 1;
              max-height: 500px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default HistoryPage;
