import React, { useState, useEffect } from "react";
import "./SPDSettings.css";

const SPDSettings = () => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [fontSharpness, setFontSharpness] = useState(1);
  const [theme, setTheme] = useState("default");
  const [soundMuted, setSoundMuted] = useState(false);
  const [gentleTransitions, setGentleTransitions] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(1);

  useEffect(() => {
    document.documentElement.style.setProperty("--brightness", `${brightness}%`);
    document.documentElement.style.setProperty("--contrast", `${contrast}%`);
    document.documentElement.style.setProperty("--font-sharpness", fontSharpness);

    document.body.style.transition = gentleTransitions ? "all 0.5s ease-in-out" : "none";
  }, [brightness, contrast, fontSharpness, gentleTransitions]);

  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "#ffffff";
    } else if (theme === "sepia") {
      document.body.style.backgroundColor = "#f4e4c1";
      document.body.style.color = "#5b4636";
    } else {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#333";
    }
  }, [theme]);

  useEffect(() => {
    if (soundMuted) {
      document.querySelectorAll("video, audio").forEach((media) => {
        media.muted = true;
      });
    }
  }, [soundMuted]);

  return (
    <div className="spd-container">
      <h2>🔧 Sensory Processing Disorder (SPD) Support</h2>

      <label>Brightness</label>
      <input type="range" min="50" max="150" value={brightness} onChange={(e) => setBrightness(e.target.value)} />

      <label>Contrast</label>
      <input type="range" min="50" max="150" value={contrast} onChange={(e) => setContrast(e.target.value)} />

      <label>Font Sharpness</label>
      <input type="range" min="0.5" max="2" step="0.1" value={fontSharpness} onChange={(e) => setFontSharpness(e.target.value)} />

      <label>Theme</label>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="default">Default</option>
        <option value="dark">Dark Mode</option>
        <option value="sepia">Sepia</option>
      </select>

      <label>Sound Muting</label>
      <input type="checkbox" checked={soundMuted} onChange={() => setSoundMuted(!soundMuted)} />

      <label>Gentle Transitions</label>
      <input type="checkbox" checked={gentleTransitions} onChange={() => setGentleTransitions(!gentleTransitions)} />

      <label>Haptic Feedback</label>
      <input type="range" min="0" max="2" step="0.1" value={hapticFeedback} onChange={(e) => setHapticFeedback(e.target.value)} />
    </div>
  );
};

export default SPDSettings;