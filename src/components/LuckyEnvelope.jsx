import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LuckyEnvelope.css";

const LuckyEnvelope = () => {
  const navigate = useNavigate();
  const [envelopes] = useState(
    Array.from({ length: 20 }).map(() => ({
      randomX: Math.random(),
      duration: `${3 + Math.random() * 2}s`,
      delay: `${Math.random() * 2}s`,
    }))
  );
  const [selectedEnvelope, setSelectedEnvelope] = useState(null);
  const [isOpened, setIsOpened] = useState(false);

  const handleEnvelopeClick = (index) => {
    setSelectedEnvelope(index); // Đánh dấu bao lì xì được chọn
    setTimeout(() => {
      setIsOpened(true); // Mở bao lì xì
      setTimeout(() => {
        navigate("/firework"); // Chuyển đến trang tiếp theo sau hiệu ứng
      }, 1000); // Thời gian mở bao
    }, 1000); // Thời gian bay và xoay
  };

  return (
    <div className="falling-envelopes-container">
      <div className="falling-envelopes">
        {envelopes.map((envelope, index) => (
          <div
            key={index}
            className={`envelope ${
              selectedEnvelope === index ? "clicked" : ""
            } ${isOpened && selectedEnvelope === index ? "opened" : ""}`}
            style={{
              "--random-x": envelope.randomX,
              "--random-duration": envelope.duration,
              "--random-delay": envelope.delay,
            }}
            onClick={() => handleEnvelopeClick(index)}
          >
            {isOpened && selectedEnvelope === index ? "Mã lì xì của bạn!" : "🧧"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LuckyEnvelope;
