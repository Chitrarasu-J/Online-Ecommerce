import axios from "axios";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await axios.post(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    model: "mixtral-8x7b-32768",
    messages: [
      { role: "system", content: "You are a helpful AI assistant." },
      { role: "user", content: message }
    ]
  },
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`
    }
  }
);


    const aiReply = response.data.choices[0].message.content;

    return res.json({ reply: aiReply });
  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error);
    return res.status(500).json({
      message: "AI server error",
      details: error.response?.data || error.message,
    });
  }
};
