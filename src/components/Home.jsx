import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./../App.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="home-page full-screen">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <div className="logo"></div>
          <span className="brand-text">Neurodiverse</span>
        </div>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/dyscalculia">Dyscalculia Support</Link></li>
          <li><Link to="/spd">SPD Support</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <main className="hero full-screen">
        <h2>Welcome to Home Page</h2>
        <p>Supporting neurodiverse individuals with tailored tools.</p>
       
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 BrandName. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
