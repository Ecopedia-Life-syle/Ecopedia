// src/controller/recycleController.js
const recycleService = require('../service/geminiService');
const path = require('path');

class RecycleController {
  async analyzeAndSave(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No image file provided'
        });
      }

      const imagePath = req.file.path;
      const imageUrl = `/uploads/${req.file.filename}`;

      // Analisis gambar dengan Gemini
      const analysisResult = await recycleService.analyzeImage(imagePath);

      // Simpan hasil ke database
      const savedItems = await recycleService.saveRecycleItem(
        analysisResult, 
        imageUrl
      );

      res.status(201).json({
        success: true,
        message: 'Image analyzed and recycle suggestions saved successfully',
        data: {
          analysis: analysisResult,
          savedItems: savedItems
        }
      });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
  }

  async getAllItems(req, res) {
    try {
      const items = await recycleService.getAllRecycleItems();
      
      res.status(200).json({
        success: true,
        data: items
      });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
  }

  async getItemById(req, res) {
    try {
      const { id } = req.params;
      const item = await recycleService.getRecycleItemById(id);
      
      res.status(200).json({
        success: true,
        data: item
      });
    } catch (error) {
      console.error('Controller error:', error);
      const statusCode = error.message === 'Recycle item not found' ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
  }
}

module.exports = new RecycleController();