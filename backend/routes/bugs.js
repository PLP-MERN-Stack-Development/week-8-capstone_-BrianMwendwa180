const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createBug,
  getBugs,
  getBugById,
  updateBug,
  deleteBug,
} = require('../controllers/bugController');

// @route   GET /api/bugs
// @desc    Get all bugs
// @access  Private
router.get('/', authMiddleware, getBugs);

// @route   POST /api/bugs
// @desc    Create a new bug
// @access  Private
router.post('/', authMiddleware, createBug);

// @route   GET /api/bugs/:id
// @desc    Get bug by ID
// @access  Private
router.get('/:id', authMiddleware, getBugById);

// @route   PUT /api/bugs/:id
// @desc    Update bug by ID
// @access  Private
router.put('/:id', authMiddleware, updateBug);

// @route   DELETE /api/bugs/:id
// @desc    Delete bug by ID
// @access  Private
router.delete('/:id', authMiddleware, deleteBug);

module.exports = router;
