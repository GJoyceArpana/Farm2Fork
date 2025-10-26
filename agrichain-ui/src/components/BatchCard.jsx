// src/components/BatchCard.jsx
import React from 'react';
import { Archive, Scale, Calendar, QrCode, TrendingUp, MapPin } from 'lucide-react';

const SupplyChainStep = ({ label, isComplete }) => (
    <div className="text-center text-xs">
        <div className={`w-3 h-3 mx-auto rounded-full ${isComplete ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        <p className="mt-1 text-gray-600 dark:text-gray-400">{label}</p>
    </div>
);

const BatchCard = ({ batch }) => {
    // Determine which steps are complete based on progress percentage
    const progress = batch.progress || 25; 
    const steps = [
        { label: "Farm", minProgress: 0 },
        { label: "Transport", minProgress: 25 },
        { label: "Retail", minProgress: 75 },
        { label: "Consumer", minProgress: 100 },
    ];

    const handleTrackProgress = () => {
        // In a real app, this would route to a detailed tracking page,
        // perhaps using the batch.id in the URL: #/track?id=BATCHID
        console.log(`Tracking progress for Batch ID: ${batch.id}`);
        alert(`Simulating redirection to track Batch ID: ${batch.id}`);
    };
    
    const handleViewQr = () => {
        console.log(`Viewing QR Code for Batch ID: ${batch.id}`);
        alert(`Simulating display of QR Code for Batch ID: ${batch.id}`);
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600 mb-6">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{batch.name}</h3>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        registered
                    </span>
                </div>
                
                <div className="flex space-x-3">
                    <button 
                        onClick={handleViewQr}
                        className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 transition duration-150"
                    >
                        View QR Code
                    </button>
                    <button 
                        onClick={handleTrackProgress}
                        className="text-sm font-medium text-white bg-green-600 px-3 py-1 rounded-lg hover:bg-green-700 transition duration-150"
                    >
                        Track Progress
                    </button>
                </div>
            </div>
            
            {/* Metadata */}
            <div className="grid grid-cols-3 text-sm text-gray-500 dark:text-gray-400 mb-6 border-b pb-4 dark:border-gray-600">
                <p className="flex items-center space-x-1">
                    <Scale className="w-4 h-4" /> <span>Quantity: {batch.quantity}</span>
                </p>
                <p className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" /> <span>Harvested: {batch.harvestDate}</span>
                </p>
                <p className="flex items-center space-x-1">
                    <Archive className="w-4 h-4" /> <span>ID: {batch.id}</span>
                </p>
            </div>

            {/* Supply Chain Progress Bar */}
            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Supply Chain Progress
            </h4>
            <div className="relative pt-1">
                {/* Progress Bar Background */}
                <div className="flex mb-2 items-center">
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-600">
                        <div 
                            className="h-1.5 rounded-full bg-green-500 transition-all duration-500" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
                
                {/* Progress Steps (Dots and Labels) */}
                <div className="flex justify-between -mt-3">
                    {steps.map((step, index) => (
                        <SupplyChainStep 
                            key={index}
                            label={step.label}
                            isComplete={progress >= step.minProgress}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default BatchCard;
