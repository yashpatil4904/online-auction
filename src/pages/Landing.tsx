import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gavel, Clock, DollarSign, Shield, TrendingUp, ArrowDown } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const Landing: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      {/* Spline Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 'calc(100vh + 100px)',
          margin: 0,
          overflow: 'hidden',
          clipPath: 'inset(0px 0px 100px 0px)'
        }}>
          <Spline scene="https://prod.spline.design/SduMAb1dKvrYpULk/scene.splinecode" />
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 min-h-screen bg-gradient-to-b from-gray-50/80 to-gray-100/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-sm">
        {/* Navigation */}
        <nav className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
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
            <div className="flex items-center gap-6">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 dark:text-white">
              Discover Amazing Deals Through Online Auctions
            </h1>
            <p className="text-xl text-gray-600 mb-8 dark:text-gray-300">
              Experience the thrill of bidding on unique items, from rare collectibles to everyday essentials.
              Join our community of buyers and sellers today!
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/home" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                Browse Auctions <ArrowRight size={20} />
              </Link>
              <Link to="/sell" className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-blue-600">
                Start Selling
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Why Choose AuctionHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <Gavel className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Regular Auctions</h3>
              <p className="text-gray-600 dark:text-gray-300">Bid on items and compete with other buyers in traditional auctions.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <ArrowDown className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Reverse Auctions</h3>
              <p className="text-gray-600 dark:text-gray-300">Watch prices drop over time and buy when you find the perfect deal.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Real-time Updates</h3>
              <p className="text-gray-600 dark:text-gray-300">Get instant notifications about bids and price changes.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Secure Transactions</h3>
              <p className="text-gray-600 dark:text-gray-300">Safe and secure payment processing for all transactions.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Best Deals</h3>
              <p className="text-gray-600 dark:text-gray-300">Find the best prices through our competitive auction system.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <DollarSign className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Flexible Pricing</h3>
              <p className="text-gray-600 dark:text-gray-300">Set your own prices and let the market decide the value.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="bg-blue-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Bidding?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already enjoying the thrill of online auctions.
              Create your account today and start bidding on amazing items!
            </p>
            <Link to="/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 inline-flex items-center gap-2">
              Get Started <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="text-gray-600 dark:text-gray-400">© 2024 AuctionHub. All rights reserved.</div>
            <div className="flex gap-6">
              <Link to="/about" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">Contact</Link>
              <Link to="/terms" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">Terms</Link>
              <Link to="/privacy" className="text-gray-600 hover:text-blue-600 dark:text-gray-400">Privacy</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing; 