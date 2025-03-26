import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "../styles.css";

Chart.register(...registerables);

const MoodTracker = ({ selectedEmotion }) => {
  const [moodFrequency, setMoodFrequency] = useState({});

  // Function to add selected mood to the frequency count
  const addMood = () => {
    if (selectedEmotion) {
      setMoodFrequency((prev) => ({
        ...prev,
        [selectedEmotion]: (prev[selectedEmotion] || 0) + 1,
      }));
    }
  };

  // Function to reset graph data
  const clearGraphData = () => {
    setMoodFrequency({});
  };

  // Soft pastel colors for the bars
  const pastelColors = [
    "rgba(255, 179, 186, 0.6)", // Light Pink
    "rgba(255, 223, 186, 0.6)", // Peach
    "rgba(255, 255, 186, 0.6)", // Soft Yellow
    "rgba(186, 255, 201, 0.6)", // Light Green
    "rgba(186, 225, 255, 0.6)", // Light Blue
    "rgba(220, 198, 255, 0.6)", // Lavender
  ];

  // Graph Data
  const data = {
    labels: Object.keys(moodFrequency),
    datasets: [
      {
        label: "Mood Frequency",
        data: Object.values(moodFrequency),
        backgroundColor: pastelColors.slice(0, Object.keys(moodFrequency).length),
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mood-tracker">
      <h2>Mood Tracker</h2>
      <button onClick={addMood} className="track-button">Save Mood</button>
      <button onClick={clearGraphData} className="clear-button">Clear Graph Data</button>

      <div className="chart-container">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default MoodTracker;
