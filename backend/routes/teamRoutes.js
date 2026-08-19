import express from "express";

import {
  createTeamMember,
  getActiveTeamMembers,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamController.js";

import auth from "../middleware/authMiddleware.js";
import teamImageUpload from "../middleware/teamImageUpload.js";

const router = express.Router();

// ===========================
// Public
// ===========================

router.get("/", getActiveTeamMembers);

// ===========================
// Admin
// ===========================

router.get("/all", auth, getAllTeamMembers);

router.post("/", auth, teamImageUpload.single("image"), createTeamMember);

router.get("/:id", auth, getTeamMemberById);

router.patch("/:id", auth, teamImageUpload.single("image"), updateTeamMember);

router.delete("/:id", auth, deleteTeamMember);

export default router;