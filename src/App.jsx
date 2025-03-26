import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dyscalculia from "./Dyscalculia";
import SPDSettings from "./SPDSettings";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home"; 

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/dyscalculia" element={<Dyscalculia />} />
          <Route path="/spd" element={<SPDSettings />} />
        </Routes>
        <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>
     
    </Router>
  );
};

export default App;
