import React, { useState } from "react";
import "./Chatbot.css";
import { sendMessageToAI } from "../api/aiApi";

function Chatbot({ onClose }) {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState(null);

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you choose a template?" }
  ]);
  const [input, setInput] = useState("");

  // DRAGGING LOGIC
  const startDrag = (e) => {
    setDragging(true);
    setRel({ x: e.pageX - position.x, y: e.pageY - position.y });
  };

  const onDrag = (e) => {
    if (dragging) {
      setPosition({ x: e.pageX - rel.x, y: e.pageY - rel.y });
    }
  };

  const stopDrag = () => setDragging(false);

  // SEND MESSAGE TO AI BACKEND
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const userText = input;
    setInput("");

    try {
      const res = await sendMessageToAI(userText);

      const aiMessage = { sender: "bot", text: res.reply };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry! The AI is not responding." }
      ]);
    }
  };

  return (
    <div
      className="chatbot-window"
      style={{ top: position.y, left: position.x }}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
    >
      <div className="chat-header" onMouseDown={startDrag}>
        <span>AI Assistant</span>
        <button onClick={onClose}>✖</button>
      </div>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
