import express from "express";
import {
  saveSettings,
  getSettings
} from "../controllers/settingController.js";


const router = express.Router();


router.post("/", saveSettings);

router.get("/", getSettings);


export default router;