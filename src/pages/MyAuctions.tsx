import React, { useState } from 'react';
import { Package, DollarSign, Clock, Eye } from 'lucide-react';
import type { Auction } from '../types';

const MyAuctions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'selling' | 'bidding'>('selling');

  const myListings: Auction[] = [
    // Add sample listings here
  ];

  const myBids: Auction[] = [
    // Add sample bids here
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('selling')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'selling'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Items I'm Selling
            </button>
            <button
              onClick={() => setActiveTab('bidding')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'bidding'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Items I'm Bidding On
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'selling' ? (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold dark:text-white">Your Listed Items</h2>
              {myListings.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    You haven't listed any items yet
                  </p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    List Your First Item
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {/* Listing cards would go here */}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold dark:text-white">Your Active Bids</h2>
              {myBids.length === 0 ? (
                <div className="text-center py-12">
                  <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    You haven't placed any bids yet
                  </p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Browse Auctions
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {/* Bid cards would go here */}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAuctions;