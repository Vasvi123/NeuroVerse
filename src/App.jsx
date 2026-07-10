import { useEffect, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Dyscalculia from "./Dyscalculia";
import SPDSettings from "./SPDSettings";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import FlashcardApp from "./FlashcardApp";
import MoodTracker from "./components/MoodTracker";
import Contact from "./Contact";
import AppShell from "./components/AppShell";
import Profile from "./components/Profile";
import { ThemeProvider } from "./context/ThemeContext";

function AuthenticatedLayout() {
  const [user, setUser] = useState(undefined);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  if (user === undefined) return null;
  if (!user) return <Navigate to="/" replace />;

  return <ThemeProvider>
    <AppShell>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/flashcardapp" element={<FlashcardApp />} />
        <Route path="/moodtracker" element={<MoodTracker />} />
        <Route path="/dyscalculia" element={<Dyscalculia />} />
        <Route path="/spd" element={<SPDSettings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AppShell>
  </ThemeProvider>;
}

function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="*" element={<AuthenticatedLayout />} />
  </Routes>;
}

export default function App() {
  return <Router><AppRoutes /></Router>;
}
