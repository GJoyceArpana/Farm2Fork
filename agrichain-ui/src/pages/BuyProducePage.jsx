// src/pages/BuyProducePage.jsx
import React, { useState } from 'react';
import { ShoppingCart, Search, QrCode, User, Bell } from 'lucide-react';
import ProductCard from '../components/ProductCard';

// IMPORTANT: Placeholder imports for product images.
// You must place your actual image files here (e.g., 'tomato.jpg', 'carrots.jpg').
import tomatoImage from '../assets/tomato.png'; 
import carrotsImage from '../assets/carrots.png'; 

// Data for the category filter buttons
const categories = [
  { name: 'All', icon: 'All', count: 3, isActive: true },
  { name: 'Vegetables', icon: 'Vegetables', count: 2, isActive: false },
  { name: 'Fruits', icon: 'Fruits', count: 0, isActive: false },
  { name: 'Grains', icon: 'Grains', count: 1, isActive: false },
  { name: 'Organic Produce', icon: 'Organic Produce', count: 2, isActive: false },
];

// Mock data for featured products
const featuredProducts = [
  {
    imageSrc: tomatoImage, // Use the imported image
    title: 'Organic Tomatoes',
    rating: 4.8,
    reviews: 156,
    location: 'Bangalore Rural, Karnataka',
    price: '₹48/kg',
    isOrganic: true,
    isConventional: false,
  },
  {
    imageSrc: carrotsImage, // Use the imported image
    title: 'Premium Basmati Rice',
    rating: 4.9,
    reviews: 234,
    location: 'Haryana',
    price: '₹90/kg',
    isOrganic: false,
    isConventional: true,
  },
  // Add more products here
];

// --- Reusable Components for the Page (Simplified for clarity) ---

const CategoryButton = ({ name, icon, count, isActive, onClick }) => {
    // Note: Lucide icons can be used here for a clean look, or use SVGs.
    // Using simple placeholders for the icon text here.
    const iconMap = {
        'All': <div className='w-full h-full flex items-center justify-center'>&#9733;</div>, 
        'Vegetables': <div className='w-full h-full flex items-center justify-center'>&#129367;</div>, 
        'Fruits': <div className='w-full h-full flex items-center justify-center'>&#127822;</div>, 
        'Grains': <div className='w-full h-full flex items-center justify-center'>&#127835;</div>, 
        'Organic Produce': <div className='w-full h-full flex items-center justify-center'>&#127793;</div>
    };

    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center p-3 rounded-xl transition duration-200 w-24 h-24 ${
                isActive ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
        >
            <div className={`w-8 h-8 text-2xl mb-1 ${isActive ? 'text-green-400' : 'text-gray-500'}`}>
                {iconMap[name]}
            </div>
            <span className="text-xs font-medium">{name}</span>
            {isActive && <span className="text-xs font-semibold mt-1">{count}</span>}
            {!isActive && <span className="text-xs font-semibold mt-1 opacity-0">.</span>} {/* Placeholder for layout */}
        </button>
    );
};


// --- Main Page Component ---

const BuyProducePage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-20">

        {/* Top Header/Search Bar */}
        <div className="bg-green-600 py-4 shadow-md mb-8">
          <div className="container flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-white">AgriChain Buyer</span>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-white cursor-pointer hover:text-green-200" />
              <button className="text-white font-medium bg-green-700 px-3 py-1 rounded-md hover:bg-green-800">
                Sign In
              </button>
            </div>
          </div>

          <div className="container mt-4 flex space-x-4">
            <div className="relative flex-grow">
              <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search for Produce"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button className="bg-white p-2 rounded-lg hover:bg-gray-100 transition duration-150">
              <QrCode className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
        
        <div className="container">
          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <button className="flex items-center justify-center p-4 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition">
              <QrCode className="w-5 h-5 mr-2" /> Scan QR
            </button>
            <button className="flex items-center justify-center p-4 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition">
              <ShoppingCart className="w-5 h-5 mr-2" /> Buy Produce
            </button>
            <button className="flex items-center justify-center p-4 bg-white text-gray-800 font-semibold rounded-xl shadow-md hover:bg-gray-100 transition border border-gray-200">
              <User className="w-5 h-5 mr-2" /> Orders
            </button>
          </div>

          {/* Categories */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {categories.map(cat => (
              <CategoryButton
                key={cat.name}
                name={cat.name}
                icon={cat.icon}
                count={cat.count}
                isActive={activeCategory === cat.name}
                onClick={() => setActiveCategory(cat.name)}
              />
            ))}
          </div>
          
          <hr className="my-8 border-gray-200" />

          {/* Featured Products */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Featured Products</h2>
            <a href="#" className="text-green-600 font-medium hover:text-green-700">View All</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>

          {/* Special Offers Banner */}
          <div className="mt-12 p-6 bg-orange-100 rounded-xl flex justify-between items-center shadow-md">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Today's Special Offers</h3>
              <p className="text-gray-600">Up to 20% off on organic vegetables 🥕</p>
            </div>
            <button className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-orange-700 transition">
              Shop Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuyProducePage;
