import type { ApiResponse } from "../types";

const API_BASE = "https://canescandm-be.onrender.com";

export const apiService = {
  async predictDisease(imageFile: File): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        body: formData,
      });

      // Always parse JSON - backend returns 200 with error info
      const data = await response.json();
      return data;
    } catch {
      return {
        success: false,
        error: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        error_type: "unknown",
        message: "กรุณาตรวจสอบการเชื่อมต่อ และลองใหม่อีกครั้ง",
      };
    }
  },

  async getDiseases(): Promise<unknown[]> {
    try {
      const response = await fetch(`${API_BASE}/diseases`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching diseases:", error);
      return [];
    }
  },
};
