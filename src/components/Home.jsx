import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Icon } from "./AppShell";

const tools = [
  ["Focus tools", "Tune brightness, contrast and motion for a calmer workspace.", "/spd", "spark"],
  ["Flashcards", "Turn your notes into a focused, supported study session.", "/flashcardapp", "cards"],
  ["Visual math", "Explore number patterns and mathematical ideas visually.", "/dyscalculia", "math"],
  ["Mood journal", "Name and reflect on how you are feeling today.", "/moodtracker", "book"],
];

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else navigate("/");
    });
    return unsubscribe;
  }, [navigate]);

  return <div className="nv-dashboard">
    <section className="nv-welcome-card"><div><p className="nv-kicker">YOUR PERSONAL WORKSPACE</p><h2>Make room for the way <em>you</em> think.</h2><p>NeuroVerse brings your tools together in one calm, flexible space{user?.email ? `, ${user.email.split("@")[0]}` : ""}.</p></div><div className="nv-welcome-orbit" aria-hidden="true"><span>✦</span><span>●</span><span>✧</span></div></section>
    <div className="nv-section-heading"><div><p className="nv-kicker">START WHERE YOU NEED TO</p><h2>Your support tools</h2></div><Link to="/contact">Need help?</Link></div>
    <section className="nv-tool-grid">{tools.map(([title, text, to, icon]) => <Link key={title} to={to} className="nv-tool-card"><span className="nv-card-icon"><Icon name={icon}/></span><h3>{title}</h3><p>{text}</p><span className="nv-card-link">Open tool <Icon name="chevron"/></span></Link>)}</section>
    <section className="nv-dashboard-bottom"><div className="nv-quiet-card"><p className="nv-kicker">TODAY'S REMINDER</p><p>Progress does not have to be loud to count.</p></div></section>
  </div>;
}
