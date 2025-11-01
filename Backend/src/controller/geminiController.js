// src/controller/imageController.js
import { analyzeImage } from "../service/geminiService.js";

export async function uploadAndAnalyze(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Tidak ada gambar yang diupload" });
    }

    const buffer = req.file.buffer;
    const mimeType = req.file.mimetype;

    const result = await analyzeImage(buffer, mimeType);

    res.json({ description: result });
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: error.message });
  }
}
