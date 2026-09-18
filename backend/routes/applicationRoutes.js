import express from "express";

import {
  createApplication,
} from "../controllers/applicationController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public Route - Apply for a Job
router.post(
  "/",
  upload.single("resume"),
  createApplication
);

export default router;