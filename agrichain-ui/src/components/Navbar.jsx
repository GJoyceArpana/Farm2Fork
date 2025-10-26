// src/components/Navbar.jsx
import React from 'react';
import { Leaf, User, Sun, Moon } from 'lucide-react'; 

// Navbar is now fixed to always use hash links for client-side routing
const Navbar = ({ currentPage, isDarkMode, toggleTheme }) => {
  // If the user is on the Dashboard or Success/Register pages, we hide the main nav links 
  // to give a focused, application-specific view.
  const showNavLinks = !['Dashboard', 'Register Produce', 'Registration Success', 'Consumer Login'].includes(currentPage);

  return (
    <nav className="border-b border-gray-100 transition-colors duration-500 bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="container flex items-center justify-between h-20">
        {/* Logo and Tagline */}
        <a href="#/home" className="flex items-center space-x-2">
          <Leaf className="w-8 h-8 text-white bg-green-600 rounded-full p-1" />
          <div>
            <span className="text-xl font-bold text-green-600">AgriChain</span>
            <p className="text-xs text-gray-500 dark:text-gray-400">Farm to Fork</p>
          </div>
        </a>

        {/* Navigation Links (Conditional Rendering) */}
        {showNavLinks && (
          <div className="flex space-x-6 text-sm font-medium">
            <a href="#/home" className={`pb-1 ${currentPage === 'Home' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500'}`}>Home</a>
            <a href="#/farmer" className={`pb-1 ${currentPage === 'Farmer Portal' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500'}`}>Farmer Portal</a>
            <a href="#/qrscanner" className={`pb-1 ${currentPage === 'QR Scanner' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500'}`}>QR Scanner</a>
            <a href="#/buyproduce" className={`pb-1 ${currentPage === 'Buy Produce' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500'}`}>Buy Produce</a>
          </div>
        )}

        {/* Actions (Sign In and Dark/Light Toggle) */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="p-1 rounded-full text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-300">
            {isDarkMode ? 
              <Sun className="w-5 h-5" /> : 
              <Moon className="w-5 h-5" />
            }
          </button>
          
          <User className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-green-600 dark:hover:text-green-500" />
          
          {/* Sign In Link */}
          <a href="#/login" className="text-gray-600 dark:text-gray-300 font-medium hover:text-green-600 dark:hover:text-green-500 ml-4 border-l dark:border-gray-700 pl-4 transition-colors duration-300">
            Sign In
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
