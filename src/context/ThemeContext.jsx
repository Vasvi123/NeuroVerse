import { createContext, useContext, useEffect, useMemo, useState } from "react";
import "./ThemeContext.css";

const STORAGE_KEY = "neuroverse-accessibility-settings";
const defaults = {
  brightness: 100,
  contrast: 100,
  fontSize: 100,
  fontWeight: 400,
  fontSharpness: 1,
  letterSpacing: 0,
  lineHeight: 1.5,
  colorTheme: "light",
  reducedMotion: false,
  saturation: 100,
};

const ThemeContext = createContext(null);

function loadSettings() {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return defaults;
  }
}

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const value = useMemo(() => ({
    settings,
    setSetting: (name, settingValue) => setSettings((current) => ({ ...current, [name]: settingValue })),
  }), [settings]);

  const variables = {
    "--nv-a11y-brightness": `${settings.brightness}%`,
    "--nv-a11y-contrast": `${settings.contrast}%`,
    "--nv-a11y-font-size": `${settings.fontSize / 100}rem`,
    "--nv-a11y-font-weight": settings.fontWeight,
    "--nv-a11y-letter-spacing": `${settings.letterSpacing}em`,
    "--nv-a11y-line-height": settings.lineHeight,
    "--nv-a11y-saturation": `${settings.saturation}%`,
    "--nv-a11y-text-rendering": settings.fontSharpness >= 1 ? "geometricPrecision" : "optimizeLegibility",
  };

  return <ThemeContext.Provider value={value}>
    <div className="nv-theme-scope" data-color-theme={settings.colorTheme} data-reduced-motion={settings.reducedMotion} style={variables}>
      {children}
    </div>
  </ThemeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
