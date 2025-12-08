import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";
import Template from "../models/Template.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/*
=========================================================
  1️⃣ CHATBOT — GENERAL AI CHAT  ( /api/ai/chat )
=========================================================
*/

export const aiChat = async (req, res) => {
  try {
    const { message } = req.body;

    // Protect against empty messages
    if (!message || message.trim() === "") {
      return res.json({ reply: "Please enter a message." });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI assistant helping users understand website templates and development services." },
        { role: "user", content: message }
      ],
    });

    const reply = completion.choices[0].message.content;

    return res.json({ reply });

  } catch (error) {
    console.error("AI Chat Error:", error.message);
    return res.status(500).json({ reply: "AI is currently unavailable. Try again later!" });
  }
};


/*
===================================================================
  2️⃣ TEMPLATE RECOMMENDATION — SUGGEST BEST TEMPLATES ( /api/ai/suggest )
===================================================================
*/

export const aiSuggestTemplates = async (req, res) => {
  try {
    const { message } = req.body;

    // Fetch all templates from DB
    const templates = await Template.find({});

    if (!templates || templates.length === 0) {
      return res.json({ reply: "No templates found in the database." });
    }

    const templateList = templates
      .map((t) => `Title: ${t.title}, Category: ${t.category}, Price: ${t.price}`)
      .join("\n");

    const prompt = `
User Need: ${message}

Available Templates:
${templateList}

Recommend the 2 BEST templates by title only.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI helping users select website templates." },
        { role: "user", content: prompt }
      ],
    });

    const aiResponse = completion.choices[0].message.content;

    return res.json({ reply: aiResponse });

  } catch (error) {
    console.error("AI Suggest Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
