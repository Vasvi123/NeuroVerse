import { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
// JSX namespace usage is not detected by this ESLint configuration.
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "../styles.css";

Chart.register(...registerables);

const emotions = [
  { name: "Happy", emoji: "Happy", color: "#f5bb28" },
  { name: "Sad", emoji: "Sad", color: "#3498db" },
  { name: "Angry", emoji: "Angry", color: "#e76a62" },
  { name: "Anxious", emoji: "Anxious", color: "#8e6cc8" },
  { name: "Excited", emoji: "Excited", color: "#e78b55" },
  { name: "Calm", emoji: "Calm", color: "#39a987" },
];
const DRAFT_KEY = "neuroverse-journal-draft";
const HISTORY_KEY = "neuroverse-journal-history";

export default function MoodTracker() {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#eeecff");
  const [moodFrequency, setMoodFrequency] = useState({});
  const [draft, setDraft] = useState(() => localStorage.getItem(DRAFT_KEY) || "");
  const [history, setHistory] = useState(() => { try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch { return []; } });

  useEffect(() => { localStorage.setItem(DRAFT_KEY, draft); }, [draft]);
  useEffect(() => { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); }, [history]);

  const addMood = () => {
    if (!selectedEmotion) return;
    setMoodFrequency((prev) => ({ ...prev, [selectedEmotion]: (prev[selectedEmotion] || 0) + 1 }));
    setHistory((prev) => [{ id: Date.now(), emotion: selectedEmotion, color: selectedColor, text: draft.trim() || "Mood check-in saved.", date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) }, ...prev].slice(0, 12));
    setDraft("");
  };
  const clearGraphData = () => setMoodFrequency({});
  const chartData = useMemo(() => ({ labels: Object.keys(moodFrequency), datasets: [{ label: "Mood check-ins", data: Object.values(moodFrequency), backgroundColor: Object.keys(moodFrequency).map((name) => emotions.find((emotion) => emotion.name === name)?.color || "#625bda"), borderRadius: 8, borderWidth: 0 }] }), [moodFrequency]);

  return <div className="mood-tracker-container nv-journal-page" style={{ "--journal-color": selectedColor }}>
    <header className="nv-journal-hero"><p className="nv-kicker">ALEXITHYMIA JOURNAL</p><h2>Make space for what you are feeling.</h2><p>Name your emotion, write without pressure, and notice your patterns over time.</p></header>
    <section className="nv-journal-composer">
      <div className="nv-journal-section-head"><div><h3>How are you feeling?</h3><p>Choose the closest match. There is no wrong answer.</p></div>{selectedEmotion && <span className="nv-selected-mood" style={{ backgroundColor: selectedColor }}>{selectedEmotion}</span>}</div>
      <div className="emotion-wheel" role="list" aria-label="Emotion selector">{emotions.map((emotion) => <button key={emotion.name} className={`emotion-button ${selectedEmotion === emotion.name ? "is-selected" : ""}`} style={{ "--emotion-color": emotion.color }} onClick={() => { setSelectedEmotion(emotion.name); setSelectedColor(emotion.color); }} aria-pressed={selectedEmotion === emotion.name} role="listitem"><span aria-hidden="true">{emotion.emoji.slice(0, 1)}</span><strong>{emotion.name}</strong></button>)}</div>
      <label className="nv-field-label" htmlFor="journal-draft">A few words for today</label>
      <textarea id="journal-draft" className="journal-editor" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="What is happening in your body, thoughts, or day? This draft saves automatically on this device." />
      <div className="nv-journal-actions"><span className="nv-save-status">Draft saved automatically</span><button className="track-button" onClick={addMood} disabled={!selectedEmotion}>Save check-in</button></div>
    </section>
    <section className="nv-journal-insights">
      <div className="mood-tracker nv-journal-card"><div className="nv-journal-section-head"><div><h3>Mood timeline</h3><p>Your check-ins collected in this session.</p></div><button onClick={clearGraphData} className="clear-button">Clear timeline</button></div><div className="chart-container">{Object.keys(moodFrequency).length ? <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } }} /> : <div className="nv-empty-state"><span aria-hidden="true">+</span><p>Save a mood check-in to begin your timeline.</p></div>}</div></div>
      <div className="nv-journal-history"><div className="nv-journal-section-head"><div><h3>Journal history</h3><p>Your recent private reflections.</p></div></div>{history.length ? <div className="journal-history-grid">{history.map((entry) => <motion.article key={entry.id} className="journal-entry-card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><span className="journal-entry-emotion" style={{ backgroundColor: entry.color }}>{entry.emotion}</span><time>{entry.date}</time><p>{entry.text}</p></motion.article>)}</div> : <div className="nv-empty-state"><span aria-hidden="true">~</span><p>Saved reflections will appear here.</p></div>}</div>
    </section>
  </div>;
}

