import React from "react";
import { useNavigate } from "react-router-dom";
import "./StartScreen.css";

function StartScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    // Chuyển hướng sang LuckyEnvelope
    navigate("/verification");
  };

  return (
    <div className="screen start-screen">
      <div className="logo-container">
        <img src="download-removebg-preview.png" alt="Highlands Coffee" className="logo" />
      </div>
      <h1 className="title">Chơi & Chill hè</h1>
      <button className="start-button" onClick={handleStart}>
        Bắt đầu
      </button>
    </div>
  );
}

export default StartScreen;
