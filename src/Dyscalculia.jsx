import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line
} from "recharts";
import "./Dyscalculia.css";

const Dyscalculia = () => {
  const [number, setNumber] = useState("");
  const [interpretation, setInterpretation] = useState("");
  const [mathInput, setMathInput] = useState("");
  const [mathSteps, setMathSteps] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    generateChartData();
  }, []);

  const generateChartData = () => {
    const data = Array.from({ length: 10 }, (_, i) => ({
      name: `Item ${i + 1}`,
      value: Math.floor(Math.random() * 100),
    }));
    setChartData(data);
  };

  const interpretNumber = () => {
    if (!number) return;
    const num = parseFloat(number);
    let explanation = `The number ${num} is `;
    explanation += num % 2 === 0 ? "even" : "odd";
    explanation += num > 10 ? ", relatively large." : ", quite small.";
    setInterpretation(explanation);
  };

  const breakDownMath = () => {
    if (!mathInput) return;
    try {
      const steps = [`Expression: ${mathInput}`, `Result: ${eval(mathInput)}`];
      setMathSteps(steps);
    } catch (error) {
      setMathSteps(["Invalid mathematical expression"]);
    }
  };

  return (
    <div className="dyscalculia-page">
      <motion.h1 className="title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        🧠 Dyscalculia Support Tools
      </motion.h1>

      <motion.img
        src="./teacher.png"
        alt="Teacher explaining numbers"
        className="teaching-image"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      <motion.div whileHover={{ scale: 1.05 }}>
        <h2>📊 Number Interpretation</h2>
        <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Enter a number" />
        <button onClick={interpretNumber}>Interpret</button>
        {interpretation && <motion.p className="result" animate={{ opacity: 1 }}>{interpretation}</motion.p>}
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }}>
        <h2>➗ Step-by-Step Math Breakdown</h2>
        <input type="text" value={mathInput} onChange={(e) => setMathInput(e.target.value)} placeholder="Enter a math expression" />
        <button onClick={breakDownMath}>Break Down</button>
        <ul>
          {mathSteps.map((step, index) => (
            <motion.li key={index} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, delay: index * 0.2 }}>
              {step}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }}>
        <h2>📈 Graphical Visualizations</h2>
        <ResponsiveContainer width="90%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="90%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#FF8042" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Dyscalculia;

 