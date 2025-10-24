// src/components/Navbar.jsx
import React from 'react';
import { Leaf, User, Sun } from 'lucide-react'; // Using lucide-react for icons

const Navbar = () => {
  return (
    <nav className="border-b border-gray-100">
      <div className="container flex items-center justify-between h-20">
        {/* Logo and Tagline */}
        <div className="flex items-center space-x-2">
          <Leaf className="w-8 h-8 text-white bg-green-600 rounded-full p-1" />
          <div>
            <span className="text-xl font-bold text-green-600">AgriChain</span>
            <p className="text-xs text-gray-500">Farm to Fork</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm font-medium">
          <a href="#" className="text-green-600 border-b-2 border-green-600 pb-1">Home</a>
          <a href="#" className="text-gray-600 hover:text-green-600">Farmer Portal</a>
          <a href="#" className="text-gray-600 hover:text-green-600">QR Scanner</a>
          <a href="#" className="text-gray-600 hover:text-green-600">Buy Produce</a>
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