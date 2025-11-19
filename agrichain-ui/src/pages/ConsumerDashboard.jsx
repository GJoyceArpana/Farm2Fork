// src/pages/ConsumerDashboard.jsx
import React, { useState } from 'react';
import { Search, ArrowLeft, Star, MapPin } from 'lucide-react';

// NOTE: Placeholder image import for a recent order (e.g., tomatoes)
// Assuming you have a placeholder image or configured image resolution correctly
import tomatoImage from '../assets/tomato.png'; 

// Mock Data (based directly on the screenshots)
const consumerName = "John Consumer";
const dashboardStats = {
    activeOrders: 1,
    totalOrders: 1,
    totalSpent: 48,
    avgRating: 4.2
};
const recentOrders = [
    {
        name: "Organic Tomatoes",
        quantity: "1 kg",
        price: "₹48",
        date: "Nov 11, 2025",
        status: "Confirmed",
        imageSrc: tomatoImage, 
    }
];

const favoriteFarmers = [
    { name: 'Ramesh Kumar', location: 'Bangalore Rural', orders: 12, rating: 4.8 },
    { name: 'Sunita Devi', location: 'Mysore', orders: 8, rating: 4.6 },
    { name: 'Vikram Singh', location: 'Haryana', orders: 5, rating: 4.9 },
];

const nutritionData = [
    { name: 'Vitamin C', percentage: 85, color: 'bg-orange-500' },
    { name: 'Fiber', percentage: 72, color: 'bg-green-500' },
    { name: 'Protein', percentage: 60, color: 'bg-blue-500' },
    { name: 'Iron', percentage: 45, color: 'bg-red-500' },
];


// --- Sub-Components for Dashboard Content ---

/**
 * Renders a single Recent Order Item as seen in the Orders tab screenshot.
 */
const RecentOrderItem = ({ name, quantity, price, date, status, imageSrc }) => (
    <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
        <div className="flex items-center space-x-4">
            {/* Placeholder image for the product */}
            <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 bg-gray-100 flex-shrink-0">
                <img 
                    src={imageSrc} 
                    alt={name} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "https://placehold.co/64x64/D1E7DD/0F5132?text=Prod";
                    }}
                />
            </div>
            <div>
                <p className="text-gray-800 dark:text-white font-semibold">{name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{quantity} • {price}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Ordered on {date}</p>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                status === 'Confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300' : 
                'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
            }`}>
                {status}
            </span>
            <button className="text-green-600 text-sm font-medium mt-2 hover:text-green-700 transition">
                View Order
            </button>
            <button className="text-blue-600 text-sm font-medium mt-1 hover:text-blue-700 transition">
                Reorder
            </button>
        </div>
    </div>
);

/**
 * Renders a single statistic block in the dashboard header.
 */
const StatBlock = ({ title, value, unit }) => (
    <div className="flex flex-col items-center justify-center p-4 bg-green-700 dark:bg-green-900 rounded-lg shadow-lg min-h-[100px]">
        <div className={`text-2xl font-bold text-white`}>
            {value}
            {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
        </div>
        <div className="text-sm font-medium text-green-200">{title}</div>
    </div>
);

/**
 * Renders a single Farmer Card for the Farmers tab.
 */
const FarmerCard = ({ name, location, orders, rating }) => (
    <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
        <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-green-200 mr-3 flex items-center justify-center text-lg">🧑‍🌾</div>
            <div className='flex justify-between w-full items-center'>
                <h4 className="font-bold text-gray-800 dark:text-white">{name}</h4>
                <span className='text-red-500'>❤</span>
            </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center">
            <MapPin className='w-3 h-3 mr-1' /> {location}
        </p>
        <div className="flex justify-between text-sm pt-2 border-t border-gray-100 dark:border-gray-600">
            <p className="text-gray-600 dark:text-gray-300">Orders: <span className="font-semibold">{orders}</span></p>
            <p className="flex items-center text-gray-600 dark:text-gray-300">Rating: <Star className='w-4 h-4 text-yellow-500 ml-1 mr-1' fill='currentColor'/> <span className="font-semibold">{rating}</span></p>
        </div>
    </div>
);


// --- Main Component ---

const ConsumerDashboard = () => {
    // Set the initial active tab to 'Orders' as seen in the first screenshot.
    const [activeTab, setActiveTab] = useState('Orders'); 

    const handleBack = () => {
        // Navigates back to the Buy Produce page, matching the screenshot behavior
        window.location.hash = '#/buyproduce';
    };
    
    // Renders content based on the active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Orders':
                return (
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Recent Orders</h3>
                        {recentOrders.map((order, index) => (
                            <RecentOrderItem key={index} {...order} />
                        ))}
                    </div>
                );
            case 'Farmers':
                return (
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Favorite Farmers</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {favoriteFarmers.map((farmer, index) => (
                                <FarmerCard key={index} {...farmer} />
                            ))}
                        </div>
                    </div>
                );
            case 'Insights':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Nutrition Insights Panel (Left Side) */}
                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-600">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Nutrition Insights</h3>
                            {nutritionData.map((item) => (
                                <div key={item.name} className="mb-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600 dark:text-gray-300 font-medium">{item.name}</span>
                                        <span className="text-gray-600 dark:text-gray-300 font-medium">{item.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600">
                                        <div 
                                            className={`h-2 rounded-full ${item.color}`} 
                                            style={{ width: `${item.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">Based on your recent purchases this month</p>
                        </div>
                        
                        {/* Monthly Summary Panel (Right Side) */}
                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-600 flex flex-col items-center justify-center text-center">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Monthly Summary</h3>
                            <div className="text-5xl font-extrabold text-green-600 mb-2">₹{dashboardStats.totalSpent}</div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">Total Spent</p>
                            
                            <div className="flex justify-between w-full max-w-xs text-center">
                                <div>
                                    <p className="text-2xl font-bold text-gray-800 dark:text-white">1</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Items Purchased</p>
                                </div>
                                <div className="border-l border-gray-200 dark:border-gray-600 mx-4"></div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{dashboardStats.avgRating}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Avg Rating Given</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'History':
            default:
                return <div className="p-4 text-gray-500 dark:text-gray-400">Order History coming soon...</div>;
        }
    };

    // Helper function to apply active/inactive styles to tabs
    const tabClasses = (tab) => 
        `px-6 py-3 font-semibold transition duration-200 cursor-pointer text-sm ${
            activeTab === tab 
                ? 'bg-white dark:bg-gray-800 text-green-600 border-b-2 border-green-600 shadow-t dark:shadow-none' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`;


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
            {/* Custom Dashboard Header Section (Matches Green Bar) */}
            <header className="bg-green-600 dark:bg-green-700 text-white shadow-md">
                <div className="container max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Back button */}
                        <button onClick={handleBack} className="text-white hover:text-green-200 transition flex items-center">
                            <ArrowLeft className="w-5 h-5 mr-2" /> <span className="text-sm">Back</span>
                        </button>
                        <h1 className="text-xl font-bold">My Dashboard</h1>
                        <div className="w-12"></div> {/* Spacer to balance Back button */}
                    </div>
                    
                    {/* Profile Icon and Welcome Text */}
                    <div className="flex flex-col items-center py-4">
                        <div className="w-16 h-16 rounded-full bg-green-200 mb-3 flex items-center justify-center text-3xl text-green-800">🧑</div>
                        <h2 className="text-2xl font-semibold mb-6">Welcome back, {consumerName}!</h2>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-4">
                        <StatBlock title="Active Orders" value={dashboardStats.activeOrders} />
                        <StatBlock title="Total Orders" value={dashboardStats.totalOrders} />
                        <StatBlock title="Total Spent" value={`₹${dashboardStats.totalSpent}`} />
                        <StatBlock title="Avg Rating Given" value={dashboardStats.avgRating} />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container max-w-6xl mx-auto px-4 pt-8 pb-20">
                {/* Search Bar */}
                <form className="relative mb-6">
                    <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search orders, farmers, or products..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                </form>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 bg-gray-100 dark:bg-gray-800 rounded-t-xl overflow-hidden">
                    {['Orders', 'History', 'Farmers', 'Insights'].map(tab => (
                        <div key={tab} className={tabClasses(tab)} onClick={() => setActiveTab(tab)}>
                            {tab}
                        </div>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    {renderTabContent()}
                </div>
            </main>
        </div>
    );
};

export default ConsumerDashboard;