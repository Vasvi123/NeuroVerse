import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useTheme } from "../context/ThemeContext";
import "./AppShell.css";

const navItems = [
  ["Dashboard", "/home", "grid"],
  ["Focus Tools", "/spd", "spark"],
  ["Flashcards", "/flashcardapp", "cards"],
  ["Visual Math", "/dyscalculia", "math"],
  ["Journal", "/moodtracker", "book"],
  ["Profile", "/profile", "user"],
];

const pageTitles = {
  "/": "Welcome back",
  "/signup": "Create your account",
  "/home": "Dashboard",
  "/spd": "Focus tools",
  "/flashcardapp": "Flashcards",
  "/dyscalculia": "Visual math",
  "/moodtracker": "Journal",
  "/contact": "Contact us",
  "/profile": "Your profile",
};

function Icon({ name }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    spark: <path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z"/>,
    cards: <><rect x="5" y="3" width="15" height="16" rx="2"/><path d="M5 7H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-1"/></>,
    math: <><path d="M5 4h14M5 20h14M7 8l10 8M17 8 7 16"/></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22.5v-17Z"/><path d="M4 20a2.5 2.5 0 0 1 2.5-2.5H20"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    moon: <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"/>,
    chevron: <path d="m9 18 6-6-6-6"/>,
  };
  return <svg className="nv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function AppShell({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const { settings, setSetting } = useTheme();

  useEffect(() => onAuthStateChanged(auth, setUser), []);
  useEffect(() => setDrawerOpen(false), [location.pathname]);

  const logout = async () => {
    await signOut(auth);
    setProfileOpen(false);
    navigate("/");
  };
  const initials = user?.email?.slice(0, 1).toUpperCase() || "N";

  return <div className="nv-shell">
    <aside className={`nv-sidebar ${drawerOpen ? "is-open" : ""}`} aria-label="Primary navigation">
      <div className="nv-brand"><div className="nv-brand-mark">N</div><span>NeuroVerse</span></div>
      <nav className="nv-nav">
        <p className="nv-nav-label">Workspace</p>
        {navItems.map(([label, to, icon]) => <NavLink key={`${label}-${to}`} to={to} className={({ isActive }) => `nv-nav-link ${isActive ? "is-active" : ""}`}>
          <Icon name={icon}/><span>{label}</span>
        </NavLink>)}
      </nav>
      <div className="nv-sidebar-footer"><span className="nv-support-dot"/>Your space, your pace</div>
    </aside>
    {drawerOpen && <button className="nv-scrim" onClick={() => setDrawerOpen(false)} aria-label="Close navigation menu" />}
    <div className="nv-page">
      <header className="nv-topbar">
        <button className="nv-menu-button" onClick={() => setDrawerOpen(true)} aria-label="Open navigation menu"><Icon name="menu"/></button>
        <div><p className="nv-eyebrow">NEUROVERSE WORKSPACE</p><h1 className="nv-page-title">{pageTitles[location.pathname] || "NeuroVerse"}</h1></div>
        <div className="nv-topbar-actions">
          <button className="nv-icon-button" onClick={() => setSetting("colorTheme", settings.colorTheme === "dark" ? "light" : "dark")} aria-label={settings.colorTheme === "dark" ? "Use light theme" : "Use dark theme"}><Icon name={settings.colorTheme === "dark" ? "sun" : "moon"}/></button>
          <div className="nv-profile-wrap">
            <button className="nv-avatar" onClick={() => setProfileOpen(!profileOpen)} aria-expanded={profileOpen} aria-label="Open user menu">{initials}</button>
            {profileOpen && <div className="nv-profile-menu"><p>{user?.email || "Guest workspace"}</p><button onClick={() => { setProfileOpen(false); navigate("/profile"); }}>View profile</button>{user && <button onClick={logout}>Sign out</button>}</div>}
          </div>
        </div>
      </header>
      <main className="nv-main">{children}</main>
    </div>
  </div>;
}

export { Icon };
