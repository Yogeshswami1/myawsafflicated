const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.post('/search', analyticsController.logSearch);
router.post('/click', analyticsController.logClick);

module.exports = router;