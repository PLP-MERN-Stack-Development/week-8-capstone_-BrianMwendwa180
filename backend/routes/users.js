const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUser, updateUser } = require('../controllers/userController');

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/users/me', authMiddleware, getUser);

// @route   PUT /api/users/me
// @desc    Update current user profile
// @access  Private
router.put('/users/me', authMiddleware, updateUser);

module.exports = router;
