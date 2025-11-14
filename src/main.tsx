import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Conservacao from "./components/conservacao.tsx";
import ExplosaoPage from "./components/ExplosaoPage.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/conservacao" element={<Conservacao />} />
      <Route path="/viezzer" element={<ExplosaoPage />} />
    </Routes>
  </BrowserRouter>
);
