import React from "react";
import { Routes, Route } from "react-router-dom";
import LuckyEnvelope from "./components/LuckyEnvelope";
import Firework from "./components/Firework";
import StartScreen from "./components/StartScreen";
import ProgressScreen from "./components/ProgressScreen";
import VerificationScreen from "./components/VerificationScreen";
function App() {
  return (
      <Routes>
        <Route path="/" element={<ProgressScreen />} />
        <Route path="/start" element={<StartScreen />} />
        <Route path="/verification" element={<VerificationScreen />} />
        <Route path="/lucky-envelope" element={<LuckyEnvelope />} />
        <Route path="/firework" element={<Firework />} />
      </Routes>
  );
}

export default App;
