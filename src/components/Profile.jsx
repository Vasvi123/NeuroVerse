import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Icon } from "./AppShell";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => onAuthStateChanged(auth, setUser), []);
  return <section className="nv-profile-page"><div className="nv-profile-card"><div className="nv-profile-large-avatar">{user?.email?.[0]?.toUpperCase() || "N"}</div><div><p className="nv-kicker">YOUR NEUROVERSE SPACE</p><h2>{user ? "Your profile" : "Guest profile"}</h2><p>{user?.email || "Sign in to personalise your NeuroVerse workspace."}</p></div></div><div className="nv-info-card"><h3><Icon name="spark"/> Your workspace</h3><p>Your support tools, preferences, and progress stay organised here. Profile editing can be added when a profile data store is introduced.</p></div></section>;
}
