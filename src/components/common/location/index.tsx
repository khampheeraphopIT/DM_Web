import { LocationWidgetProps } from "../../../type/location";
import LocationSvg from "../../../../public/assets/svg/location";
import TemperatureSvg from "../../../../public/assets/svg/temperature";
import HumiditySvg from "../../../../public/assets/svg/้humidity";
import RainfallSvg from "../../../../public/assets/svg/rainfall";

const LocationWidget = (props: LocationWidgetProps) => {
  const { province, isLoading, errorText, temperature, humidity, rainfall } =
    props;

  return (
    <div
      style={{
        boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
        borderRadius: "20px",
        padding: "20px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "24px", color: "#4CAF50", marginTop: "2px" }}>
          <LocationSvg color="#2dba1e" />
        </span>
        <div style={{ width: "8px" }} />
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>
          ตำแหน่งปัจจุบัน
        </span>
      </div>

      <div style={{ height: "12px" }} />

      {isLoading ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              border: "2px solid #f3f3f3",
              borderTop: "2px solid #3498db",
              borderRadius: "50%",
              width: "16px",
              height: "16px",
              animation: "spin 1s linear infinite",
            }}
          />
          <div style={{ width: "8px" }} />
          <span>กำลังค้นหาตำแหน่ง...</span>
        </div>
      ) : province ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "18px", fontWeight: 500 }}>
            จังหวัด: {province}
          </span>
          <div style={{ height: "8px" }} />
          {temperature && humidity && rainfall ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "24px", color: "#F44336" }}>
                  <TemperatureSvg color="red" />
                </span>
                <div style={{ width: "8px" }} />
                <span style={{ fontSize: "16px" }}>
                  อุณหภูมิ: {temperature} °C
                </span>
              </div>
              <div style={{ height: "4px" }} />
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "24px", color: "#2196F3" }}>
                  <HumiditySvg color="#2196F3" />
                </span>
                <div style={{ width: "8px" }} />
                <span style={{ fontSize: "16px" }}>ความชื้น: {humidity} %</span>
              </div>
              <div style={{ height: "4px" }} />
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "24px", color: "#ccc" }}>
                  <RainfallSvg color="#2196F3" />
                </span>
                <div style={{ width: "8px" }} />
                <span style={{ fontSize: "16px" }}>
                  ปริมาณฝน: {rainfall} mm
                </span>
              </div>
            </div>
          ) : (
            <span style={{ color: "#999", fontSize: "14px" }}>
              กำลังดึงข้อมูลสภาพอากาศ...
            </span>
          )}
        </div>
      ) : (
        /* ไม่มีจังหวัด → แสดงข้อความชัดเจน */
        <span style={{ color: "#999", fontSize: "14px" }}>
          {errorText || "กรุณาเลือกจังหวัดด้านล่าง"}
        </span>
      )}

      {errorText && !province && !isLoading && (
        <div style={{ paddingTop: "8px" }}>
          <span style={{ color: "#FF0000", fontSize: "14px" }}>
            {errorText}
          </span>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LocationWidget;
