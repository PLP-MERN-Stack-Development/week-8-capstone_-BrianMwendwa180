const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createComment,
  getCommentsByBug,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');

// @route   GET /api/comments/:bugId
// @desc    Get comments for a bug
// @access  Private
router.get('/:bugId', authMiddleware, getCommentsByBug);

// @route   POST /api/comments
// @desc    Create a comment
// @access  Private
router.post('/', authMiddleware, createComment);

// @route   PUT /api/comments/:id
// @desc    Update a comment
// @access  Private
router.put('/:id', authMiddleware, updateComment);

// @route   DELETE /api/comments/:id
// @desc    Delete a comment
// @access  Private
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;
