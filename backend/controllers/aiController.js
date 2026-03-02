import Template from "../models/Template.js";

// local AI: when user sends a template name, lookup and return details
export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    console.log("AI Chat request:", message);
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // search templates by name (case-insensitive)
    const tpl = await Template.findOne({
      title: { $regex: message, $options: "i" },
    });

    console.log("Template found:", tpl);

    if (!tpl) {
      return res.json({ 
        message: `Sorry, I couldn't find a template named "${message}". Try another name.` 
      });
    }

    // format reply with template details
    const reply = `📌 Template: ${tpl.title}\n💰 Price: ₹${tpl.price}\n🖼️ Image: ${tpl.imageUrl}`;
    return res.json({ message: reply });
  } catch (err) {
    console.error("AI lookup error:", err.message, err.stack);
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};
