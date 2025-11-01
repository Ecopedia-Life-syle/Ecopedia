const express = require('express');
const router = express.Router();
const carbonController = require('../controller/carbonController');
const middleware = require("../middleware/middleware");

router.route('/').post(middleware.accessValidate,carbonController.addCarbonRecord);
router.route('/my').get(middleware.accessValidate,carbonController.getCarbonStats);

module.exports = router;
