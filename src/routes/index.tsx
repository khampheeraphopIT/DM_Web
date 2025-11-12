import { Routes, Route } from "react-router-dom";
import Home from "../pages/index.tsx";
import NotFound from "../pages/notfound/index.tsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
