import express from "express";
import {
  createHome,
  getHome
} from "../controllers/homeController.js";


const router = express.Router();


// Save Home Data
router.post("/", createHome);


// Get Home Data
router.get("/", getHome);


export default router;