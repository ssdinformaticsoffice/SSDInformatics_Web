import express from "express";

import {
  createCareer,
  getOpenCareers,
  getAllCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
} from "../controllers/careerController.js";

import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// ===========================
// Public Routes
// ===========================

// Get all open career positions
router.get("/", getOpenCareers);

// ===========================
// Admin Routes
// ===========================

// Get all career positions
router.get("/all", auth, getAllCareers);

// Create new career position
router.post("/", auth, createCareer);

// Update career position
router.patch("/:id", auth, updateCareer);

// Delete career position
router.delete("/:id", auth, deleteCareer);

// Get single career position
router.get("/:id", getCareerById);

export default router;