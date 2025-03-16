import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line
} from "recharts";
import "./Dyscalculia.css";

const Dyscalculia = () => {
  const [number, setNumber] = useState("");
  const [interpretation, setInterpretation] = useState(null);
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

  const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const interpretNumber = () => {
    if (!number) return;
    const num = parseInt(number);

    setInterpretation({
      evenOdd: num % 2 === 0 ? "Even" : "Odd",
      primeComposite: isPrime(num) ? "Prime" : "Composite",
      divisibleBy5: num % 5 === 0 ? "Divisible by 5" : "Not Divisible by 5",
    });
  };

  const evaluateExpression = (expr) => {
    try {
      const result = new Function(`return (${expr})`)();
      return isNaN(result) ? "Invalid Input" : result;
    } catch {
      return "Invalid mathematical expression";
    }
  };

  const breakDownMath = () => {
    if (!mathInput) return;
    const result = evaluateExpression(mathInput);
    if (result === "Invalid mathematical expression" || result === "Invalid Input") {
      setMathSteps([{ step: "Error", description: "Invalid mathematical expression. Please try again." }]);
      return;
    }

    const steps = [
      { step: "Start", description: `Expression: ${mathInput}` },
      { step: "Calculation", description: `Result: ${result}` },
      { step: "End", description: "Final Answer Computed Successfully!" },
    ];
    setMathSteps(steps);
  };

  return (
    <div className="dyscalculia-page">
      <motion.h1 className="title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        🧠 Dyscalculia Support Tools
      </motion.h1>

      <motion.img
        src="/teacher.png"
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
        
        {interpretation && (
          <motion.div 
            className="interpretation-container" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <motion.div className="interpretation-box even-odd" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <h3>{interpretation.evenOdd}</h3>
            </motion.div>
            <motion.div className="interpretation-box prime-composite" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <h3>{interpretation.primeComposite}</h3>
            </motion.div>
            <motion.div className="interpretation-box divisible-by-5" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <h3>{interpretation.divisibleBy5}</h3>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }}>
        <h2>🔗 Step-by-Step Math Breakdown (Flowchart)</h2>
        <input type="text" value={mathInput} onChange={(e) => setMathInput(e.target.value)} placeholder="Enter a math expression" />
        <button onClick={breakDownMath}>Generate Flowchart</button>
        <div className="flowchart-container">
          {mathSteps.map((step, index) => (
            <motion.div 
              key={index} 
              className="flowchart-step" 
              initial={{ y: -20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              <span className="step-label">{step.step}</span>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
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






 