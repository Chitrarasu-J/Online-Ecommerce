import express from "express";
import { addTemplate, getTemplates, getTemplateById } from "../controllers/templateController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin add template
router.post("/", protect, admin, addTemplate);

// Get all templates
router.get("/", getTemplates);

// Get template by ID
router.get("/:id", getTemplateById);

export default router;
