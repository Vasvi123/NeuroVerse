import "./styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connect from "./pages/Connect";
import Inspire from "./pages/Inspire";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connect />} />
        <Route path="/inspire" element={<Inspire />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
