export interface Auction {
  id: string;
  title: string;
  description: string;
  currentBid: number;
  startingPrice: number;
  imageUrl: string;
  endTime: Date;
  seller: string;
  category: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  bids: Bid[];
  watchCount: number;
  isHotItem: boolean;
  minimumBidIncrement: number;
  location: string;
  shippingCost: number;
  estimatedDelivery: string;
  highlights: string[];
  previousPrice?: number;
  discount?: number;
  biddingType: 'standard' | 'sealed' | 'reverse' | 'buyers-choice';
  currency: string;
  bundleItems?: string[];
  recommendedPrice?: number;
  similarItems?: string[];
}

export interface Bid {
  id: string;
  amount: number;
  bidder: string;
  timestamp: Date;
  isSealed?: boolean;
  currency?: string;
  bundleId?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  currency: string;
  notifications: {
    outbid: boolean;
    watchlist: boolean;
    recommendations: boolean;
    priceDrops: boolean;
  };
  categories: string[];
}

export interface BidAlert {
  id: string;
  userId: string;
  auctionId: string;
  type: 'outbid' | 'watchlist' | 'recommendation' | 'priceDrop';
  message: string;
  timestamp: Date;
  read: boolean;
}