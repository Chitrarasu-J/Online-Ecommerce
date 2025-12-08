import express from "express";
import { aiChat, aiSuggestTemplates } from "../controllers/aiController.js";

const router = express.Router();

// Chatbot route
router.post("/chat", aiChat);

// Template suggestion route
router.post("/suggest", aiSuggestTemplates);

export default router;
