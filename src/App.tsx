import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Spline from '@splinetool/react-spline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Sell from './pages/Sell';
import MyAuctions from './pages/MyAuctions';
import Profile from './pages/Profile';

function App() {
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
        <Toaster position="top-right" />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/my-auctions" element={<MyAuctions />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;