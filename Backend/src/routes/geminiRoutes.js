// src/routes/geminiRoutes.js
import express from "express";
import multer from "multer";
import { uploadAndAnalyze } from "../controller/geminiController.js";

const router = express.Router();

// gunakan memoryStorage agar file tidak disimpan di disk
const upload = multer({ storage: multer.memoryStorage() });

router.post("/analyze", upload.single("image"), uploadAndAnalyze);

export default router; // ✅ gunakan export default, bukan module.exports
