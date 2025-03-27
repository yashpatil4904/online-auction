const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Models
const User = require("./Models/User");
const Auction = require("./Models/Auction");
const Bid = require("./Models/Bid");

// JWT Secret
const JWT_SECRET = "your-secret-key"; // In production, use environment variable

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Routes
// User Routes
app.post("/api/auth/register", async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const { username, email, password, fullName } = req.body;
    
    // Validate required fields
    if (!username || !email || !password || !fullName) {
      console.log('Missing fields:', { username, email, password, fullName });
      return res.status(400).json({ 
        message: "All fields are required",
        missingFields: {
          username: !username,
          email: !email,
          password: !password,
          fullName: !fullName
        }
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.log('User already exists:', existingUser);
      return res.status(400).json({ 
        message: "User already exists",
        existingFields: {
          email: existingUser.email === email,
          username: existingUser.username === username
        }
      });
    }

    console.log('Creating new user...');
    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      fullName
    });
    console.log('User created successfully:', user);

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
    console.log('Token generated successfully');

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: "Error creating user", 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Login Route
app.post("/api/auth/login", async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      console.log('Missing fields:', { email, password });
      return res.status(400).json({
        message: "Email and password are required",
        missingFields: {
          email: !email,
          password: !password
        }
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
    console.log('Login successful for user:', email);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      message: "Error during login",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Auction Routes
app.post("/api/auctions", authenticateToken, async (req, res) => {
  try {
    const auction = await Auction.create({
      ...req.body,
      seller: req.user.userId,
      currentPrice: req.body.startingPrice
    });
    res.status(201).json(auction);
  } catch (error) {
    res.status(500).json({ message: "Error creating auction", error: error.message });
  }
});

app.get("/api/auctions", async (req, res) => {
  try {
    const { category, status, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const auctions = await Auction.find(query)
      .populate('seller', 'username')
      .sort({ createdAt: -1 });
    
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching auctions", error: error.message });
  }
});

app.get("/api/auctions/:id", async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate('seller', 'username')
      .populate('winner', 'username');
    
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    res.json(auction);
  } catch (error) {
    res.status(500).json({ message: "Error fetching auction", error: error.message });
  }
});

// Bid Routes
app.post("/api/auctions/:id/bids", authenticateToken, async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    if (auction.status !== 'active') {
      return res.status(400).json({ message: "Auction is not active" });
    }

    if (auction.seller.toString() === req.user.userId) {
      return res.status(400).json({ message: "Cannot bid on your own auction" });
    }

    const { amount } = req.body;
    if (amount <= auction.currentPrice) {
      return res.status(400).json({ message: "Bid amount must be higher than current price" });
    }

    // Create bid
    const bid = await Bid.create({
      auction: auction._id,
      bidder: req.user.userId,
      amount
    });

    // Update auction
    auction.currentPrice = amount;
    auction.bids.push({
      bidder: req.user.userId,
      amount
    });
    await auction.save();

    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ message: "Error placing bid", error: error.message });
  }
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/auction_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("\x1b[32m%s\x1b[0m", "✅ MongoDB Connected Successfully");
    console.log("Database:", mongoose.connection.db.databaseName);
    console.log("Host:", mongoose.connection.host);
    console.log("Port:", mongoose.connection.port);
    
    // Start server after successful database connection
    startServer();
  } catch (err) {
    console.error("\x1b[31m%s\x1b[0m", "❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

// Start server function
const startServer = () => {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log("\n\x1b[36m%s\x1b[0m", "🚀 Server is running!");
    console.log("\x1b[32m%s\x1b[0m", `📡 API URL: http://localhost:${PORT}/api`);
    console.log("\x1b[32m%s\x1b[0m", "🌐 Frontend URL: http://localhost:5173");
    console.log("\x1b[34m%s\x1b[0m", "\n📊 Database Connection:");
    console.log("Database:", "auction_db");
    console.log("Host:", "localhost");
    console.log("Port:", "27017");
    console.log("\x1b[33m%s\x1b[0m", "\n💡 Tip: Click the URLs above to open in your browser\n");
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error("\x1b[31m%s\x1b[0m", `\n❌ Error: Port ${PORT} is already in use.`);
      console.log("\x1b[33m%s\x1b[0m", "Please try these steps:");
      console.log("1. Run `npx kill-port 5000` to free up the port");
      console.log("2. Or use a different port by setting PORT environment variable");
      process.exit(1);
    } else {
      console.error("\x1b[31m%s\x1b[0m", "\n❌ Server error:", err);
    }
  });

  // Handle server shutdown gracefully
  process.on('SIGTERM', () => {
    console.log("\x1b[33m%s\x1b[0m", "\n🛑 Shutting down server...");
    server.close(() => {
      console.log("\x1b[32m%s\x1b[0m", "✅ Server closed successfully");
      process.exit(0);
    });
  });
};

// Connect to MongoDB and start server
connectDB();
