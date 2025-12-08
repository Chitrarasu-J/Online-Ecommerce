import React from "react";
import "./ChatbotButton.css";

function ChatbotButton({ onClick }) {
  return (
    <div className="chatbot-btn" onClick={onClick}>
      🤖
    </div>
  );
}

export default ChatbotButton;
