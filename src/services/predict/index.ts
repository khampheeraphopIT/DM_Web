import { PredictionResult } from "../../type/predictionResults";
import { ApiConstants } from "../../constants";

export const predictDisease = async (
  province: string,
  imageFile: File
): Promise<PredictionResult> => {
  const formData = new FormData();
  formData.append("province", province);
  formData.append("file", imageFile);

  const res = await fetch(
    `${ApiConstants.baseUrl}/${ApiConstants.predictUrl}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (res.ok || res.status === 400) {
    return data as PredictionResult;
  } else {
    throw new Error(`Server Error: ${res.status}`);
  }
};
