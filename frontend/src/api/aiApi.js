// frontend/src/api/aiApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if your backend runs on different host/port
  timeout: 20000,
});

export const sendAiMessage = async (message, history = []) => {
  try {
    const res = await API.post("/ai/chat", { message, history });
    return res.data; // { message: "assistant reply" }
  } catch (err) {
    console.error("AI API error:", err);
    throw err;
  }
};
