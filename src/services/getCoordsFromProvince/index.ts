const apiKey = "77b66e88815ead140b47301470f23127";
const geoUrl = "https://api.openweathermap.org/geo/1.0/direct";

export const getCoordsFromProvince = async (province: string) => {
  const url = `${geoUrl}?q=${encodeURIComponent(
    province
  )},TH&limit=1&appid=${apiKey}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to get coords");
    const data = await res.json();
    if (data.length > 0) {
      return { lat: data[0].lat, lon: data[0].lon };
    }
    return null;
  } catch (e) {
    console.error("Geocoding error:", e);
    return null;
  }
};
