import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, User, LogOut } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Sell', path: '/sell', icon: Package },
    { name: 'My Auctions', path: '/my-auctions', icon: Package },
  ];

  return (
    <div className={`h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    } flex flex-col`}>
      {/* User Profile Section */}
      <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Yash Patil</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">yashpatil@gmail.com</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && item.name}
              
              {/* Tooltip */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                  {item.name}
                  <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="group relative flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg w-full">
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
          
          {/* Tooltip */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
              Logout
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 