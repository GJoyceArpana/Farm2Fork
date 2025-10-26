// src/pages/ProduceDetailsPage.jsx
import React from 'react';
import { 
  Archive, 
  MapPin, 
  CheckCircle, 
  Clock, 
  Truck, 
  Shield, 
  ArrowLeft 
} from 'lucide-react';
// IMPORTANT: Placeholder import. Ensure you have 'tomato-mock.jpg' in src/assets/
import produceImage from '../assets/tomato-mock.jpg'; 

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
                From: **{sender}** → To: **{receiver}**
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
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                    completed
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
                    verified
                </span>
            </div>
        </div>
    </div>
);

const ProduceDetailsPage = () => {
    // Mock Batch Data
    const produceData = {
        name: "Organic Tomatoes",
        batchId: "BATCHB001",
        quantity: "100 kg",
        harvestDate: "1/15/2024",
        farmName: "Ramesh Kumar",
        farmId: "FARM001",
        status: "delivered",
        transactions: [
            { title: "Harvest Stage", sender: "Ramesh Kumar", receiver: "Fresh Distributors", date: "Jan 15, 2024", time: "01:30 PM" },
            { title: "Transport Stage", sender: "Fresh Distributors", receiver: "Loc City Market", date: "Jan 16, 2024", time: "03:30 PM" },
        ]
    };

    const handleBack = () => {
        // Go back to the QR scanner page for new search
        history.pushState(null, '', '#/qrscanner'); 
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-500 pb-20">
            <main className="container pt-6 max-w-6xl">

                {/* Back Button */}
                <button 
                  onClick={handleBack}
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition duration-150 mb-6"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" /> Back to Scanner
                </button>

                {/* Main Content Card */}
                <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-xl border border-gray-100 dark:border-gray-600">
                    
                    {/* Header: Title and Status */}
                    <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-gray-600">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                            <Archive className="w-6 h-6 mr-3" /> Produce Details
                        </h1>
                        <span className="text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                            {produceData.status}
                        </span>
                    </div>

                    {/* Main Grid: Details vs Journey */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        
                        {/* Left Column: Product Info & Image */}
                        <div className="border-r pr-8 dark:border-gray-600">
                            <div className="w-full h-64 overflow-hidden rounded-lg mb-6 shadow-md">
                                <img 
                                    src={produceImage} 
                                    alt={produceData.name} 
                                    className="w-full h-full object-cover"
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
                                <MapPin className="w-5 h-5 mr-2" /> Supply Chain Journey
                            </h2>

                            {/* Timeline Steps */}
                            <div className="mb-8 pl-1">
                                {produceData.transactions.map((tx, index) => (
                                    <SupplyChainStep
                                        key={index}
                                        title={tx.title}
                                        sender={tx.sender}
                                        receiver={tx.receiver}
                                        date={tx.date}
                                        time={tx.time}
                                        isVerified={true} // Mock verified status
                                    />
                                ))}
                            </div>

                            {/* Blockchain Verification Box */}
                            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-700">
                                <h3 className="text-lg font-bold text-green-700 dark:text-green-300 mb-2 flex items-center">
                                    <Shield className="w-5 h-5 mr-2" /> Blockchain Verified
                                </h3>
                                <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                                    This produce has been verified on the blockchain. All transactions are immutable and authentic. You can trust the complete supply chain history.
                                </p>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    <span className="font-medium mr-4">Total Transactions: <span className="text-green-700 dark:text-green-300 font-bold">2</span></span>
                                    <span className="font-medium">Verification Score: <span className="text-green-700 dark:text-green-300 font-bold">100%</span></span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ProduceDetailsPage;