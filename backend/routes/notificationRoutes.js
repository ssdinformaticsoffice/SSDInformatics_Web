import express from "express";
import {
  getNotifications,
  markAllAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

// Get Notifications
router.get("/", getNotifications);

// Mark All Notifications as Read
router.put("/read", markAllAsRead);

export default router;