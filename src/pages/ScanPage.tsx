import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { PredictionResult, RateLimitInfo } from "../utils/types";
import { usePredictDisease, useGetRateLimit } from "../hooks/useDisease";
import { UploadIcon, LeafIcon, TrashIcon } from "../components/common/icons";
import { ResultCard, RateLimitCard } from "../components/scan";
import BackToHomeButton from "../components/common/BackToHomeButton";
import ErrorAlert from "../components/common/ErrorAlert";

const ScanPage: React.FC = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo | null>(
    null,
  );
  const [retryAfter, setRetryAfter] = useState<number>(0);

  const predictMutation = usePredictDisease();
  const { data: initialRateLimit, refetch: refetchRateLimit } =
    useGetRateLimit();

  // Load initial rate limit from localStorage if available to prevent 0/20 flicker
  useEffect(() => {
    const savedLimit = localStorage.getItem("canescan_rate_limit");
    if (savedLimit) {
      try {
        const parsed = JSON.parse(savedLimit);
        setRateLimitInfo(parsed);
      } catch (e) {
        console.error("Error loading saved rate limit", e);
      }
    }
  }, []);

  // Save to localStorage whenever rateLimitInfo updates
  useEffect(() => {
    if (rateLimitInfo) {
      localStorage.setItem(
        "canescan_rate_limit",
        JSON.stringify(rateLimitInfo),
      );
    }
  }, [rateLimitInfo]);

  const isLoading = predictMutation.isPending;
  const currentRateLimit = rateLimitInfo || initialRateLimit;

  // Sync internal rate limit state when initial query loads
  useEffect(() => {
    if (initialRateLimit) {
      // If we have saved info that is more restricted (higher usage), keep it
      setRateLimitInfo((prev) => {
        if (!prev) return initialRateLimit;
        if (initialRateLimit.requests_used_day < prev.requests_used_day) {
          return prev;
        }
        return initialRateLimit;
      });
    }
  }, [initialRateLimit]);

  const handleCountdownEnd = async () => {
    const freshData = await refetchRateLimit();
    if (freshData.data) {
      setRateLimitInfo(freshData.data);
      setRetryAfter(0);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;
    setError(null);
    try {
      const response = await predictMutation.mutateAsync(imageFile);

      if (response.rate_limit) {
        setRateLimitInfo(response.rate_limit);
      }

      if (response.success && response.data) {
        setResult(response.data);
      } else {
        if (response.retry_after) {
          setRetryAfter(response.retry_after);
        }
        setError(
          response.message || response.error || "เกิดข้อผิดพลาดในการวิเคราะห์",
        );
      }
    } catch {
      setError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
    setRetryAfter(0);
  };

  const isButtonDisabled =
    isLoading || (currentRateLimit && !currentRateLimit.can_request);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F9FAFB",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "16px 24px",
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <LeafIcon size={28} color="#16A34A" />
          <span
            style={{ fontSize: "20px", fontWeight: "600", color: "#1F2937" }}
          >
            CaneScan
          </span>
        </div>
        <BackToHomeButton variant="outlined" showIcon={false} />
      </header>

      {/* Main */}
      <main
        style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}
      >
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "600",
              color: "#1F2937",
              marginBottom: "8px",
            }}
          >
            วิเคราะห์โรคใบอ้อย
          </h1>
          <p style={{ color: "#6B7280", fontSize: "16px" }}>
            อัพโหลดรูปภาพใบอ้อยเพื่อตรวจสอบโรค
          </p>
        </div>

        {/* Rate Limit Status Card */}
        <RateLimitCard
          rateLimitInfo={currentRateLimit}
          retryAfter={retryAfter}
          onCountdownEnd={handleCountdownEnd}
        />

        {/* Error Alert */}
        {error && (
          <div style={{ marginBottom: "24px" }}>
            <ErrorAlert message={error} />
          </div>
        )}

        {/* Result or Upload */}
        {result ? (
          <ResultCard
            result={result}
            imagePreview={imagePreview}
            onScanAgain={handleReset}
          />
        ) : (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              padding: "40px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            {/* Upload Zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() =>
                !imagePreview && document.getElementById("file-input")?.click()
              }
              style={{
                border: "2px dashed #D1D5DB",
                borderRadius: "12px",
                padding: imagePreview ? "20px" : "60px 40px",
                textAlign: "center",
                backgroundColor: imagePreview ? "#F9FAFB" : "transparent",
                cursor: "pointer",
              }}
            >
              {imagePreview ? (
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    maxWidth: "100%",
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "400px",
                      borderRadius: "12px",
                      display: "block",
                      objectFit: "contain",
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      width: "36px",
                      height: "36px",
                      backgroundColor: "rgba(254, 242, 242, 0.9)",
                      color: "#DC2626",
                      border: "none",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      transition: "all 0.2s ease",
                      zIndex: 10,
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#FEF2F2")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "rgba(254, 242, 242, 0.9)")
                    }
                    title="ลบรูปภาพ"
                  >
                    <TrashIcon size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      backgroundColor: "#F0FDF4",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                    }}
                  >
                    <UploadIcon size={28} color="#16A34A" />
                  </div>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#374151",
                      marginBottom: "8px",
                    }}
                  >
                    ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือก
                  </p>
                  <p style={{ fontSize: "14px", color: "#9CA3AF" }}>
                    รองรับ JPEG, PNG (สูงสุด 10MB)
                  </p>
                </>
              )}
            </div>

            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />

            {/* Analyze Button */}
            {imageFile && (
              <button
                onClick={handleAnalyze}
                disabled={isButtonDisabled}
                style={{
                  width: "100%",
                  marginTop: "24px",
                  padding: "16px",
                  backgroundColor: isButtonDisabled ? "#9CA3AF" : "#16A34A",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: isButtonDisabled ? "not-allowed" : "pointer",
                  boxShadow: isButtonDisabled
                    ? "none"
                    : "0 4px 14px rgba(22, 163, 74, 0.3)",
                }}
              >
                {isLoading
                  ? "กำลังวิเคราะห์..."
                  : currentRateLimit && !currentRateLimit.can_request
                    ? "โปรดรอโควต้าคืนค่า..."
                    : "เริ่มวิเคราะห์"}
              </button>
            )}
          </div>
        )}

        {/* Tips */}
        {!result && (
          <div
            style={{
              marginTop: "32px",
              padding: "20px",
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              border: "1px solid #E5E7EB",
            }}
          >
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "12px",
              }}
            >
              💡 เคล็ดลับการถ่ายภาพ
            </h3>
            <ul
              style={{
                margin: 0,
                paddingLeft: "20px",
                color: "#6B7280",
                fontSize: "14px",
                lineHeight: "1.8",
              }}
            >
              <li>ถ่ายใบอ้อยให้ชัดเจน เห็นรายละเอียด</li>
              <li>ให้แสงสว่างเพียงพอ หลีกเลี่ยงเงา</li>
              <li>ถ่ายใกล้ๆ ส่วนที่มีอาการผิดปกติ</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default ScanPage;
