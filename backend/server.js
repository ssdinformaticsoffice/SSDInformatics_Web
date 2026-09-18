import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import settingRoutes from "./routes/settingRoutes.js"
import notificationRoutes from "./routes/notificationRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import careerApplicationRoutes from "./routes/careerApplicationRoutes.js";

import teamRoutes from "./routes/teamRoutes.js";



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
app.use("/api/stats", statsRoutes);

// Career Routes
app.use("/api/careers", careerRoutes);

// team Routes
app.use("/api/team", teamRoutes);

// Career Application Routes
app.use("/api/career-applications", careerApplicationRoutes);

// Contact Routes (supports both /api/contact and /api/contacts)
app.use("/api/contact", contactRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/applications", applicationRoutes);

// Setting Routes (supports both /api/setting and /api/settings)
app.use("/api/setting", settingRoutes);
app.use("/api/settings", settingRoutes);



// Test Route
app.get("/", (req, res) => {
  res.send("Admin Backend Server Running");
});

// Fallback 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found`,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});