import React, { useState } from 'react';
import { Lock, Package, TrendingDown, Users } from 'lucide-react';
import { Switch } from '@headlessui/react';

interface BidOptionsProps {
  onBidTypeChange: (type: 'standard' | 'sealed' | 'reverse' | 'buyers-choice') => void;
  onBundleSelect: (bundleItems: string[]) => void;
}

export const BidOptions: React.FC<BidOptionsProps> = ({ onBidTypeChange, onBundleSelect }) => {
  const [enableBundle, setEnableBundle] = useState(false);

  return (
    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Bidding Options</h3>
        
        <button
          onClick={() => onBidTypeChange('sealed')}
          className="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          <Lock className="text-blue-500" size={20} />
          <div className="text-left">
            <div className="font-medium text-gray-900 dark:text-gray-100">Sealed Bidding</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Submit private bids</div>
          </div>
        </button>

        <button
          onClick={() => onBidTypeChange('buyers-choice')}
          className="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          <Users className="text-green-500" size={20} />
          <div className="text-left">
            <div className="font-medium text-gray-900 dark:text-gray-100">Buyer's Choice</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Choose from similar items</div>
          </div>
        </button>

        <button
          onClick={() => onBidTypeChange('reverse')}
          className="flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          <TrendingDown className="text-purple-500" size={20} />
          <div className="text-left">
            <div className="font-medium text-gray-900 dark:text-gray-100">Reverse Auction</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Wait for price drops</div>
          </div>
        </button>

        <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-700">
          <div className="flex items-center gap-2">
            <Package className="text-orange-500" size={20} />
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Bundle Bidding</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Bid on multiple items</div>
            </div>
          </div>
          <Switch
            checked={enableBundle}
            onChange={setEnableBundle}
            className={`${
              enableBundle ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span
              className={`${
                enableBundle ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};