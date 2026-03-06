import React, { useState, useEffect } from "react";
import type { RateLimitInfo } from "../../utils/types";

interface RateLimitCardProps {
  rateLimitInfo?: RateLimitInfo | null;
  retryAfter?: number;
  onCountdownEnd?: () => void;
}

export const RateLimitCard: React.FC<RateLimitCardProps> = ({
  rateLimitInfo,
  retryAfter,
  onCountdownEnd,
}) => {
  const [countdown, setCountdown] = useState(0);

  // Only start countdown when actually rate limited or quota full
  useEffect(() => {
    if (retryAfter && retryAfter > 0) {
      setCountdown(retryAfter);
      return;
    }

    if (
      rateLimitInfo &&
      !rateLimitInfo.can_request &&
      rateLimitInfo.next_available_in > 0
    ) {
      setCountdown(rateLimitInfo.next_available_in);
      return;
    }

    setCountdown(0);
  }, [retryAfter, rateLimitInfo]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        const next = Math.max(0, prev - 1);
        if (next === 0 && prev > 0 && onCountdownEnd) {
          setTimeout(onCountdownEnd, 100);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, onCountdownEnd]);

  if (!rateLimitInfo) {
    return (
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "24px",
          border: "1px solid #E5E7EB",
          opacity: 0.6,
          textAlign: "center",
          fontSize: "14px",
          color: "#6B7280",
        }}
      >
        กำลังโหลดข้อมูลการใช้งาน...
      </div>
    );
  }

  const usedDaily = rateLimitInfo.requests_used_day;
  const maxDaily = rateLimitInfo.max_per_day;
  const usagePercent = Math.min(100, (usedDaily / maxDaily) * 100);

  const isDailyFull =
    rateLimitInfo.status_code === "daily_limit" || usedDaily >= maxDaily;

  // Format countdown into readable text
  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "0 วินาที";
    if (seconds < 60) return `${seconds} วินาที`;
    if (seconds < 3600) return `${Math.ceil(seconds / 60)} นาที`;
    const hours = Math.floor(seconds / 3600);
    const mins = Math.ceil((seconds % 3600) / 60);
    return `${hours} ชม. ${mins} นาที`;
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        padding: "20px",
        marginBottom: "24px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "18px" }}>📊</span>
          <span style={{ fontWeight: "600", color: "#374151" }}>
            สถิติการใช้งานวันนี้
          </span>
        </div>
        <span
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: isDailyFull ? "#DC2626" : "#16A34A",
          }}
        >
          {isDailyFull ? "🚫 โควต้าเต็ม" : "✅ พร้อมใช้"}
        </span>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
            marginBottom: "6px",
          }}
        >
          <span style={{ color: "#6B7280" }}>
            ใช้ไปแล้ว:{" "}
            <strong style={{ color: isDailyFull ? "#DC2626" : "#374151" }}>
              {usedDaily}
            </strong>{" "}
            / {maxDaily} ครั้ง
          </span>
          <span style={{ color: "#6B7280" }}>
            {isDailyFull
              ? "เริ่มใหม่พรุ่งนี้"
              : `เหลือ ${rateLimitInfo.remaining_day} ครั้ง`}
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: "8px",
            backgroundColor: "#F3F4F6",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${usagePercent}%`,
              height: "100%",
              backgroundColor: isDailyFull
                ? "#DC2626"
                : usagePercent > 80
                  ? "#F59E0B"
                  : "#10B981",
              transition: "width 0.5s ease-out",
            }}
          />
        </div>
        <div
          style={{
            marginTop: "8px",
            fontSize: "11px",
            color: "#9CA3AF",
            textAlign: "right",
          }}
        >
          * โควต้ารีเซ็ตทุกวันเวลา 07:00 น. (ตามเวลาประเทศไทย)
        </div>
      </div>

      {(countdown > 0 || isDailyFull) && (
        <div
          style={{
            backgroundColor: isDailyFull ? "#FFF1F2" : "#FFFBEB",
            padding: "12px",
            borderRadius: "12px",
            border: `1px solid ${isDailyFull ? "#FECACA" : "#FEF3C7"}`,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "16px" }}>{isDailyFull ? "⏳" : "🕒"}</span>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: isDailyFull ? "#991B1B" : "#92400E",
            }}
          >
            {isDailyFull
              ? `โควต้าเต็มแล้ว โปรดลองใหม่ในอีก ${formatTime(countdown)}`
              : `คุณขอใช้งานบ่อยเกินไป โปรดรออีก ${countdown} วินาที`}
          </span>
        </div>
      )}
    </div>
  );
};
