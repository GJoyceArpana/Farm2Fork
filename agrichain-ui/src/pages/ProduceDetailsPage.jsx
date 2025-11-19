// src/pages/ProduceDetailsPage.jsx
import React, { useState } from 'react';
import { 
  Archive, MapPin, CheckCircle, Truck, ArrowLeft,
  Calendar, User, Leaf, Droplet, Info, Thermometer, Cloud, Heart, Share2, Star, Minus, Plus, ShoppingCart, 
  Shield 
} from 'lucide-react';

// NOTE: Using a root path fallback to prevent build errors if assets are not placed in src
const produceImage = '/assets/tomato-mock.jpg'; 

// =========================================================================
// --- 1. Reusable Helper Components ---
// =========================================================================

/**
 * Component for the Top Product Purchase/Listing Card.
 * Now includes onBuyNow handler to pass selected quantity to parent.
 */
const ProducePurchaseCard = ({ produceData, onBack, onBuyNow }) => {
    // Hardcoding initial quantity to 3 to match the checkout image for demonstration
    const [quantity, setQuantity] = useState(3); 
    const pricePerKg = 48; 
    const totalPrice = (pricePerKg * quantity).toFixed(0);

    const handleQuantityChange = (change) => {
        setQuantity(prev => Math.max(1, prev + change));
    };

    const handleBuyNowClick = () => {
        // 1. Calculate and package the specific order data
        const orderData = {
            productName: produceData.name,
            quantity: quantity,
            pricePerKg: pricePerKg,
            subtotal: pricePerKg * quantity,
            deliveryFee: 50, // Hardcoded fee for simulation
            totalAmount: (pricePerKg * quantity) + 50,
        };
        // 2. Call the function passed by the parent to change the view/route
        onBuyNow(orderData);
    };

    return (
        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-xl border border-gray-100 dark:border-gray-600 mb-8">
            {/* Top Bar: Back, Like, Share */}
            <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-gray-600">
                <button 
                    onClick={onBack}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition duration-150 font-semibold"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </button>
                <div className="flex space-x-4 text-gray-600 dark:text-gray-400">
                    <Heart className="w-5 h-5 cursor-pointer hover:text-red-500" />
                    <Share2 className="w-5 h-5 cursor-pointer hover:text-blue-500" />
                </div>
            </div>

            {/* Product Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Image and Blockchain Tag */}
                <div className="flex flex-col">
                    <div className="w-full h-80 overflow-hidden rounded-lg shadow-lg border border-gray-200 mb-4">
                        <img 
                            src={produceImage} 
                            alt={produceData.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => { 
                                e.target.onerror = null; 
                                e.target.src = "https://placehold.co/600x400/D1E7DD/0F5132?text=Product+Image";
                            }}
                        />
                    </div>
                    {/* Blockchain Verification Badge */}
                    <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg border border-green-200 dark:border-green-700 text-sm">
                        <p className="font-semibold text-green-700 dark:text-green-300 flex items-center mb-1">
                            <Shield className="w-4 h-4 mr-2" /> Blockchain Verified Produce
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Complete blockchain traceability from farm to your table
                        </p>
                    </div>
                </div>

                {/* Right Column: Title, Metadata, Price, and Actions */}
                <div>
                    <div className="flex justify-between items-start">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                            {produceData.name}
                        </h2>
                        <span className="text-xs font-bold px-2 py-1 rounded bg-green-200 text-green-800">A+</span>
                    </div>

                    {/* Ratings and Organic Badge */}
                    <div className="flex items-center mb-4 space-x-3">
                        <p className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" /> 4.8 (156 reviews)
                        </p>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 flex items-center">
                            <Leaf className="w-3 h-3 mr-1" /> Organic
                        </span>
                    </div>

                    {/* Metadata List */}
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-6">
                        <p className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-red-500" /> From {produceData.farmLocation}</p>
                        <p className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-gray-500" /> Harvested on {produceData.harvestDate}</p>
                        <p className="flex items-center"><Archive className="w-4 h-4 mr-2 text-gray-500" /> {produceData.quantity} available</p>
                    </div>

                    <p className="text-3xl font-extrabold text-green-600 dark:text-green-400 mb-6">
                        ₹{pricePerKg}/kg
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center mb-6">
                        <span className="text-gray-600 dark:text-gray-400 mr-4">Quantity (kg)</span>
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                            <button 
                                onClick={() => handleQuantityChange(-1)} 
                                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-l-lg"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center font-semibold text-lg text-gray-800 dark:text-white">{quantity}</span>
                            <button 
                                onClick={() => handleQuantityChange(1)} 
                                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-r-lg"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Total Price: <span className="font-bold text-lg text-green-600 dark:text-green-400">₹{totalPrice}</span>
                    </p>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button 
                            onClick={handleBuyNowClick}
                            className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
                        >
                            Buy Now
                        </button>
                        <button 
                            className="w-full py-3 bg-white border border-green-600 text-green-600 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition flex items-center justify-center"
                        >
                            <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Other components (SupplyChainStep, FarmerInfoCard, etc.) remain unchanged ---

const SupplyChainStep = ({ title, temp, humidity, sender, receiver, isVerified }) => (
    <div className="flex space-x-4 mb-4">
        <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isVerified ? 'bg-green-100 text-green-700 border border-green-500' : 'bg-gray-300 text-gray-700'}`}>
                {title.includes('Harvest') ? <CheckCircle className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
            </div>
        </div>
        <div className="flex-1 border border-gray-200 dark:border-gray-600 p-4 rounded-lg bg-white dark:bg-gray-700 shadow-sm flex justify-between items-center">
            <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{sender}</span> → <span className="font-medium">{receiver}</span>
                </p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1 space-x-4">
                    <p className="flex items-center">
                        <Thermometer className="w-3 h-3 mr-1" /> {temp}
                    </p>
                    <p className="flex items-center">
                        <Cloud className="w-3 h-3 mr-1" /> {humidity}
                    </p>
                </div>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium dark:bg-green-900 dark:text-green-300">
                completed
            </span>
        </div>
    </div>
);

const FarmerInfoCard = ({ name, location, isOrganic }) => (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-600 my-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Farmer Information
        </h2>
        <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-700">
                 <div className="absolute bottom-0 right-0 p-0.5 bg-white rounded-full">
                    <MapPin className="w-3 h-3 text-green-600" />
                 </div>
                <User className="w-6 h-6" /> 
            </div>
            <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">{name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>
                {isOrganic && (
                    <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                        <Leaf className="w-3 h-3 mr-1" /> Verified Organic Farmer
                    </div>
                )}
            </div>
        </div>
    </div>
);

const NutritionInfoCard = ({ calories, protein, carbs, fiber, vitamins }) => (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-600 my-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
             Nutrition Information
        </h2>
        
        <div className="grid grid-cols-4 text-center gap-4">
            <div>
                <p className="text-3xl font-extrabold text-gray-800 dark:text-white">{calories}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Calories</p>
            </div>
            <div>
                <p className="text-3xl font-extrabold text-gray-800 dark:text-white">{protein}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Protein</p>
            </div>
            <div>
                <p className="text-3xl font-extrabold text-gray-800 dark:text-white">{carbs}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Carbs</p>
            </div>
            <div>
                <p className="text-3xl font-extrabold text-gray-800 dark:text-white">{fiber}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fiber</p>
            </div>
        </div>

        <div className="mt-6 pt-4 border-t dark:border-gray-600"> 
            <p className="font-semibold text-gray-800 dark:text-white mb-2">Rich in Vitamins:</p>
            <div className="flex flex-wrap gap-2">
                {vitamins.map(vitamin => (
                    <span 
                        key={vitamin}
                        className="text-xs px-3 py-1 rounded bg-gray-200 text-gray-800 font-medium dark:bg-gray-600 dark:text-white"
                    >
                        {vitamin}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

const StorageConditionsCard = ({ condition }) => (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-600 my-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
             Storage Conditions
        </h2>
        <p className="text-gray-700 dark:text-gray-300 font-medium">
            {condition}
        </p>
    </div>
);

// =========================================================================
// --- 2. Main Component: ProduceDetailsPage (Top-Level) -------------------
// =========================================================================
const ProduceDetailsPage = ({ batchId, onBuyNow, onBack }) => { 
    
    // Mock Batch Data
    const produceData = {
        name: "Organic Tomatoes",
        batchId: batchId || "BATCHB001",
        quantity: "100 kg", // Available quantity
        harvestDate: "January 15, 2024",
        farmName: "Ramesh Kumar",
        farmId: "FARM001",
        farmLocation: "Bangalore Rural, Karnataka",
        status: "Delivered",
        nutrition: {
            calories: 18,
            protein: "0.9g",
            carbs: "3.9g",
            fiber: "1.2g",
            vitamins: ["Vitamin C", "Vitamin K", "Folate"]
        },
        storage: "Store at 12-15°C, 85-90% humidity",
        transactions: [
            { title: "Harvest", sender: "Ramesh Kumar Farm", receiver: "Fresh Distributors", temp: "25°C", humidity: "65%", isVerified: true },
            { title: "Transport", sender: "Fresh Distributors", receiver: "City Market", temp: "15°C", humidity: "85%", isVerified: true },
        ]
    };

    if (!batchId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                <div className="text-center p-8 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Error: Batch ID Not Found</h1>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        Could not load traceability details for the selected product.
                    </p>
                    <button 
                        onClick={onBack}
                        className="flex items-center justify-center mx-auto px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Catalog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-500 pb-20">
            <main className="container pt-6 max-w-6xl mx-auto px-4"> 
                {/* 1. Purchase Card */}
                <ProducePurchaseCard 
                    produceData={produceData} 
                    onBack={onBack} 
                    onBuyNow={onBuyNow} // Pass the handler to the Purchase Card
                />

                {/* 2. Traceability and Info Sections */}
                <div className="max-w-3xl mx-auto">
                    {/* Supply Chain Journey Card */}
                    <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-xl border border-gray-100 dark:border-gray-600 mb-6">
                        <div className="mb-6">
                            <h1 className="text-xl font-bold text-gray-800 dark:text-white flex items-center mb-4">
                                <Archive className="w-5 h-5 mr-2 text-green-600" /> Supply Chain Journey
                            </h1>
                            <div className="mb-4">
                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">
                                    <span>Farm</span>
                                    <span>Transport</span>
                                    <span>Market</span>
                                    <span>You</span>
                                </div>
                                <div className="h-1 bg-black dark:bg-white rounded-full"></div>
                            </div>
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Status: <span className="font-bold">{produceData.status}</span>
                            </p>
                        </div>

                        <div className="pl-1">
                            {produceData.transactions.map((tx, index) => (
                                <div key={index}>
                                    <SupplyChainStep
                                        title={tx.title}
                                        sender={tx.sender}
                                        receiver={tx.receiver}
                                        temp={tx.temp}
                                        humidity={tx.humidity}
                                        isVerified={tx.isVerified}
                                    />
                                    {index < produceData.transactions.length - 1 && (
                                        <div className="h-8 w-0.5 ml-3.5 bg-gray-200 dark:bg-gray-600"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Info Cards Stacked */}
                    <FarmerInfoCard name={produceData.farmName} location={produceData.farmLocation} isOrganic={true} />
                    <NutritionInfoCard {...produceData.nutrition} />
                    <StorageConditionsCard condition={produceData.storage} />
                </div>
            </main>
        </div>
    );
};

export default ProduceDetailsPage;