import { useHome } from "../hook/useHome";
import ImagePickerWidget from "../components/common/imagePicker";
import LocationWidget from "../components/common/location";
import { StackedImages } from "../components/common/stackImage";
import { ErrorSection } from "../components/common/error";
import { SubmitSection } from "../components/common/submit";

import styles from "../styles/Home.module.css";

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
