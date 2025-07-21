require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

// Connect to MongoDB
connectDB();

const authRoutes = require('./routes/auth');

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const bugRoutes = require('./routes/bugs');

const commentRoutes = require('./routes/comments');

const userRoutes = require('./routes/users');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bugs', bugRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Basic route
app.get('/', (req, res) => {
  res.send('Bugs Tracker API is running');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, io };
