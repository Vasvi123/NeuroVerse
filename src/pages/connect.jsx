import React, { useState } from "react";
import "../styles.css"; // Ensure styles are imported

const Connect = () => {
  const [messageSent, setMessageSent] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState("");

  // Handle message submission
  const handleSubmit = () => {
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 3000); // Hide message after 3 seconds
  };

  // Handle adding a new discussion
  const handleAddDiscussion = () => {
    if (newDiscussion.trim() !== "") {
      setDiscussions([...discussions, newDiscussion]);
      setNewDiscussion(""); // Clear input after adding
    }
  
  };

  return (
    <div>
      <h2>Connect with Others</h2>

      {/* Contact Form */}
      <div className="contact-form">
        <h3>Get in Touch</h3>
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button onClick={handleSubmit}>Submit</button>
        {messageSent && <p className="success-message">Message Sent!</p>}
      </div>

      {/* Discussion Forum */}
      <div className="forum">
        <h3>Discussion Forum</h3>
        <ul>
          <li><a href="https://www.autismspeaks.org">Understanding Autism</a></li>
          <li><a href="https://www.chadd.org">Coping Strategies for ADHD</a></li>
          {discussions.map((discussion, index) => (
            <li key={index}>{discussion}</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Start a new discussion..."
          value={newDiscussion}
          onChange={(e) => setNewDiscussion(e.target.value)}
        />
        <button onClick={handleAddDiscussion}>Start Discussion</button>
      </div>

      {/* Link to Inspire Page */}
      <a href="/inspire">
        <button>Be Inspired</button>
      </a>
    </div>
  );
};

export default Connect;
