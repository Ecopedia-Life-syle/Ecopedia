// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const route = require('./src/routes/index');
const path = require('path');
const recycleRoutes = require('./src/routes/geminiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Serve static files (untuk akses gambar yang diupload)
// app.use('/uploads', express.static('uploads'));

// // Routes
// app.use('/api/recycle', recycleRoutes);

// // Health check
// app.get('/health', (req, res) => {
//   res.json({ status: 'OK', message: 'Server is running' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: err.message || 'Something went wrong!'
//   });
// });

app.use(route);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});