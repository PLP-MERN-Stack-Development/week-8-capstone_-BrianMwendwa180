const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'in progress', 'closed'],
    default: 'open',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assigneeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;
