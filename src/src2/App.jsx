import React, { useState } from "react";
import EmotionWheel from "./components/EmotionWheel";
import MoodTracker from "./components/MoodTracker";
import ChatCompanion from "./components/ChatCompanion";
import "./styles.css";

const App = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  return (
    <div className="app-container">
      <h1>Emotional Awareness</h1>
      <EmotionWheel onSelectEmotion={setSelectedEmotion} />
      <MoodTracker selectedEmotion={selectedEmotion} />
      <ChatCompanion /> {/* Chatbot stays in place */}
    </div>
  );
};

export default App;
