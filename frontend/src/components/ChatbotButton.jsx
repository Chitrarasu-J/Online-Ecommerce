// frontend/src/components/ChatbotButton.jsx
import React from "react";
import "./ChatbotButton.css";

export default function ChatbotButton({ onClick }) {
  return (
    <button className="chatbot-fab" onClick={onClick} title="Open AI Assistant">
      🤖
    </button>
  );
}
