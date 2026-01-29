import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { PredictionResult } from "../types";
import { usePredictDisease } from "../hooks/useDisease";
import { AlertIcon, UploadIcon, LeafIcon } from "../components/icons";
import { ResultCard } from "../components/scan";

const ScanPage: React.FC = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);

  const predictMutation = usePredictDisease();
  const isLoading = predictMutation.isPending;

  // Countdown timer logic
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
      setCountdown(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
      setCountdown(0);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;
    setError(null);
    try {
      const response = await predictMutation.mutateAsync(imageFile);

      if (response.success && response.data) {
        setResult(response.data);
      } else {
        // Handle rate limit error
        if (response.error_type === "rate_limit" && response.retry_after) {
          setCountdown(response.retry_after);
          setError(
            response.message ||
              `กรุณารอ ${response.retry_after} วินาที แล้วลองใหม่`,
          );
        } else {
          setError(
            response.message ||
              response.error ||
              "เกิดข้อผิดพลาดในการวิเคราะห์",
          );
        }
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
    setCountdown(0);
  };

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
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "8px 16px",
            backgroundColor: "transparent",
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            cursor: "pointer",
            color: "#6B7280",
            fontSize: "14px",
          }}
        >
          กลับหน้าหลัก
        </button>
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

        {/* Error Alert with Countdown */}
        {error && (
          <div
            style={{
              padding: "12px 16px",
              backgroundColor: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: "8px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#DC2626",
            }}
          >
            <AlertIcon size={18} color="#DC2626" />
            <span style={{ fontSize: "14px" }}>
              {countdown > 0
                ? `กรุณารออีก ${countdown} วินาที แล้วลองใหม่`
                : error}
            </span>
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
                <div>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      borderRadius: "12px",
                      marginBottom: "16px",
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#FEF2F2",
                      color: "#DC2626",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    ลบรูปภาพ
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
                disabled={isLoading || countdown > 0}
                style={{
                  width: "100%",
                  marginTop: "24px",
                  padding: "16px",
                  backgroundColor:
                    isLoading || countdown > 0 ? "#9CA3AF" : "#16A34A",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor:
                    isLoading || countdown > 0 ? "not-allowed" : "pointer",
                  boxShadow:
                    isLoading || countdown > 0
                      ? "none"
                      : "0 4px 14px rgba(22, 163, 74, 0.3)",
                }}
              >
                {isLoading
                  ? "กำลังวิเคราะห์..."
                  : countdown > 0
                    ? `กรุณารอ (${countdown}ว)`
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
