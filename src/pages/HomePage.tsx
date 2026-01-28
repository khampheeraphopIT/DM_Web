import React, { useState } from "react";
import type { PredictionResult } from "../types";
import { usePredictDisease } from "../hooks/useDisease";
import { useAuth } from "../contexts/AuthContext";
import {
  Header,
  HeroSection,
  Scanner,
  ResultDisplay,
} from "../components/HomePage";
import { AlertIcon } from "../components/icons";

const HomePage: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);

  const { user, logout, isAuthenticated } = useAuth();
  const predictMutation = usePredictDisease();
  const isLoading = predictMutation.isPending;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setError(response.error || "เกิดข้อผิดพลาดในการวิเคราะห์");
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
    setShowScanner(false);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #F0FDF4 0%, #DCFCE7 100%)",
      }}
    >
      {/* Header */}
      <Header isAuthenticated={isAuthenticated} user={user} onLogout={logout} />

      {/* Error Display */}
      {error && (
        <div
          style={{
            maxWidth: "500px",
            margin: "0 auto 20px",
            padding: "16px",
            background: "#FEE2E2",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#DC2626",
          }}
        >
          <AlertIcon size={20} color="#DC2626" />
          <span>{error}</span>
        </div>
      )}

      {/* Content */}
      {result ? (
        <ResultDisplay result={result} onScanAgain={handleReset} />
      ) : showScanner ? (
        <Scanner
          imagePreview={imagePreview}
          isLoading={isLoading}
          onBack={handleReset}
          onFileSelect={handleFileSelect}
          onRemoveImage={handleRemoveImage}
          onAnalyze={handleAnalyze}
        />
      ) : (
        <HeroSection onStartScan={() => setShowScanner(true)} />
      )}
    </div>
  );
};

export default HomePage;
