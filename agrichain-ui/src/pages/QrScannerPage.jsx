// src/pages/QrScannerPage.jsx
import React, { useState } from 'react';
import { QrCode, Search, CheckCircle, Smartphone, Info } from 'lucide-react';
// import Navbar from '../components/Navbar'; 
// Note: Navbar is rendered globally in App.jsx

// --- Reusable Components for the Page ---

/**
 * Component for the two information cards at the bottom (How to Find QR Codes, Why Trace).
 * @param {object} props
 * @param {React.Component} props.icon - Lucide icon component.
 * @param {string} props.title - Card title.
 * @param {string} props.description - Card description.
 */
const InfoCard = ({ icon: Icon, title, description, iconColor = 'text-green-600' }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex space-x-4">
    <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-green-50 ${iconColor}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

// We will rename the TracingInfoCard to InfoCard as the original InfoCard was used for the bottom features
// The component is now just QrScannerPage, and we will move the state and handler inside it.

// --- Main Page Component ---

const QrScannerPage = () => {
  const [batchId, setBatchId] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for batch ID: ${batchId}`);
    // In a real application, you would perform an API call here
  };

  const sampleBatches = [
    { id: 'BATCH001', name: 'Organic Tomatoes' },
    { id: 'BATCH002', name: 'Fresh Spinach' },
    { id: 'BATCH003', name: 'Premium Basmati Rice' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar is rendered in App.jsx */}

      <main className="container mx-auto px-4 flex flex-col items-center justify-start pt-8 pb-20">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Consumer Portal</h1>
          <p className="text-lg text-gray-600">
            Trace your food's journey from farm to fork. Scan QR codes or search batch IDs to
            verify authenticity and view complete supply chain history.
          </p>
        </div>

        {/* Tracing Section: Scanning and Manual Search */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 max-w-5xl">
          
          {/* Main Card Wrapper */}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-xl border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center mb-6">
              <QrCode className="w-6 h-6 mr-2 text-green-600" /> Track Your Produce
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: QR Scan Area */}
              <div className="flex flex-col justify-between">
                <div className="border-2 border-dashed border-blue-300 p-8 rounded-lg text-center bg-blue-50/50 relative">
                  <Smartphone className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                  <p className="font-semibold text-blue-600 mb-1">Scan QR Code</p>
                  <p className="text-sm text-gray-500">
                    Point your camera at the QR code on the produce packaging.
                  </p>
                  {/* Visual marker for the scanning area */}
                  <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                    <div className="border-4 border-dashed border-blue-500 rounded-lg absolute inset-4"></div>
                  </div>
                </div>

                {/* Start Scanner Button */}
                <button
                  className="w-full btn-primary bg-blue-600 hover:bg-blue-700 mt-6 py-3 text-lg transition duration-300 flex items-center justify-center"
                  onClick={() => console.log('Starting QR Scanner...')}
                >
                  <Smartphone className="w-6 h-6 mr-2" /> Start QR Scanner
                </button>
              </div>
              
              {/* Right Column: Manual Search */}
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <Search className="w-5 h-5 mr-2" /> Manual Search
                </h3>
                <form onSubmit={handleSearch} className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Enter Batch ID or QR Code (e.g., BATCH001)"
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-green-500 focus:border-green-500"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-150 flex items-center justify-center"
                  >
                    <Search className="w-5 h-5 mr-2" /> Search Batch
                  </button>
                </form>
                
                {/* Sample Batches */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 flex-grow">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Sample Batch IDs to try:</h4>
                  <ul className="text-sm space-y-1">
                    {sampleBatches.map(batch => (
                      <li key={batch.id}>
                        <a href={`#qrscanner?batch=${batch.id}`} className="text-blue-600 hover:text-blue-800 transition duration-150 font-semibold">
                          {batch.id} - {batch.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Cards Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <InfoCard
            icon={QrCode}
            title="How to Find QR Codes"
            description="Look for QR codes on produce packaging, labels, or stickers. They're usually placed near the product name or nutrition information."
            iconColor="text-blue-600"
          />
          <InfoCard
            icon={CheckCircle}
            title="Why Trace Your Food?"
            description="Food traceability helps ensure safety, authenticity, and sustainability. Know exactly where your food comes from and how it was handled."
            iconColor="text-green-600"
          />
        </div>
      </main>
    </div>
  );
};

export default QrScannerPage;
