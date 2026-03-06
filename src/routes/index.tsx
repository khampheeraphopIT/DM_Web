import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ScanPage from "../pages/ScanPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HistoryPage from "../pages/HistoryPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/scan" element={<ScanPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  );
};
