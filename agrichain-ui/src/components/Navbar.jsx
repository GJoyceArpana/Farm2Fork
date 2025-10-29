// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Leaf, User, Sun, Moon, LogOut } from 'lucide-react'; 

const Navbar = ({ currentPage, isDarkMode, toggleTheme }) => {
  const [user, setUser] = useState(null);

  // Load user data from localStorage on mount and whenever the page state changes
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error("Error parsing user data from localStorage:", e);
        localStorage.removeItem('user');
      }
    } else {
      setUser(null); // Ensure state is null if localStorage is empty
    }
  }, [currentPage]); // Re-run this effect when navigating between pages

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null); // Clear local state
    // Redirect to the home page after sign out
    history.pushState(null, '', '#/home');
  };

  // Conditional check to hide main navigation links on focused application pages
  const showNavLinks = !['Dashboard', 'Register Produce', 'Registration Success', 'Consumer Login', 'Produce Details'].includes(currentPage);
  const isLoggedIn = !!user;
  
  // Conditionally set the display elements based on login status
  const UserControls = () => {
    if (isLoggedIn) {
      return (
        <div className="flex items-center space-x-3">
          {/* User Name and Role */}
          <span className="text-gray-600 dark:text-gray-300 font-medium">{user.name}</span>
          <span className="text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">{user.role}</span>
          
          {/* Sign Out Button */}
          <button 
            onClick={handleSignOut}
            className="p-1 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors duration-300"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      );
    }
    
    // Default Sign In / User Icon when logged out
    return (
      <div className="flex items-center space-x-4">
        <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <a href="#/login" className="text-gray-600 dark:text-gray-300 font-medium hover:text-green-600 dark:hover:text-green-500 ml-4 border-l dark:border-gray-700 pl-4 transition-colors duration-300">
          Sign In
        </a>
      </div>
    );
  };

  return (
    <nav className="border-b border-gray-100 transition-colors duration-500 bg-white dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-10">
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

        {/* Actions (Dark/Light Toggle and User Info/Sign In) */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="p-1 rounded-full text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-300">
            {isDarkMode ? 
              <Sun className="w-5 h-5" /> : 
              <Moon className="w-5 h-5" />
            }
          </button>
          
          {/* User Controls */}
          <UserControls />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;