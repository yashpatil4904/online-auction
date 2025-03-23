import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Timer, DollarSign, User, Eye, Flame, Heart, MapPin, Truck, Package, AlertTriangle } from 'lucide-react';
import type { Auction } from '../types';
import Confetti from 'react-confetti';
import toast from 'react-hot-toast';

interface AuctionCardProps {
  auction: Auction;
  onPlaceBid: (auctionId: string, amount: number) => void;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ auction, onPlaceBid }) => {
  const [bidAmount, setBidAmount] = useState<string>('');
  const [isWatching, setIsWatching] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const timeLeft = formatDistanceToNow(new Date(auction.endTime), { addSuffix: true });
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date(auction.endTime);
      const diff = end.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeRemaining('Auction ended');
        clearInterval(timer);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [auction.endTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(bidAmount);
    if (amount > auction.currentBid + auction.minimumBidIncrement) {
      onPlaceBid(auction.id, amount);
      setBidAmount('');
      setShowConfetti(true);
      toast.success('Bid placed successfully!');
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      toast.error(`Minimum bid increment is $${auction.minimumBidIncrement}`);
    }
  };

  const toggleWatch = () => {
    setIsWatching(!isWatching);
    toast.success(isWatching ? 'Removed from watchlist' : 'Added to watchlist');
  };

  const discountBadge = auction.discount && (
    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2 z-10">
      <AlertTriangle size={16} />
      <span className="text-sm font-medium">{auction.discount}% OFF</span>
    </div>
  );

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-2xl relative ${
      isExpanded ? 'transform scale-105 z-10' : ''
    }`}>
      {showConfetti && <Confetti numberOfPieces={100} recycle={false} />}
      
      <div className="relative h-48 overflow-hidden group">
        {discountBadge}
        <img
          src={auction.imageUrl}
          alt={auction.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-2">
          <Timer size={16} className="animate-pulse" />
          <span className="text-sm font-medium">{timeRemaining}</span>
        </div>
        {auction.isHotItem && (
          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2">
            <Flame size={16} />
            <span className="text-sm font-medium">Hot Item</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold">{auction.title}</h3>
          <button
            onClick={toggleWatch}
            className={`p-2 rounded-full transition-colors ${
              isWatching ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={20} fill={isWatching ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span className="px-2 py-1 bg-gray-100 rounded-full">{auction.category}</span>
          <span className="px-2 py-1 bg-gray-100 rounded-full">{auction.condition}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <MapPin size={16} />
          <span>{auction.location}</span>
        </div>

        <p className={`text-gray-600 mb-4 ${isExpanded ? '' : 'line-clamp-2'}`}>
          {auction.description}
        </p>

        {isExpanded && (
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Highlights:</h4>
            <ul className="list-disc list-inside space-y-1">
              {auction.highlights.map((highlight, index) => (
                <li key={index} className="text-gray-600">{highlight}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <DollarSign size={18} className="text-green-600" />
              <span className="font-semibold text-lg">
                ${auction.currentBid.toLocaleString()}
              </span>
              {auction.previousPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${auction.previousPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <User size={18} />
              <span>{auction.seller}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Eye size={16} />
            <span>{auction.watchCount}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Truck size={16} />
            <span>${auction.shippingCost} shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <Package size={16} />
            <span>{auction.estimatedDelivery}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder={`Min bid: $${(auction.currentBid + auction.minimumBidIncrement).toLocaleString()}`}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              USD
            </span>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Place Bid
          </button>
        </form>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-blue-600 text-sm hover:underline w-full text-center"
        >
          {isExpanded ? 'Show less' : 'Show more details'}
        </button>
      </div>
    </div>
  );
};