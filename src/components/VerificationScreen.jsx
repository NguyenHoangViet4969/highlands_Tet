import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VerificationScreen.css";

function VerificationScreen() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    if (!code.trim()) {
      setError("Vui lòng nhập mã trước khi xác nhận.");
      return;
    }
    // Chuyển sang màn hình LuckyEnvelope
    navigate("/lucky-envelope");
  };

  const handleInputChange = (e) => {
    setCode(e.target.value);
    setError(""); // Xóa lỗi khi người dùng nhập mã
  };

  return (
    <div className="screen verification-screen">
      <div className="logo-container">
        <img
          src="/download-removebg-preview.png"
          alt="Highlands Coffee"
          className="logo"
        />
      </div>
      <div className="content">
        <p className="description">
          Vui lòng nhập mã dự thưởng trên hóa đơn để tham gia trò chơi bạn nhé.
        </p>
        <input
          type="text"
          placeholder="Nhập mã tại đây"
          className={`input-field ${error ? "input-error" : ""}`}
          value={code}
          onChange={handleInputChange}
        />
        {error && <p className="error-message">{error}</p>}
        <button className="verify-button" onClick={handleVerify}>
          Xác Nhận
        </button>
      </div>
    </div>
  );
}

export default VerificationScreen;
