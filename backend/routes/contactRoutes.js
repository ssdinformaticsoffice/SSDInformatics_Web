import express from "express";
import {
  createContact,
  getAllContacts,
} from "../controllers/contactController.js";

const router = express.Router();

// Public Route (Website Contact Form)
router.post("/", createContact);

// Admin Route (Get All Messages)
router.get("/", getAllContacts);

export default router;