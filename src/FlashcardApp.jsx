import React, { useState, useEffect } from "react"; 
import { motion } from "framer-motion";
import { useSpeechSynthesis } from "react-speech-kit";
import Confetti from "react-confetti";
import "./FlashcardApp.css";
import {Link} from 'react-router-dom'
function FlashcardApp() {
  // State variables
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [index, setIndex] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(5); // in minutes
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionElapsed, setSessionElapsed] = useState(0); // elapsed seconds
  const [sessionFullyCompleted, setSessionFullyCompleted] = useState(false);
  const [autoNext, setAutoNext] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState("");
  const [quote, setQuote] = useState(""); // Holds the displayed motivational quote
  const { speak, voices } = useSpeechSynthesis();
  // Handle text upload
  const handleTextUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Generate meaningful flashcards by splitting text into paragraphs/chunks
  const generateFlashcards = () => {
    const paragraphs = text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const flashcardChunks = [];

    paragraphs.forEach((paragraph) => {
      if (paragraph.length > 300) {
        // For long paragraphs, split into chunks at sentence boundaries
        const sentences = paragraph.split(/(?<=\.\s)/);
        let chunk = "";
        sentences.forEach((sentence) => {
          if (chunk.length + sentence.length < 300) {
            chunk += sentence;
          } else {
            flashcardChunks.push(chunk.trim());
            chunk = sentence;
          }
        });
        if (chunk) {
          flashcardChunks.push(chunk.trim());
        }
      } else {
        flashcardChunks.push(paragraph);
      }
    });

    setFlashcards(flashcardChunks);
    setIndex(0);
  };

  // Fetch a random motivational quote from quotes.json
  const fetchMotivationalQuote = async () => {
    try {
      const response = await fetch("/quotes.json");
      const quotes = await response.json();
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex].quote);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setQuote("You're doing great! Keep pushing forward.");
    }
  };

  // Start session: enter fullscreen, reset timer, and clear previous session completion
  const startSession = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
    setSessionActive(true);
    setSessionElapsed(0);
    setSessionFullyCompleted(false); // Reset confetti and badge for new session
  };

  // End session: check if the user completed the full session before awarding badge & confetti
  const endSession = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setSessionActive(false);

    if (sessionElapsed >= sessionDuration * 60) {
      setSessionFullyCompleted(true); // Confetti appears only if session was fully completed
      awardBadge();
    }
  };

  // Award a badge only if the session was fully completed
  const awardBadge = () => {
    const badges = [
      "Focused Learner 🏅",
      "Session Master 🏆",
      "Flashcard Pro 🚀",
      "Champion of Focus 🎖️"
    ];
    const randomBadge = badges[Math.floor(Math.random() * badges.length)];
    setEarnedBadge(randomBadge);
  };

  // Manual flashcard navigation functions
  const goToNext = () => {
    setIndex((prev) => (prev + 1) % flashcards.length);
  };

  const goToPrev = () => {
    setIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  // Update session timer while session is active
  useEffect(() => {
    let intervalId;
    if (sessionActive) {
      const totalSeconds = sessionDuration * 60;
      intervalId = setInterval(() => {
        setSessionElapsed((prev) => {
          if (prev < totalSeconds) {
            return prev + 1;
          } else {
            clearInterval(intervalId);
            return prev;
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [sessionActive, sessionDuration]);

  return (
    <div className="container">
      {sessionFullyCompleted && <Confetti />} {/* Confetti appears only if session is fully completed */}

      {!sessionActive ? (
        // SETUP MODE: Upload text, set session duration, generate flashcards
        <div className="setup-container">
          <h1 className="title1">Neurodivergent Flashcards</h1>
          {sessionFullyCompleted && earnedBadge && (
            <p className="badge">🏅 You earned: {earnedBadge}</p>
          )}
          <div className="upload-container">
            <label htmlFor="fileUpload" className="custom-file-label">
              Choose File
            </label>
            <input
              type="file"
              id="fileUpload"
              accept=".txt"
              onChange={handleTextUpload}
              className="file-input"
            />
            <textarea
              className="text-input"
              rows="4"
              placeholder="Or paste text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="timer-container">
            <label htmlFor="session-duration">
              Set Session Duration (minutes):
            </label>
            <input
              type="number"
              id="session-duration"
              value={sessionDuration}
              min="1"
              onChange={(e) =>
                setSessionDuration(parseInt(e.target.value, 10))
              }
            />
          </div>
          <button className="btn generate-btn" onClick={generateFlashcards}>
            Generate Flashcards
          </button>
          {flashcards.length > 0 && (
            <button className="btn start-btn" onClick={startSession}>
              Start Session
            </button>
          )}
        </div>
      ) : (
        // SESSION MODE: Flashcard display with navigation, speech synthesis, motivational quotes, and session controls
        <div className="session-container">
          <div className="session-header">
            <h2>
              Flashcard Session ({sessionDuration} min)
            </h2>
            <button className="btn end-btn" onClick={endSession}>
              End Session
            </button>
          </div>
          <div className="session-progress-bar-container">
            <div
              className="session-progress-bar"
              style={{ width: `${(sessionElapsed / (sessionDuration * 60)) * 100}%` }}
            ></div>
          </div>
          <div className="flashcard-container">
            <progress
              className="progress-bar"
              value={((index + 1) / flashcards.length) * 100}
              max="100"
            />
            <div className="flashcard-box">
              <motion.p
                className="flashcard-text active"
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {flashcards[index]}
              </motion.p>
            </div>
            <div className="navigation-buttons">
              <button className="btn nav-btn" onClick={goToPrev} disabled={index === 0}>
                ⬅️ Previous
              </button>
              <button className="btn nav-btn" onClick={goToNext} disabled={index === flashcards.length - 1}>
                Next ➡️
              </button>
            </div>
            <div className="card-buttons">
              <button className="btn speech-btn" onClick={() => speak({ text: flashcards[index], voice: voices[0] })}>
                🔊 Read Aloud
              </button>
              <button className="btn motivation-btn" onClick={fetchMotivationalQuote}>
                You're doing great!
              </button>
            </div>
            {quote && <p className="motivational-quote">{quote}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashcardApp;