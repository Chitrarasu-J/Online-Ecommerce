import mongoose from "mongoose";
import dotenv from "dotenv";
import Template from "./models/Template.js";
import templates from "./data/templatesData.js";
import connectDB from "./config/db.js";

dotenv.config();

const seedTemplates = async () => {
  try {
    await connectDB();

    // Remove old templates
    await Template.deleteMany();

    // Insert new templates
    await Template.insertMany(templates);

    console.log("✅ Templates added successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding templates:", error);
    process.exit(1);
  }
};

seedTemplates();
