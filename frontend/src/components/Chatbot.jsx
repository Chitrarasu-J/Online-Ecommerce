// frontend/src/components/Chatbot.jsx
import React, { useEffect, useRef, useState } from "react";
import "./Chatbot.css";
import { sendAiMessage } from "../api/aiApi";

function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { id: 0, sender: "bot", text: "Hi! 👋 How can I help you find a template today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]); // store short conversation to send to backend
  const containerRef = useRef(null);
  const dragRef = useRef({ dragging: false, offsetX: 0, offsetY: 0 });

  // scroll to bottom when messages update
  const messagesEndRef = useRef(null);
  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, isLoading]);

  // --- DRAG HANDLERS ---
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMouseDown = (e) => {
      dragRef.current.dragging = true;
      const rect = el.getBoundingClientRect();
      dragRef.current.offsetX = e.clientX - rect.left;
      dragRef.current.offsetY = e.clientY - rect.top;
      el.style.transition = "none";
    };
    const onMouseMove = (e) => {
      if (!dragRef.current.dragging) return;
      const left = e.clientX - dragRef.current.offsetX;
      const top = e.clientY - dragRef.current.offsetY;
      // Limit to viewport
      const maxLeft = window.innerWidth - el.offsetWidth - 10;
      const maxTop = window.innerHeight - el.offsetHeight - 10;
      el.style.left = Math.min(Math.max(10, left), maxLeft) + "px";
      el.style.top = Math.min(Math.max(10, top), maxTop) + "px";
    };
    const onMouseUp = () => {
      dragRef.current.dragging = false;
      el.style.transition = ""; // restore transitions
    };

    // attach
    const header = el.querySelector(".chat-header");
    header.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      header.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // send message to backend + show typing animation
  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { id: Date.now(), sender: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setHistory((h) => [...h, { role: "user", content: trimmed }]);
    setInput("");
    setIsLoading(true);

    try {
      const data = await sendAiMessage(trimmed, history);
      const botText = data?.message || "Sorry, something went wrong.";
      // typing animation:
      await simulateTyping(botText);
      // add to persistent history
      setHistory((h) => [...h, { role: "assistant", content: botText }]);
    } catch (err) {
      setMessages((m) => [...m, { id: Date.now()+1, sender: "bot", text: "⚠️ AI server error. Try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // simulate typing: gradually add characters to a message bubble
  const simulateTyping = (fullText) => {
    return new Promise((resolve) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setMessages((m) => [...m, { id, sender: "bot", text: "" }]);
      let i = 0;
      const speed = 18; // ms per char
      const interval = setInterval(() => {
        i++;
        setMessages((m) => {
          return m.map((msg) => (msg.id === id ? { ...msg, text: fullText.slice(0, i) } : msg));
        });
        if (i >= fullText.length) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading) sendMessage();
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div className="chatbot-container" ref={containerRef} style={{ right: 24, bottom: 24 }}>
      <div className="chat-header">
        <div className="title">AI Assistant</div>
        <div className="actions">
          <button className="min-btn" onClick={() => {
            // minimize toggle
            const body = containerRef.current.querySelector(".chat-body");
            body.style.display = body.style.display === "none" ? "block" : "none";
          }}>_</button>
          <button className="close-btn" onClick={handleClose}>✕</button>
        </div>
      </div>

      <div className="chat-body">
        <div className="messages">
          {messages.map((m) => (
            <div key={m.id} className={`msg ${m.sender === "bot" ? "bot" : "user"}`}>
              <div className="bubble">{m.text}</div>
            </div>
          ))}
          {isLoading && (
            <div className="msg bot">
              <div className="bubble">
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <textarea
            rows={1}
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button className="send-btn" onClick={() => !isLoading && sendMessage()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
