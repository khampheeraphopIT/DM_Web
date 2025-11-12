/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useRef } from "react";
import type { PredictionResult } from "../type/predictionResults";
import { useProvincesQuery } from "../queries/api";
import { useWeatherAndProvince } from "../queries/weather";
import { usePredictDiseaseMutation } from "../queries/predict";
import { usePreprocessImage } from "../queries/image"; // เพิ่ม

export const useHome = () => {
  // === React Query Hooks ===
  const { data: provinces } = useProvincesQuery();
  const predictMutation = usePredictDiseaseMutation();
  const preprocessMutation = usePreprocessImage();
  // === ใช้ weatherQuery กับ lat/lon จริง ===
  const [lat, setLat] = useState<number | undefined>();
  const [lon, setLon] = useState<number | undefined>();
  const {
    data: weatherData,
    isError: weatherError,
    isLoading: weatherLoading,
  } = useWeatherAndProvince(lat, lon);

  // === State ===
  const [imageFile, setImageFile] = useState<File | null>(null);
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

  useEffect(() => {
    if (weatherData) {
      setCurrentProvince(weatherData.province);
      setPreFetchedWeather({
        temp: weatherData.temperature ?? "-",
        hum: weatherData.humidity ?? "-",
        rain: weatherData.rainfall ?? "-",
      });
    }
  }, [weatherData]);

  useEffect(() => {
    if (weatherError) {
      setGeneralError("ไม่สามารถดึงข้อมูลสภาพอากาศได้");
    }
  }, [weatherError]);

  // === Functions ===
  const showError = (msg: string, showSettings = false) => {
    alert(msg);
    if (showSettings)
      alert("ไปที่การตั้งค่าเบราว์เซอร์ > ความเป็นส่วนตัว > ตำแหน่ง");
  };

  const getCurrentLocation = async () => {
    setIsGettingLocation(true);
    setIsLoading(true);
    setGeneralError(null);
    setLocationPermissionDenied(false);

    try {
      if (!navigator.geolocation) throw new Error("เบราว์เซอร์ไม่รองรับ");

      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0,
          });
        }
      );

      // ตั้งค่า lat/lon เพื่อให้ useWeatherAndProvince ทำงาน
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    } catch (error: any) {
      let msg = "";
      if (error.code === 1) {
        msg = "กรุณาอนุญาตตำแหน่งเพื่อใช้งานเว็บ";
        setLocationPermissionDenied(true);
        showError(msg, true);
      } else if (error.code === 2) msg = "ไม่สามารถดึงตำแหน่งได้ ลองอีกครั้ง";
      else if (error.code === 3)
        msg = "ดึงตำแหน่งช้าเกินไป\nกรุณาเปิด GPS และลองอีกครั้ง";
      else msg = `เกิดข้อผิดพลาด: ${error.message || error}`;

      showError(msg);
      setGeneralError(msg);
    } finally {
      setIsGettingLocation(false);
      setIsLoading(false);
    }
  };

  const pickImage = (file: File) => {
    setFileError(null);
    preprocessMutation.mutate(file, {
      onSuccess: (data) => {
        setImageFile(data.original);
        setResizedImageFile(data.resized);
        setResult(null);
      },
      onError: (error) => {
        setFileError((error as Error).message);
      },
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    _fromCamera: boolean
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();
    const allowed = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    if (!allowed.includes(ext || "")) {
      setFileError("รองรับเฉพาะไฟล์ภาพ: JPG, PNG, GIF, BMP, WEBP");
      return;
    }

    pickImage(file);
    e.target.value = "";
  };

  const onCameraPressed = () => cameraInputRef.current?.click();
  const onGalleryPressed = () => galleryInputRef.current?.click();

  const startProgress = () => {
    if (progressTimer.current) clearInterval(progressTimer.current);
    setUploadProgress(0);
    progressTimer.current = setInterval(() => {
      setUploadProgress((prev) =>
        prev < 0.9 ? Math.min(prev + 0.03, 0.9) : prev
      );
    }, 80);
  };

  const submit = async () => {
    setResult(null);
    setFileError(null);
    setGeneralError(null);
    setIsSubmitting(true);
    setUploadProgress(0);

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

    startProgress();

    predictMutation.mutate(
      { province: currentProvince, imageFile: resizedImageFile },
      {
        onSuccess: (data) => {
          setUploadProgress(1);
          setTimeout(() => {
            setResult(data);
            setUploadProgress(0);
          }, 500);
        },
        onError: (error) => {
          setGeneralError(`เกิดข้อผิดพลาด: ${(error as Error).message}`);
          setUploadProgress(0);
        },
        onSettled: () => {
          if (progressTimer.current) clearInterval(progressTimer.current);
          setIsSubmitting(false);
        },
      }
    );
  };

  return {
    // state
    imageFile,
    result,
    fileError,
    generalError,
    isLoading: isLoading || weatherLoading || isGettingLocation,
    uploadProgress,
    isSubmitting: isSubmitting || predictMutation.isPending,
    currentProvince,
    isGettingLocation,
    locationPermissionDenied,
    preFetchedWeather,
    provinces, // จาก useProvincesQuery

    // refs
    cameraInputRef,
    galleryInputRef,

    // actions
    handleFileChange,
    onCameraPressed,
    onGalleryPressed,
    submit,
    getCurrentLocation,

    // สำหรับ UI แสดง loading/error ของ weather
    weatherLoading,
    weatherError: !!weatherError,
  };
};
