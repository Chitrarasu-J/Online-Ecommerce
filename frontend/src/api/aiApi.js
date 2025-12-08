import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/ai",
});

export const sendMessageToAI = async (message) => {
  const res = await API.post("/chat", { message });
  return res.data;
};

