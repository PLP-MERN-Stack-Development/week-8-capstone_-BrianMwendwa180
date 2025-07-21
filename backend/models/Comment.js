const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  bugId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bug',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
