import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gavel, Search, Menu, Bell, Globe, Sun, Moon, Monitor } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { CurrencySelect } from './CurrencySelect';
import { useTheme } from '../hooks/useTheme';

interface TopBarProps {
  onSidebarToggle: () => void;
  isSidebarCollapsed: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ onSidebarToggle, isSidebarCollapsed }) => {
  const { theme } = useTheme();
  const [selectedCurrency, setSelectedCurrency] = useState({ code: 'USD', symbol: '$', name: 'US Dollar' });

  return (
    <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle Button */}
        <button
          onClick={onSidebarToggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
        <div className="h-15 w-15 flex items-center justify-center">
            <img 
              src="/assets/logo.png" 
              alt="PrimeBid Logo" 
              className="h-12 w-12 object-contain"
            />
          </div>

          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            PrimeBid
          </span>
        </Link>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search auctions..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
        </div>
      </div>

      {/* Right Section - Controls */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative group">
          <div className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </div>
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 hidden group-hover:block z-50">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Notifications</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">No new notifications</p>
          </div>
        </button>

        {/* Currency Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Globe className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {selectedCurrency.symbol} {selectedCurrency.code} - {selectedCurrency.name}
            </span>
          </button>

          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hidden group-hover:block z-50">
            <div className="p-2">
              <CurrencySelect 
                value={selectedCurrency.code} 
                onChange={(currency) => setSelectedCurrency(currency)} 
              />
            </div>
          </div>
        </div>

        {/* Theme Dropdown */}
        <div className="relative group">
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            {theme === 'light' && <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
            {theme === 'dark' && <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
            {theme === 'system' && <Monitor className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
          </button>

          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hidden group-hover:block z-50">
            <div className="p-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar; 