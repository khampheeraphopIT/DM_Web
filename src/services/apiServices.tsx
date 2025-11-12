import { ApiConstants } from "../constants";
import type { PredictionResult } from "../type/predictionResults";

export class ApiService {
  async getProvinces(): Promise<string[]> {
    const response = await fetch(
      `${ApiConstants.baseUrl}/${ApiConstants.provincesUrl}`
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to load provinces");
    }
  }

  async predictDisease(
    province: string,
    imageFile: File
  ): Promise<PredictionResult> {
    const formData = new FormData();
    formData.append("province", province);
    formData.append("file", imageFile);

    const response = await fetch(
      `${ApiConstants.baseUrl}/${ApiConstants.predictUrl}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok || response.status === 400) {
      return data as PredictionResult;
    } else {
      throw new Error(`Server Error: ${response.status}`);
    }
  }
}
