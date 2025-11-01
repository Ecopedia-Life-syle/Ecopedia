// // src/routes/recycleRoutes.js
// const express = require('express');
// const router = express.Router();
// const recycleController = require('../controller/geminiController');
// const upload = require('../multer');

// // POST: Upload dan analisis gambar
// router.post(
//   '/analyze',
//   upload.single('image'),
//   recycleController.analyzeAndSave
// );

// // GET: Ambil semua recycle items
// router.get('/items', recycleController.getAllItems);

// // GET: Ambil recycle item by ID
// router.get('/items/:id', recycleController.getItemById);

// module.exports = router;