// src/pages/ProduceDetailsPage.jsx
import React from 'react';
import { 
  Archive, 
  MapPin, 
  CheckCircle, 
  Clock, 
  Truck, 
  Shield, 
  ArrowLeft,
  // === CRITICAL FIX: ALL MISSING ICONS ADDED ===
  Calendar, User, Leaf, Droplet, Info 
} from 'lucide-react';

// NOTE: Using a root path fallback to prevent build errors if assets are not placed in src
const produceImage = '/assets/tomato-mock.jpg'; 


// =========================================================================
// --- 1. Reusable Helper Components (Defined OUTSIDE the main component) ---
// =========================================================================

/**
 * Reusable component for a single step in the Supply Chain Journey.
 */
const SupplyChainStep = ({ title, sender, receiver, date, time, isVerified }) => (
    <div className="flex space-x-4 mb-6">
        <div className="flex flex-col items-center">
            {/* Step Icon */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isVerified ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                {title.includes('Harvest') ? <CheckCircle className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
            </div>
            {/* Vertical Connector Line (Hidden after the last step) */}
            <div className="h-12 w-0.5 bg-gray-200 dark:bg-gray-600"></div>
        </div>
        
        {/* Step Details */}
        <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                From: <span className="font-semibold">{sender}</span> → To: <span className="font-semibold">{receiver}</span>
            </p>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1 space-x-3">
                <p className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" /> {date}
                </p>
                <p className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {time}
                </p>
            </div>
            {/* Status Tags */}
            <div className="flex space-x-2 mt-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium dark:bg-green-900 dark:text-green-300">
                    completed
                </span>
                {isVerified && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-300">
                        verified
                    </span>
                )}
            </div>
        </div>
    </div>
);

// --- Farmer Info Card ---
const FarmerInfoCard = ({ name, location, isOrganic }) => (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-600 my-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-green-600" /> Farmer Information
        </h2>
        <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-700">
                RK
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

// --- Nutrition Info Card ---
const NutritionInfoCard = ({ calories, protein, carbs, fiber, vitamins }) => (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-600 my-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-600" /> Nutrition Information (Per 100g)
        </h2>
        
        <div className="grid grid-cols-4 text-center gap-4 border-b pb-4 dark:border-gray-600">
            <div>
                <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{calories}</p>
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

        <div className="mt-4">
            <p className="font-semibold text-gray-800 dark:text-white mb-2">Rich in Vitamins:</p>
            <div className="flex flex-wrap gap-2">
                {vitamins.map(vitamin => (
                    <span 
                        key={vitamin}
                        className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-300"
                    >
                        {vitamin}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

// --- Storage Conditions Card ---
const StorageConditionsCard = ({ condition }) => (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-600 my-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <Droplet className="w-5 h-5 mr-2 text-amber-600" /> Storage Conditions
        </h2>
        <p className="text-gray-700 dark:text-gray-300 font-medium">
            {condition}
        </p>
    </div>
);


// =========================================================================
// --- 2. Main Component: ProduceDetailsPage (Top-Level) -------------------
// =========================================================================
const ProduceDetailsPage = ({ batchId }) => { 
    // Mock Batch Data (using batchId if provided, otherwise default)
    const produceData = {
        name: "Organic Tomatoes",
        batchId: batchId || "BATCHB001",
        quantity: "100 kg",
        harvestDate: "1/15/2024",
        farmName: "Ramesh Kumar",
        farmId: "FARM001",
        farmLocation: "Bangalore Rural, Karnataka",
        status: "delivered",
        nutrition: {
            calories: 18,
            protein: "0.9g",
            carbs: "3.9g",
            fiber: "1.2g",
            vitamins: ["Vitamin C", "Vitamin K", "Folate"]
        },
        storage: "Store at 12-15°C, 85-90% humidity",
        transactions: [
            { title: "Harvest Stage", sender: "Ramesh Kumar Farm", receiver: "Fresh Distributors", date: "Jan 15, 2024", time: "01:30 PM", isVerified: true },
            { title: "Transport Stage", sender: "Fresh Distributors", receiver: "City Market", date: "Jan 16, 2024", time: "03:30 PM", isVerified: true },
        ]
    };

    const handleBack = () => {
        // Go back to the Buy Produce page
        window.location.hash = '#/buyproduce'; 
    };

    // --- Data Check Fallback ---
    if (!batchId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                <div className="text-center p-8 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Error: Batch ID Not Found</h1>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        Could not load traceability details for the selected product.
                    </p>
                    <button 
                        onClick={handleBack}
                        className="flex items-center justify-center mx-auto px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Catalog
                    </button>
                </div>
            </div>
        );
    }
    // ---------------------------------

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-500 pb-20">
            <main className="container pt-6 max-w-6xl mx-auto px-4"> 

                {/* Back Button */}
                <button 
                    onClick={handleBack}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition duration-150 mb-6 font-semibold"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Purchase
                </button>

                {/* --- Main Details Card (Product and Journey) --- */}
                <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-xl border border-gray-100 dark:border-gray-600">
                    
                    {/* Header: Title and Status */}
                    <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-gray-600">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                            <Archive className="w-6 h-6 mr-3 text-green-600" /> Produce Details
                        </h1>
                        <span className="text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 capitalize">
                            {produceData.status}
                        </span>
                    </div>

                    {/* Main Grid: Details vs Journey */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        
                        {/* Left Column: Product Info & Image */}
                        <div className="md:border-r md:pr-8 dark:border-gray-600">
                            <div className="w-full h-64 overflow-hidden rounded-lg mb-6 shadow-md border border-gray-200">
                                <img 
                                    src={produceImage} 
                                    alt={produceData.name} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => { // Added fallback for image path error
                                        e.target.onerror = null; 
                                        e.target.src = "https://placehold.co/600x400/D1E7DD/0F5132?text=Product+Image";
                                    }}
                                />
                            </div>

                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                                {produceData.name}
                            </h2>

                            {/* Metadata Grid */}
                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                                <p className="text-gray-500 dark:text-gray-400">Batch ID:</p>
                                <p className="font-medium text-gray-800 dark:text-white">{produceData.batchId}</p>

                                <p className="text-gray-500 dark:text-gray-400">Quantity:</p>
                                <p className="font-medium text-gray-800 dark:text-white">{produceData.quantity}</p>
                                
                                <p className="text-gray-500 dark:text-gray-400">Harvest Date:</p>
                                <p className="font-medium text-gray-800 dark:text-white">{produceData.harvestDate}</p>

                                <p className="text-gray-500 dark:text-gray-400">Farm:</p>
                                <p className="font-medium text-gray-800 dark:text-white">{produceData.farmName}</p>

                                <p className="text-gray-500 dark:text-gray-400">Farm ID:</p>
                                <p className="font-medium text-gray-800 dark:text-white">{produceData.farmId}</p>
                            </div>
                        </div>

                        {/* Right Column: Supply Chain Journey */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-red-500" /> Supply Chain Journey
                            </h2>

                            {/* Timeline Steps */}
                            <div className="mb-8 pl-1">
                                {produceData.transactions.map((tx, index) => (
                                    <div key={index}>
                                        <SupplyChainStep
                                            title={tx.title}
                                            sender={tx.sender}
                                            receiver={tx.receiver}
                                            date={tx.date}
                                            time={tx.time}
                                            isVerified={tx.isVerified}
                                        />
                                        {/* Connector line for all except the last step */}
                                        {index < produceData.transactions.length - 1 && (
                                             <div className="h-12 w-0.5 ml-3.5 bg-gray-200 dark:bg-gray-600"></div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Blockchain Verification Box */}
                            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-700">
                                <h3 className="text-lg font-bold text-green-700 dark:text-green-300 mb-2 flex items-center">
                                    <Shield className="w-5 h-5 mr-2" /> Blockchain Verified
                                </h3>
                                <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                                    This produce has been verified on the blockchain. All transactions are immutable and authentic.
                                </p>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    <span className="font-medium mr-4">Total Transactions: <span className="text-green-700 dark:text-green-300 font-bold">2</span></span>
                                    <span className="font-medium">Verification Score: <span className="text-green-700 dark:text-green-300 font-bold">100%</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Additional Info Cards --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <FarmerInfoCard 
                            name={produceData.farmName} 
                            location={produceData.farmLocation} 
                            isOrganic={true} 
                        />
                    </div>
                    <div className="lg:col-span-1">
                        <NutritionInfoCard 
                            calories={produceData.nutrition.calories}
                            protein={produceData.nutrition.protein}
                            carbs={produceData.nutrition.carbs}
                            fiber={produceData.nutrition.fiber}
                            vitamins={produceData.nutrition.vitamins}
                        />
                    </div>
                    <div className="lg:col-span-1">
                        <StorageConditionsCard 
                            condition={produceData.storage} 
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProduceDetailsPage;