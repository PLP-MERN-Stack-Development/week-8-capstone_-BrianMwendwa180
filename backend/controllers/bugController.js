const Bug = require('../models/Bug');

const validStatus = ['open', 'in progress', 'closed'];
const validPriority = ['low', 'medium', 'high'];

exports.createBug = async (req, res) => {
  try {
    const { title, description, status, priority, assigneeId } = req.body;
    const reporterId = req.user.id; // Assuming user ID is set in req.user by auth middleware

    if (status && !validStatus.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    if (priority && !validPriority.includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority value' });
    }

    const bug = new Bug({
      title,
      description,
      status,
      priority,
      reporterId,
      assigneeId,
    });

    await bug.save();
    res.status(201).json(bug);
  } catch (error) {
    console.error('Create bug error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find()
      .populate('reporterId', 'username email')
      .populate('assigneeId', 'username email')
      .sort({ createdAt: -1 });
    res.json(bugs);
  } catch (error) {
    console.error('Get bugs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBugById = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id)
      .populate('reporterId', 'username email')
      .populate('assigneeId', 'username email');
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }
    res.json(bug);
  } catch (error) {
    console.error('Get bug by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    const { title, description, status, priority, assigneeId } = req.body;

    if (status && !validStatus.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    if (priority && !validPriority.includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority value' });
    }

    bug.title = title || bug.title;
    bug.description = description || bug.description;
    bug.status = status || bug.status;
    bug.priority = priority || bug.priority;
    bug.assigneeId = assigneeId || bug.assigneeId;

    await bug.save();
    res.json(bug);
  } catch (error) {
    console.error('Update bug error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    res.json({ message: 'Bug removed' });
  } catch (error) {
    console.error('Delete bug error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
