import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// MongoDB Atlas connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://<your-username>:<your-password>@<your-cluster-url>/auction-platform?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
  // These options are no longer needed in Mongoose 8
  // but keeping them here for clarity
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Socket.IO events
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('place_bid', (data) => {
    // Handle new bids
    io.emit('bid_placed', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});