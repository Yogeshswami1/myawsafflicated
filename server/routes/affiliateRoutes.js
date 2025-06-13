const express = require('express');
const router = express.Router();
const affiliateController = require('../controllers/affiliateController');

router.get('/:productId', affiliateController.generateAffiliateLink);

module.exports = router;