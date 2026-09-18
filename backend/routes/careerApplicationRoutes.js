import express from "express";

import {
  createCareerApplication,
  getAllCareerApplications,
  getCareerApplicationById,
  updateCareerApplicationStatus,
  markCareerApplicationRead,
  deleteCareerApplication,
} from "../controllers/careerApplicationController.js";

import upload from "../middleware/uploadMiddleware.js";

import auth from "../middleware/authMiddleware.js";

const router = express.Router();


// =====================================================
// Public - Apply For Job
// =====================================================

router.post(
  "/",
  upload.single("resume"),
  createCareerApplication
);


// =====================================================
// Admin - Get All Applications
// =====================================================

router.get(
  "/",
  auth,
  getAllCareerApplications
);


// =====================================================
// Admin - Get Single Application
// =====================================================

router.get(
  "/:id",
  auth,
  getCareerApplicationById
);


// =====================================================
// Admin - Update Application Status
// =====================================================

router.patch(
  "/:id/status",
  auth,
  updateCareerApplicationStatus
);


// =====================================================
// Admin - Mark Application Read
// =====================================================

router.patch(
  "/:id/read",
  auth,
  markCareerApplicationRead
);


// =====================================================
// Admin - Delete Application
// =====================================================

router.delete(
  "/:id",
  auth,
  deleteCareerApplication
);


export default router;