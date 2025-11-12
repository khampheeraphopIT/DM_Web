import { ApiConstants } from "../../constants";

export const getProvinces = async (): Promise<string[]> => {
  const res = await fetch(
    `${ApiConstants.baseUrl}/${ApiConstants.provincesUrl}`
  );
  if (!res.ok) throw new Error("Failed to load provinces");
  return res.json();
};
