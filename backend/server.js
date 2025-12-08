import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";


import connectDB from "./config/db.js";
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/ai", aiRoutes);
app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
