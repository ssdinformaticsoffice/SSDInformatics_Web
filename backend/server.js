import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import settingRoutes from "./routes/settingRoutes.js"

// Pehle .env load karo
dotenv.config();

// Fir database connect karo
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Admin Routes
app.use("/api/admin", adminRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/stats",statsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/setting",settingRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("Admin Backend Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});