const express = require('express');
const router = express.Router();

// Remove all auth routes since we're using Firebase
// router.post('/signup', authController.signup);
// router.post('/login', authController.login);
// router.get('/profile', authController.getProfile);

module.exports = router;