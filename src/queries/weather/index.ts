import { useQuery } from "@tanstack/react-query";
import { getWeatherAndProvince } from "../../services/weather";

/**
 * ใช้ React Query ดึงข้อมูลสภาพอากาศ + จังหวัดจาก lat/lon
 * @param lat ละติจูด
 * @param lon ลองจิจูด
 */
export const useWeatherAndProvince = (lat?: number, lon?: number) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => {
      if (lat == null || lon == null) throw new Error("Missing coordinates");
      return getWeatherAndProvince(lat, lon);
    },
    enabled: !!lat && !!lon,
  });
};
