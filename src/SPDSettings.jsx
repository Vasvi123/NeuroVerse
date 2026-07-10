import { useEffect, useState } from "react";
import "./SPDSettings.css";
import { useTheme } from "./context/ThemeContext";

const range = (name, label, min, max, step, settings, setSetting) => <div className="nv-settings-group">
  <label>{label}</label>
  <input type="range" min={min} max={max} step={step} value={settings[name]} onChange={(event) => setSetting(name, Number(event.target.value))} />
</div>;

export default function SPDSettings() {
  const { settings, setSetting } = useTheme();
  const [soundMuted, setSoundMuted] = useState(false);

  useEffect(() => {
    document.querySelectorAll("video, audio").forEach((media) => {
      media.muted = soundMuted;
    });
  }, [soundMuted]);

  return <div className="spd-container nv-settings-page">
    <div className="nv-settings-intro"><h2>🔧 Sensory Processing Disorder (SPD) Support</h2><p>Adjust the workspace to reduce sensory strain and support focus.</p></div>

    {range("brightness", "Brightness", 50, 150, 1, settings, setSetting)}
    {range("contrast", "Contrast", 50, 150, 1, settings, setSetting)}
    {range("fontSize", "Font Size", 85, 130, 1, settings, setSetting)}
    <div className="nv-settings-group"><label>Font Weight</label><select value={settings.fontWeight} onChange={(event) => setSetting("fontWeight", Number(event.target.value))}><option value="400">Regular</option><option value="500">Medium</option><option value="600">Semibold</option><option value="700">Bold</option></select></div>
    {range("fontSharpness", "Font Sharpness / Readability", 0.5, 2, 0.1, settings, setSetting)}
    {range("letterSpacing", "Letter Spacing", -0.02, 0.12, 0.01, settings, setSetting)}
    {range("lineHeight", "Line Height", 1.2, 2, 0.1, settings, setSetting)}
    <div className="nv-settings-group"><label>Color Theme</label><select value={settings.colorTheme} onChange={(event) => setSetting("colorTheme", event.target.value)}><option value="light">Light</option><option value="dark">Dark</option><option value="high-contrast">High Contrast</option></select></div>
    {range("saturation", "Saturation", 50, 150, 1, settings, setSetting)}
    <label className="nv-settings-toggle">Sound Muting<input type="checkbox" checked={soundMuted} onChange={() => setSoundMuted(!soundMuted)} /></label>
    <label className="nv-settings-toggle">Reduced Motion<input type="checkbox" checked={settings.reducedMotion} onChange={() => setSetting("reducedMotion", !settings.reducedMotion)} /></label>
  </div>;
}
