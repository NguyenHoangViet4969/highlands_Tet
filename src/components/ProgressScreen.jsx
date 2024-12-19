import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProgressScreen.css";

function ProgressScreen() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate("/start"), 1000); // Chuyển sang màn hình StartScreen
          return 100;
        }
        return prev + 10; // Tăng tiến trình mỗi 500ms
      });
    }, 500);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="screen progress-screen">
      <h1>Đang tải...</h1>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>{progress}%</p>
    </div>
  );
}

export default ProgressScreen;
