/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiService } from "../services/api";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (
    phone: string,
    password: string,
  ) => Promise<{ success: boolean; message: string }>;
  register: (
    phone: string,
    name: string,
    password: string,
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}

interface User {
  id: number;
  phone: string;
  name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check stored auth on mount
    const initAuth = async () => {
      const token = localStorage.getItem("canescan_token");
      if (token) {
        const userData = await apiService.getMe();
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          // Token expired or invalid
          localStorage.removeItem("canescan_token");
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (
    phone: string,
    password: string,
  ): Promise<{ success: boolean; message: string }> => {
    const result = await apiService.login(phone, password);
    if (result.success && result.token && result.user) {
      localStorage.setItem("canescan_token", result.token);
      setUser(result.user);
      setIsAuthenticated(true);
      return { success: true, message: result.message };
    }
    return {
      success: false,
      message: result.message || "เข้าสู่ระบบไม่สำเร็จ",
    };
  };

  const register = async (
    phone: string,
    name: string,
    password: string,
  ): Promise<{ success: boolean; message: string }> => {
    const result = await apiService.register(phone, name, password);
    if (result.success && result.token && result.user) {
      localStorage.setItem("canescan_token", result.token);
      setUser(result.user);
      setIsAuthenticated(true);
      return { success: true, message: result.message };
    }
    return {
      success: false,
      message: result.message || "สมัครสมาชิกไม่สำเร็จ",
    };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("canescan_token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
