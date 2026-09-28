import express from "express";

import {
  loginAdmin,
  resetPassword,
  SendOtp,
  signupAdmin,
  verifyForgotOtp,
  getAdminProfile,
  updateAdminProfile,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/signup", signupAdmin);

router.post("/login", loginAdmin);

router.post("/send-otp", SendOtp);

router.post("/verify-otp", verifyForgotOtp);

router.post("/new-password", resetPassword);

// ===========================
// Admin Profile
// ===========================

router.get("/profile", getAdminProfile);

router.put("/profile", updateAdminProfile);

export default router;