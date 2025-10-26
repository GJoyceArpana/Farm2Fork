// src/components/Navbar.jsx
import React from 'react';
import { Leaf, User, Sun } from 'lucide-react'; 

const Navbar = ({ currentPage }) => {
  // Utility function to determine the active class
  const getLinkClass = (pageName) => {
    const baseClasses = "text-gray-600 hover:text-green-600 transition duration-150 pb-1";
    const activeClasses = "text-green-600 border-b-2 border-green-600";
    
    return `${baseClasses} ${currentPage === pageName ? activeClasses : ''}`;
  };

  return (
    <nav className="border-b border-gray-100 bg-white shadow-sm sticky top-0 z-10">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo and Tagline */}
        <a href="#/home" className="flex items-center space-x-2">
          <Leaf className="w-8 h-8 text-white bg-green-600 rounded-full p-1" />
          <div>
            <span className="text-xl font-bold text-green-600">AgriChain</span>
            <p className="text-xs text-gray-500">Farm to Fork</p>
          </div>
        </a>

        {/* Navigation Links - FIXED HREFs */}
        <div className="flex space-x-6 text-sm font-medium">
          <a href="#/home" className={getLinkClass('Home')}>Home</a>
          <a href="#/farmer" className={getLinkClass('Farmer Portal')}>Farmer Portal</a>
          <a href="#/qrscanner" className={getLinkClass('QR Scanner')}>QR Scanner</a>
          <a href="#/buyproduce" className={getLinkClass('Buy Produce')}>Buy Produce</a>
        </div>

        {/* Actions (Sign In and Dark/Light Toggle) */}
        <div className="flex items-center space-x-4">
          <Sun className="w-5 h-5 text-gray-600 cursor-pointer hover:text-green-600" />
          <User className="w-5 h-5 text-gray-600 cursor-pointer hover:text-green-600" />
          <button className="text-gray-600 font-medium hover:text-green-600 ml-4 border-l pl-4">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
