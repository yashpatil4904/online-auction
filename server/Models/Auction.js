const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  startingPrice: {
    type: Number,
    required: true,
    min: 0
  },
  currentPrice: {
    type: Number,
    required: true,
    min: 0
  },
  reservePrice: {
    type: Number,
    min: 0
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: String,
    required: true,
    enum: ['Art', 'Antiques', 'Collectibles', 'Electronics', 'Fashion', 'Jewelry', 'Sports', 'Vehicles', 'Other']
  },
  images: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    enum: ['draft', 'active', 'ended', 'cancelled'],
    default: 'draft'
  },
  bids: [{
    bidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: Number,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying
auctionSchema.index({ status: 1, endTime: 1 });
auctionSchema.index({ category: 1 });
auctionSchema.index({ seller: 1 });

module.exports = mongoose.model('Auction', auctionSchema); 