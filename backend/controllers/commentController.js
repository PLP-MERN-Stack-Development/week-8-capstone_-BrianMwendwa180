const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  try {
    const { bugId, commentText } = req.body;
    const userId = req.user.id; // Assuming user ID is set in req.user by auth middleware

    const comment = new Comment({
      bugId,
      userId,
      commentText,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCommentsByBug = async (req, res) => {
  try {
    const comments = await Comment.find({ bugId: req.params.bugId })
      .populate('userId', 'username email')
      .sort({ createdAt: 1 });
    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    comment.commentText = req.body.commentText || comment.commentText;
    await comment.save();
    res.json(comment);
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await comment.remove();
    res.json({ message: 'Comment removed' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
