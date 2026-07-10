import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";

const features = [
  ["Visual Math", "Make numbers easier to see and understand.", "+"],
  ["Smart Flashcards", "Build recall with a pace that works for you.", "▤"],
  ["Emotion Journal", "Notice patterns and reflect with clarity.", "✦"],
  ["Focus Workspace", "A calmer place to plan your next step.", "◷"],
];

const Brand = ({ className = "nv-login-brand" }) => (
  <div className={className} aria-label="NeuroVerse"><span className="nv-login-brand-mark" aria-hidden="true">N</span><span>NeuroVerse</span></div>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for button disable
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset errors before new attempt

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setError("Sorry, your password was incorrect. Please double-check your password.");
      } else {
        setError(error.message); // Show other errors
      }
    } finally {
      setLoading(false); // Enable button after attempt
    }
  };

  return (
    <main className="nv-login-page">
      <section className="nv-login-intro" aria-labelledby="neuroverse-heading">
        <div className="nv-login-orb nv-login-orb-one" aria-hidden="true" /><div className="nv-login-orb nv-login-orb-two" aria-hidden="true" />
        <div className="nv-login-intro-content">
          <Brand />
          <div className="nv-login-intro-copy"><p className="nv-login-eyebrow">YOUR LEARNING SPACE</p><h1 id="neuroverse-heading">Welcome to NeuroVerse</h1><p>An accessibility-focused workspace designed to support neurodivergent learners.</p></div>
          <div className="nv-login-features" aria-label="NeuroVerse features">{features.map(([title, description, icon]) => <article className="nv-login-feature" key={title}><span className="nv-login-feature-icon" aria-hidden="true">{icon}</span><div><h2>{title}</h2><p>{description}</p></div></article>)}</div>
          <ul className="nv-login-trust" aria-label="NeuroVerse commitments"><li>Secure Firebase Authentication</li><li>Private by Design</li><li>Accessibility Focused</li></ul>
        </div>
      </section>
      <section className="nv-login-form-panel" aria-label="Sign in"><div className="nv-login-card">
        <Brand className="nv-login-mobile-brand" />
        <div className="nv-login-form-heading"><h2>Welcome Back</h2><p>Sign in to continue to your workspace.</p></div>
        <form onSubmit={handleLogin}>
          <label htmlFor="login-email">Email address</label>
          <input id="login-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="login-password">Password</label>
          <input id="login-password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="nv-login-error" role="alert">{error}</p>}
          <button className="nv-login-submit" type="submit" disabled={loading}>{loading ? "Logging in..." : "Sign In"}</button>
        </form>
        <p className="nv-login-signup">New to NeuroVerse? <Link to="/signup">Create Account</Link></p>
      </div></section>
    </main>
  );
};

export default Login;
