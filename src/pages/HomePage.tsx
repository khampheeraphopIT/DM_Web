import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Header,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  Footer,
} from "../components/landing";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartScan = () => navigate("/scan");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      <Header />
      <HeroSection onStartScan={handleStartScan} />
      <FeaturesSection />
      <HowItWorksSection onStartScan={handleStartScan} />
      <Footer />
    </div>
  );
};

export default HomePage;
