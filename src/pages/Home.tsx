import React, { useState } from 'react';
import { Filter, TrendingUp, Package, Truck, Tag, Clock } from 'lucide-react';
import { AuctionCard } from '../components/AuctionCard';
import { BidOptions } from '../components/BidOptions';
import type { Auction } from '../types';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'endingSoon' | 'priceLowToHigh' | 'priceHighToLow'>('endingSoon');
  const [showFilters, setShowFilters] = useState(false);
  const [showBidOptions, setShowBidOptions] = useState(false);

  const initialAuctions: Auction[] = [{
    id: '1',
    title: 'Vintage Mechanical Watch',
    description: 'A beautifully preserved 1960s mechanical watch with original leather strap. Features include chronograph functionality and luminous hands.',
    currentBid: 1250,
    startingPrice: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=800&q=80',
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    seller: 'VintageCollector',
    category: 'Fashion',
    condition: 'Good',
    bids: [],
    watchCount: 45,
    isHotItem: true,
    minimumBidIncrement: 50,
    location: 'New York, NY',
    shippingCost: 15,
    estimatedDelivery: '3-5 business days',
    highlights: ['Original box and papers', 'Recently serviced', 'Rare model'],
    previousPrice: 1500,
    discount: 15,
    biddingType: 'standard',
    currency: 'USD'
  }, {
    id: '2',
    title: 'Gaming PC - RTX 4080',
    description: 'High-end gaming PC featuring NVIDIA RTX 4080, Intel i9 processor, 32GB RAM, and 2TB NVMe SSD. Perfect for gaming and content creation.',
    currentBid: 2800,
    startingPrice: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    seller: 'TechDeals',
    category: 'Electronics',
    condition: 'Like New',
    bids: [],
    watchCount: 89,
    isHotItem: true,
    minimumBidIncrement: 100,
    location: 'Los Angeles, CA',
    shippingCost: 50,
    estimatedDelivery: '5-7 business days',
    highlights: ['4K Gaming Ready', 'RGB Lighting', 'Liquid Cooling'],
    biddingType: 'standard',
    currency: 'USD'
  }, {
    id: '3',
    title: 'Mid-Century Modern Sofa',
    description: 'Elegant mid-century modern sofa in pristine condition. Upholstered in premium velvet fabric with solid walnut legs.',
    currentBid: 850,
    startingPrice: 700,
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    seller: 'ModernHome',
    category: 'Furniture',
    condition: 'Like New',
    bids: [],
    watchCount: 32,
    isHotItem: false,
    minimumBidIncrement: 25,
    location: 'Chicago, IL',
    shippingCost: 100,
    estimatedDelivery: '7-10 business days',
    highlights: ['Original Design', 'Premium Materials', 'Excellent Condition'],
    previousPrice: 1200,
    discount: 30,
    biddingType: 'standard',
    currency: 'USD'
  }, {
    id: '4',
    title: 'Professional DSLR Camera Kit',
    description: 'Complete professional photography kit including camera body, multiple lenses, flash, and accessories. Perfect for professional photographers.',
    currentBid: 3500,
    startingPrice: 3000,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    seller: 'ProPhoto',
    category: 'Electronics',
    condition: 'Good',
    bids: [],
    watchCount: 67,
    isHotItem: true,
    minimumBidIncrement: 100,
    location: 'Miami, FL',
    shippingCost: 30,
    estimatedDelivery: '2-3 business days',
    highlights: ['Full Frame Sensor', '4K Video', 'Weather Sealed'],
    biddingType: 'standard',
    currency: 'USD'
  }, {
    id: '6',
    title: 'Smart Home Security System',
    description: 'Complete smart home security system with 4K cameras, doorbell, motion sensors, and hub. Easy to install and smartphone compatible.',
    currentBid: 450,
    startingPrice: 400,
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    endTime: new Date(Date.now() + 2.5 * 24 * 60 * 60 * 1000),
    seller: 'SmartTech',
    category: 'Electronics',
    condition: 'New',
    bids: [],
    watchCount: 41,
    isHotItem: true,
    minimumBidIncrement: 20,
    location: 'Seattle, WA',
    shippingCost: 25,
    estimatedDelivery: '3-5 business days',
    highlights: ['4K Resolution', 'Night Vision', 'Two-way Audio'],
    biddingType: 'standard',
    currency: 'USD'
  }];

  const [auctions] = useState<Auction[]>(initialAuctions);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'Furniture', name: 'Furniture' },
    { id: 'Electronics', name: 'Electronics' },
    { id: 'Fashion', name: 'Fashion' },
    { id: 'Home & Garden', name: 'Home & Garden' }
  ];

  const handlePlaceBid = (auctionId: string, amount: number) => {
    console.log(`Placing bid of $${amount} on auction ${auctionId}`);
  };

  const filteredAuctions = auctions
    .filter(auction => selectedCategory === 'all' || auction.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'endingSoon':
          return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
        case 'priceLowToHigh':
          return a.currentBid - b.currentBid;
        case 'priceHighToLow':
          return b.currentBid - a.currentBid;
        default:
          return 0;
      }
    });

  return (
    <div>
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold dark:text-white">Browse Auctions</h2>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showFilters ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  >
                    <option value="endingSoon">Ending Soon</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bidding Options</label>
                  <button
                    onClick={() => setShowBidOptions(!showBidOptions)}
                    className="w-full p-2 border rounded-lg bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                  >
                    Configure Bidding
                  </button>
                </div>
              </div>
              
              {showBidOptions && (
                <div className="mt-4">
                  <BidOptions
                    onBidTypeChange={(type) => console.log('Bid type changed:', type)}
                    onBundleSelect={(items) => console.log('Bundle items:', items)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="flex items-center gap-3">
              <Clock className="text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Auctions</p>
                <p className="text-xl font-semibold dark:text-white">{auctions.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Tag className="text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
                <p className="text-xl font-semibold dark:text-white">
                  ${auctions.reduce((sum, auction) => sum + auction.currentBid, 0).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Package className="text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Items Shipped</p>
                <p className="text-xl font-semibold dark:text-white">1,234</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="text-orange-600 dark:text-orange-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Delivery Time</p>
                <p className="text-xl font-semibold dark:text-white">4.2 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-red-500" />
          <h2 className="text-xl font-semibold dark:text-white">Featured Auctions</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuctions.map((auction) => (
            <AuctionCard
              key={auction.id}
              auction={auction}
              onPlaceBid={handlePlaceBid}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;