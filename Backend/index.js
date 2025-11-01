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

app.use(route);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});