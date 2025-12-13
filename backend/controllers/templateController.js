import Template from "../models/Template.js";

// Admin Add Template
export const addTemplate = async (req, res) => {
  try {
    const { title, description, price, category, imageUrl, demoUrl, tags } = req.body;

    const newTemplate = await Template.create({
      title,
      description,
      price,
      category,
      imageUrl,
      demoUrl,
      tags,
    });

    res.status(201).json({
      message: "Template added successfully",
      template: newTemplate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Templates
export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();

    return res.status(200).json({
      success: true,
      count: templates.length,
      templates: templates,  // <-- this fixes frontend
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      templates: [],
      message: "Failed to fetch templates"
    });
  }
};



// Get Single Template
export const getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
