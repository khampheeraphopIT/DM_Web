import React from "react";

interface ImagePickerWidgetProps {
  imageFile: File | null;
  onCameraPressed: () => void;
  onGalleryPressed: () => void;
  errorText?: string;
  isProcessing: boolean;
  progress: number;
}

const ImagePickerWidget: React.FC<ImagePickerWidgetProps> = ({
  imageFile,
  onCameraPressed,
  onGalleryPressed,
  errorText,
  isProcessing,
  progress,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <span style={{ fontSize: "18px", fontWeight: "bold", color: "#FFFFFF" }}>
        อัปโหลดภาพใบอ้อย
      </span>
      <div style={{ height: "12px" }} />
      <div style={{ display: "flex", width: "100%", gap: "12px" }}>
        <button
          onClick={onCameraPressed}
          style={{
            flex: 1,
            backgroundColor: "#4CAF50",
            color: "#FFFFFF",
            padding: "14px",
            borderRadius: "16px",
            border: "none",
            fontSize: "15px",
            fontWeight: "bold",
            boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "22px" }}>📷</span> ถ่ายภาพ
        </button>
        <button
          onClick={onGalleryPressed}
          style={{
            flex: 1,
            backgroundColor: "#2196F3",
            color: "#FFFFFF",
            padding: "14px",
            borderRadius: "16px",
            border: "none",
            fontSize: "15px",
            fontWeight: "bold",
            boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "22px" }}>🖼️</span> เลือกจากคลัง
        </button>
      </div>
      {imageFile && (
        <div
          style={{
            paddingTop: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "min(400px, 100%)",
              height: "300px",
              borderRadius: "16px",
              border: "3px solid #FFFFFF",
              boxShadow: "0 6px 12px rgba(0,0,0,0.4)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Selected"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {isProcessing && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.7)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    border: "4px solid #f3f3f3",
                    borderTop: "4px solid #4CAF50",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    animation: "spin 1s linear infinite",
                  }}
                />
                <div style={{ height: "16px" }} />
                <span
                  style={{
                    color: "#FFFFFF",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  {Math.round(progress * 100)}%
                </span>
                <div style={{ height: "8px" }} />
                <span style={{ color: "#FFFFFF70", fontSize: "16px" }}>
                  กำลังวิเคราะห์โรค...
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      {errorText && (
        <span style={{ color: "#FF0000", fontSize: "14px", marginTop: "8px" }}>
          {errorText}
        </span>
      )}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ImagePickerWidget;
