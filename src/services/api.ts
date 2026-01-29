import type { ApiResponse, RateLimitInfo } from "../types";

const API_BASE = "https://canescandm-be.onrender.com/api";

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

  async getRateLimit(): Promise<RateLimitInfo> {
    try {
      const response = await fetch(`${API_BASE}/rate-limit`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching rate limit:", error);
      // Return default values if fetch fails
      return {
        requests_used_minute: 0,
        requests_used_day: 0,
        max_per_minute: 2,
        max_per_day: 50,
        remaining_minute: 2,
        remaining_day: 50,
        next_available_in: 0,
        can_request: true,
      };
    }
  },
};
