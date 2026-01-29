import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Header,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  Footer,
} from "../components/landing";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleStartScan = () => navigate("/scan");
  const handleLogin = () => navigate("/login");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={logout}
        onLogin={handleLogin}
      />
      <HeroSection onStartScan={handleStartScan} />
      <FeaturesSection />
      <HowItWorksSection onStartScan={handleStartScan} />
      <Footer />
    </div>
  );
};

export default HomePage;
