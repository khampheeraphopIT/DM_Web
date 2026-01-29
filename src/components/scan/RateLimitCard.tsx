import React, { useState, useEffect } from "react";
import type { RateLimitInfo } from "../../types";

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

  // Only start countdown when actually rate limited
  useEffect(() => {
    // Priority 1: API returned retry_after
    if (retryAfter && retryAfter > 0) {
      setCountdown(retryAfter);
      return;
    }

    // Priority 2: Rate limit info says can't request AND has wait time
    if (
      rateLimitInfo &&
      !rateLimitInfo.can_request &&
      rateLimitInfo.next_available_in > 0
    ) {
      setCountdown(rateLimitInfo.next_available_in);
      return;
    }

    // Otherwise no countdown needed
    setCountdown(0);
  }, [retryAfter, rateLimitInfo]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        const next = Math.max(0, prev - 1);
        // When countdown reaches 0, call the callback
        if (next === 0 && prev > 0 && onCountdownEnd) {
          setTimeout(onCountdownEnd, 100);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, onCountdownEnd]);

  if (!rateLimitInfo) return null;

  const usedToday = rateLimitInfo.requests_used_day;
  const maxToday = rateLimitInfo.max_per_day;
  const percentUsed = (usedToday / maxToday) * 100;

  return (
    <div
      style={{
        padding: "16px 20px",
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        marginBottom: "24px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>
          📊 สถานะการใช้งาน
        </span>
        {countdown > 0 && (
          <span
            style={{
              fontSize: "12px",
              padding: "4px 10px",
              backgroundColor: "#FEF3C7",
              color: "#92400E",
              borderRadius: "12px",
              fontWeight: "500",
            }}
          >
            ⏳ รอ {countdown} วินาที
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: "12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "6px",
          }}
        >
          <span style={{ fontSize: "13px", color: "#6B7280" }}>
            ใช้วันนี้: {usedToday}/{maxToday} ครั้ง
          </span>
          <span style={{ fontSize: "13px", color: "#6B7280" }}>
            เหลือ {rateLimitInfo.remaining_day} ครั้ง
          </span>
        </div>
        <div
          style={{
            height: "8px",
            backgroundColor: "#E5E7EB",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${percentUsed}%`,
              backgroundColor:
                percentUsed >= 80
                  ? "#DC2626"
                  : percentUsed >= 50
                    ? "#D97706"
                    : "#16A34A",
              borderRadius: "4px",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div
          style={{
            flex: 1,
            padding: "10px",
            backgroundColor: "#F9FAFB",
            borderRadius: "8px",
            textAlign: "center",
            minWidth: "100px",
          }}
        >
          <span
            style={{ fontSize: "12px", color: "#6B7280", display: "block" }}
          >
            ต่อนาที
          </span>
          <span
            style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}
          >
            {rateLimitInfo.remaining_minute}/{rateLimitInfo.max_per_minute}
          </span>
        </div>
        <div
          style={{
            flex: 1,
            padding: "10px",
            backgroundColor: rateLimitInfo.can_request ? "#F0FDF4" : "#FEF2F2",
            borderRadius: "8px",
            textAlign: "center",
            minWidth: "100px",
          }}
        >
          <span
            style={{ fontSize: "12px", color: "#6B7280", display: "block" }}
          >
            สถานะ
          </span>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: rateLimitInfo.can_request ? "#16A34A" : "#DC2626",
            }}
          >
            {rateLimitInfo.can_request ? "✓ พร้อมใช้" : "⏳ รอสักครู่"}
          </span>
        </div>
      </div>
    </div>
  );
};
