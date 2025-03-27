const mongoose = require('mongoose');

// MongoDB Connection URL
const MONGODB_URI = "mongodb://localhost:27017/auction_db";

// Test connection
console.log('Attempting to connect to MongoDB...');

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    console.log('Connection details:');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Host:', mongoose.connection.host);
    console.log('Port:', mongoose.connection.port);
    
    // Test User model
    const User = require('./Models/User');
    console.log('\nUser model loaded successfully');
    
    // Test Auction model
    const Auction = require('./Models/Auction');
    console.log('Auction model loaded successfully');
    
    // Test Bid model
    const Bid = require('./Models/Bid');
    console.log('Bid model loaded successfully');
    
    // Close connection after tests
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  }); 