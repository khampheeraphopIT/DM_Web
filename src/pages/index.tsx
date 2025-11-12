import { useHome } from "../hook/useHome";
import ImagePickerWidget from "../components/common/imagePicker";
import LocationWidget from "../components/common/location";
import { StackedImages } from "../components/common/stackImage";
import { ErrorSection } from "../components/common/error";
import { SubmitSection } from "../components/common/submit";

import styles from "../styles/Home.module.css";
import { isInAppBrowser } from "../Browser";

const Home = () => {
  const hook = useHome();

  if (hook.isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        <div style={{ height: "20px" }} />
        <StackedImages />
        <div style={{ height: "30px" }} />
        <h1 className={styles.title}>สแกนตรวจโรคใบอ้อย</h1>
        <div style={{ height: "40px" }} />

        {isInAppBrowser() && !hook.currentProvince && (
          <div
            style={{
              background: "#fffbe6",
              padding: "16px",
              borderRadius: "12px",
              textAlign: "center",
              margin: "16px 0",
              border: "1px solid #ffe58f",
            }}
          >
            <p
              style={{ margin: "0 0 12px", fontSize: "15px", color: "#d46b08" }}
            >
              ใช้ตำแหน่งไม่ได้ในแอปนี้
            </p>
            <button
              onClick={() => {
                const url = window.location.origin + window.location.pathname;
                const ua = navigator.userAgent.toLowerCase();
                if (ua.includes("android")) {
                  window.location.href = `intent:${url}#Intent;scheme=https;package=com.android.chrome;end`;
                } else {
                  window.location.href = `googlechrome://${url.replace(
                    /^https?:\/\//,
                    ""
                  )}`;
                  setTimeout(() => (window.location.href = url), 1000);
                }
              }}
              style={{
                background: "#52c41a",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              เปิดใน Browser ของคุณ
            </button>
          </div>
        )}

        <div className={styles.card}>
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
        <SubmitSection
          result={hook.result}
          onSubmit={hook.submit}
          onRetry={hook.submit}
        />
        <div style={{ height: "20px" }} />
        <ErrorSection
          error={hook.generalError}
          onRetry={hook.getCurrentLocation}
        />
      </div>
    </div>
  );
};

export default Home;
