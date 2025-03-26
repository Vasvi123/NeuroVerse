import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dyscalculia from "./Dyscalculia";
import SPDSettings from "./SPDSettings";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home"; 
import FlashcardApp from "./FlashcardApp";
import ChatCompanion from "./components/ChatCompanion";
import MoodTracker from "./components/MoodTracker";
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
      <Route path="/flashcardapp" element={<FlashcardApp/>} />
      <Route path="/chatcompanion" element={<ChatCompanion/>} />
      <Route path="/moodtracker" element={<MoodTracker/>} />
    </Routes>
     
    </Router>
  );
};

export default App;
