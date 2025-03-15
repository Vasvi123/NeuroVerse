import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dyscalculia from "./Dyscalculia";
import SPDSettings from "./SPDSettings";
import "./App.css";

const App = () => {
  return (
    <Router>
        <nav>
          <Link to="/">Dyscalculia Support</Link>
          <Link to="/spd">SPD Support</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Dyscalculia />} />
          <Route path="/spd" element={<SPDSettings />} />
        </Routes>
     
    </Router>
  );
};

export default App;
