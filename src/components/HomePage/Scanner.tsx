import React, { useRef } from "react";
import {
  BackIcon,
  TrashIcon,
  CameraIcon,
  ImageIcon,
  SearchIcon,
  SpinnerIcon,
} from "../common/icons";

interface ScannerProps {
  imagePreview: string | null;
  isLoading: boolean;
  onBack: () => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  onAnalyze: () => void;
}

export const Scanner: React.FC<ScannerProps> = ({
  imagePreview,
  isLoading,
  onBack,
  onFileSelect,
  onRemoveImage,
  onAnalyze,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 20px",
          background: "white",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          color: "#6B7280",
          fontSize: "16px",
          marginBottom: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <BackIcon size={20} />
        <span>กลับ</span>
      </button>

      {/* Scanner Card */}
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          background: "white",
          borderRadius: "24px",
          padding: "24px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#166534",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          สแกนใบอ้อย
        </h2>

        {/* Image Preview Area */}
        <div
          style={{
            width: "100%",
            aspectRatio: "4/3",
            background: "#F3F4F6",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            overflow: "hidden",
            border: "2px dashed #D1D5DB",
          }}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "#9CA3AF",
              }}
            >
              <CameraIcon size={48} color="#D1D5DB" />
              <p style={{ marginTop: "12px" }}>เลือกหรือถ่ายภาพใบอ้อย</p>
            </div>
          )}
        </div>

        {/* Hidden Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileSelect}
          style={{ display: "none" }}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={onFileSelect}
          style={{ display: "none" }}
        />

        {/* Action Buttons */}
        {!imagePreview ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <button
              onClick={() => cameraInputRef.current?.click()}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "14px",
                background: "linear-gradient(135deg, #22C55E, #16A34A)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              <CameraIcon size={20} color="white" />
              <span>ถ่ายภาพ</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "14px",
                background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              <ImageIcon size={20} color="white" />
              <span>เลือกไฟล์</span>
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <button
              onClick={onRemoveImage}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px",
                background: "#FEE2E2",
                color: "#DC2626",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              <TrashIcon size={18} color="#DC2626" />
              <span>ลบภาพ</span>
            </button>
            <button
              onClick={onAnalyze}
              disabled={isLoading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "16px",
                background: isLoading
                  ? "#9CA3AF"
                  : "linear-gradient(135deg, #22C55E, #16A34A)",
                color: "white",
                border: "none",
                borderRadius: "14px",
                cursor: isLoading ? "not-allowed" : "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                boxShadow: "0 4px 16px rgba(34, 197, 94, 0.3)",
              }}
            >
              {isLoading ? (
                <>
                  <SpinnerIcon size={20} color="white" />
                  <span>กำลังวิเคราะห์...</span>
                </>
              ) : (
                <>
                  <SearchIcon size={20} color="white" />
                  <span>วิเคราะห์โรค</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
