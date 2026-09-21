import express from "express";

import {
  createBranch,
  getActiveBranches,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} from "../controllers/branchController.js";

import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getActiveBranches);

// Admin
router.get("/all", auth, getAllBranches);
router.post("/", auth, createBranch);
router.get("/:id", auth, getBranchById);
router.patch("/:id", auth, updateBranch);
router.delete("/:id", auth, deleteBranch);

export default router;