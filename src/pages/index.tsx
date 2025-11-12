/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { ApiService } from "../services/apiServices";
import { ImageService } from "../services/imageServices";
import { WeatherService } from "../services/weatherServices";
import ImagePickerWidget from "../components/common/imagePicker";
import ResultDisplay from "../components/common/resultdisplay";
import LocationWidget from "../components/common/location";
import type { PredictionResult } from "../type/predictionResults";

const useHome = () => {
  const apiService = new ApiService();

  // === State ===
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [resizedImageFile, setResizedImageFile] = useState<File | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0.0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentProvince, setCurrentProvince] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationPermissionDenied, setLocationPermissionDenied] =
    useState(false);
  const [preFetchedWeather, setPreFetchedWeather] = useState<Record<
    string,
    string
  > | null>(null);

  const progressTimer = useRef<NodeJS.Timeout | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // === Effects ===
  useEffect(() => {
    getCurrentLocation();
    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, []);

  // === Functions ===
  const showErrorDialog = (message: string, showSettings = false) => {
    alert(message);
    if (showSettings) {
      alert("ไปที่การตั้งค่าเบราว์เซอร์ > ความเป็นส่วนตัว > ตำแหน่ง");
    }
  };

  const getCurrentLocation = async () => {
    setIsGettingLocation(true);
    setIsLoading(true);
    setGeneralError(null);
    setLocationPermissionDenied(false);

    try {
      if (!navigator.geolocation) {
        const msg = "เบราว์เซอร์ไม่รองรับการดึงตำแหน่ง";
        showErrorDialog(msg);
        setGeneralError(msg);
        setIsLoading(false);
        setIsGettingLocation(false);
        return;
      }

      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0,
          });
        }
      );

      const weatherData = await WeatherService.getWeatherAndProvince(
        position.coords.latitude,
        position.coords.longitude
      );

      if (weatherData && weatherData.province) {
        setCurrentProvince(weatherData.province);
        setPreFetchedWeather({
          temp: weatherData.temperature || "-",
          hum: weatherData.humidity || "-",
          rain: weatherData.rainfall || "-",
        });
      } else {
        setCurrentProvince("ไม่พบจังหวัด");
        const msg = "ไม่สามารถระบุจังหวัดได้\nกรุณาเปิด GPS และลองอีกครั้ง";
        setGeneralError(msg);
        showErrorDialog(msg);
      }
    } catch (error: any) {
      let msg = "";
      if (error.code === 1) {
        msg = "กรุณาอนุญาตตำแหน่งเพื่อใช้งานเว็บ";
        setLocationPermissionDenied(true);
        showErrorDialog(msg, true);
      } else if (error.code === 2) {
        msg = "ไม่สามารถดึงตำแหน่งได้ ลองอีกครั้ง";
      } else if (error.code === 3) {
        msg = "ดึงตำแหน่งช้าเกินไป\nกรุณาเปิด GPS และลองอีกครั้ง";
      } else {
        msg = `เกิดข้อผิดพลาด: ${error.message}`;
      }
      showErrorDialog(msg);
      setGeneralError(msg);
    } finally {
      setIsGettingLocation(false);
      setIsLoading(false);
    }
  };

  const pickImage = async (_fromCamera: boolean, file: File) => {
    try {
      const files = await ImageService.preprocessImage(file);
      setOriginalImageFile(files.original);
      setResizedImageFile(files.resized);
      setImageFile(files.original);
      setFileError(null);
      setResult(null);
    } catch (e) {
      setFileError((e as Error).message);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fromCamera: boolean
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = file.name.split(".").pop()?.toLowerCase();
    const allowed = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    if (!allowed.includes(extension || "")) {
      setFileError("รองรับเฉพาะไฟล์ภาพ: JPG, PNG, GIF, BMP, WEBP");
      return;
    }

    pickImage(fromCamera, file);
    e.target.value = "";
  };

  const onCameraPressed = () => cameraInputRef.current?.click();
  const onGalleryPressed = () => galleryInputRef.current?.click();

  const startProgressSimulation = () => {
    if (progressTimer.current) clearInterval(progressTimer.current);
    setUploadProgress(0.0);

    progressTimer.current = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev < 0.9) {
          const newProg = prev + 0.03;
          return newProg > 0.9 ? 0.9 : newProg;
        }
        return prev;
      });
    }, 80);
  };

  const submit = async () => {
    setResult(null);
    setFileError(null);
    setGeneralError(null);
    setIsSubmitting(true);
    setUploadProgress(0.0);

    if (!currentProvince || currentProvince === "ไม่พบจังหวัด") {
      setGeneralError("ไม่สามารถระบุจังหวัดได้");
      setIsSubmitting(false);
      return;
    }
    if (!resizedImageFile) {
      setFileError("กรุณาอัปโหลดภาพ");
      setIsSubmitting(false);
      return;
    }

    startProgressSimulation();

    try {
      const res = await apiService.predictDisease(
        currentProvince,
        resizedImageFile
      );
      setUploadProgress(1.0);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setResult(res);
    } catch (e) {
      setGeneralError(`เกิดข้อผิดพลาด: ${(e as Error).message}`);
    } finally {
      if (progressTimer.current) clearInterval(progressTimer.current);
      setIsSubmitting(false);
      setUploadProgress(0.0);
    }
  };

  // === Return API ===
  return {
    // State
    imageFile: imageFile,
    result,
    fileError,
    generalError,
    isLoading,
    uploadProgress,
    isSubmitting,
    currentProvince,
    isGettingLocation,
    locationPermissionDenied,
    preFetchedWeather,

    // Refs
    cameraInputRef,
    galleryInputRef,

    // Functions
    handleFileChange,
    onCameraPressed,
    onGalleryPressed,
    submit,
    getCurrentLocation,
  };
};

const Home: React.FC = () => {
  const hook = useHome();

  const buildLocationCard = () => (
    <div
      style={{
        boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
        borderRadius: "20px",
        backgroundColor: "#FFF",
        padding: "20px",
      }}
    >
      <LocationWidget
        province={hook.currentProvince || undefined}
        isLoading={hook.isGettingLocation}
        errorText={
          hook.locationPermissionDenied
            ? "กรุณาเปิดตำแหน่งในตั้งค่า"
            : undefined
        }
        temperature={hook.preFetchedWeather?.temp}
        humidity={hook.preFetchedWeather?.hum}
        rainfall={hook.preFetchedWeather?.rain}
      />
    </div>
  );

  if (hook.isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            border: "8px solid #f3f3f3",
            borderTop: "8px solid #4CAF50",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, #F5F5F5 0%, #E0E0E0 40%, #212121 100%)",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "600px", width: "100%" }}>
        <div style={{ height: "20px" }} />
        {buildStackedImages()}
        <div style={{ height: "30px" }} />
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#000",
            textAlign: "center",
            lineHeight: "1.2",
          }}
        >
          สแกนตรวจ
          <br />
          โรคใบอ้อย
        </h1>
        <div style={{ height: "40px" }} />
        {buildLocationCard()}
        <div style={{ height: "20px" }} />

        <ImagePickerWidget
          imageFile={hook.imageFile}
          onCameraPressed={hook.onCameraPressed}
          onGalleryPressed={hook.onGalleryPressed}
          errorText={hook.fileError || undefined}
          isProcessing={hook.isSubmitting}
          progress={hook.uploadProgress}
        />

        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={hook.cameraInputRef}
          style={{ display: "none" }}
          onChange={(e) => hook.handleFileChange(e, true)}
        />
        <input
          type="file"
          accept="image/*"
          ref={hook.galleryInputRef}
          style={{ display: "none" }}
          onChange={(e) => hook.handleFileChange(e, false)}
        />

        <div style={{ height: "30px" }} />
        <button
          onClick={hook.submit}
          style={{
            width: "100%",
            height: "56px",
            backgroundColor: "#2196F3",
            borderRadius: "30px",
            border: "none",
            color: "#FFF",
            fontSize: "18px",
            fontWeight: "bold",
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
            cursor: "pointer",
          }}
        >
          ดำเนินการต่อ
        </button>

        <div style={{ height: "20px" }} />
        {hook.generalError && (
          <>
            <p
              style={{
                color: "#FF5252",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              {hook.generalError}
            </p>
            <div style={{ height: "10px" }} />
            <button
              onClick={hook.getCurrentLocation}
              style={{
                width: "100%",
                backgroundColor: "#FF9800",
                color: "#FFF",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              ลองดึงตำแหน่งอีกครั้ง
            </button>
          </>
        )}

        {hook.result && (
          <>
            <ResultDisplay result={hook.result} />
            <div style={{ height: "20px" }} />
            <button
              onClick={hook.submit}
              style={{
                width: "100%",
                height: "50px",
                backgroundColor: "#FF9800",
                borderRadius: "30px",
                border: "none",
                color: "#FFF",
                fontSize: "16px",
                fontWeight: "bold",
                boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                cursor: "pointer",
              }}
            >
              ลองอีกครั้ง
            </button>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

// === UI Helper Functions ===
const buildStackedImages = () => (
  <div
    style={{
      height: "220px",
      position: "relative",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    }}
  >
    {/* [เหมือนเดิมทุกอย่าง] */}
    <div
      style={{
        position: "absolute",
        left: "20px",
        top: "30px",
        transform: "rotate(-0.15rad)",
        width: "140px",
        height: "180px",
        backgroundColor: "#FFF",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.26)",
        padding: "12px",
      }}
    >
      <span style={{ fontSize: "12px", color: "#616161" }}>S = ½bh</span>
      <br />
      <span style={{ fontSize: "11px", color: "#757575" }}>A = πr²</span>
      <br />
      <span style={{ fontSize: "10px", color: "#9E9E9E" }}>sin x</span>
    </div>
    <div
      style={{
        width: "180px",
        height: "180px",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 6px 12px rgba(0,0,0,0.38)",
      }}
    >
      <img
        src="/src/assets/images/canediseaseone.jpg"
        alt="Cane"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
    <div
      style={{
        position: "absolute",
        right: "20px",
        top: "20px",
        transform: "rotate(0.12rad)",
        width: "140px",
        height: "160px",
        backgroundColor: "#E8F5E9",
        borderRadius: "12px",
        border: "1.5px solid #66BB6A",
        boxShadow: "0 4px 8px rgba(0,0,0,0.26)",
        padding: "10px",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "22px",
          backgroundColor: "#388E3C",
          borderRadius: "6px",
          color: "#FFF",
          fontWeight: "bold",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        สแกนอ้อย
      </div>
      <div style={{ height: "8px" }} />
      <span style={{ fontSize: "11px", fontWeight: "bold" }}>
        ใบรายงานวิเคราะห์
      </span>
      <div style={{ height: "4px" }} />
      <span style={{ fontSize: "10px", color: "#616161" }}>ผลการตรวจ</span>
      <br />
      <span style={{ fontSize: "10px", color: "#616161" }}>
        ความเสี่ยงของโรค
      </span>
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "20px" }}>QR</span>
        <div style={{ width: "6px" }} />
        <span style={{ fontSize: "9px", fontStyle: "italic" }}>
          Scan SugarCane
        </span>
      </div>
    </div>
  </div>
);

export default Home;
