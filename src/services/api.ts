import type { ApiResponse, RateLimitInfo } from "../utils/types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

// ============ Auth Types ============
export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    phone: string;
    name: string;
  };
}

export interface UserInfo {
  id: number;
  phone: string;
  name: string;
}

export interface HistoryItem {
  id: number;
  disease_name: string;
  confidence: number;
  severity: string;
  description?: string;
  recommendation?: string;
  image_url?: string;
  created_at: string;
}

// ============ Helper Functions ============
const getAuthHeader = (): HeadersInit => {
  const token = localStorage.getItem("canescan_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ============ API Service ============
export const apiService = {
  // ========== Auth ==========
  async register(
    phone: string,
    name: string,
    password: string,
  ): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name, password }),
      });
      return await response.json();
    } catch {
      return { success: false, message: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้" };
    }
  },

  async login(phone: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });
      return await response.json();
    } catch {
      return { success: false, message: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้" };
    }
  },

  async getMe(): Promise<UserInfo | null> {
    try {
      const response = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeader(),
      });
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  },

  // ========== Prediction ==========
  async predictDisease(imageFile: File): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: getAuthHeader(),
        body: formData,
      });

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
      return {
        requests_used_minute: 0,
        requests_used_day: 0,
        max_per_minute: 5,
        max_per_day: 20,
        remaining_minute: 5,
        remaining_day: 20,
        next_available_in: 0,
        can_request: true,
      };
    }
  },

  async getHistory(): Promise<HistoryItem[]> {
    try {
      const response = await fetch(`${API_BASE}/history`, {
        headers: getAuthHeader(),
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching history:", error);
      return [];
    }
  },
};
