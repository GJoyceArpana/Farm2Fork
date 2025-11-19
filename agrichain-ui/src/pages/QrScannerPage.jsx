// src/pages/QrScannerPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Search, CheckCircle, Smartphone, Info, ArrowLeft } from 'lucide-react';

// --- Reusable Components for the Page ---

/**
 * Component for the two information cards at the bottom (How to Find QR Codes, Why Trace).
 */
const InfoCard = ({ icon: Icon, title, description, iconColor = 'text-green-600' }) => (
  <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-600 flex space-x-4 transition-colors duration-500">
    <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-green-50 ${iconColor} dark:bg-gray-800`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </div>
);

// --- Main Page Component ---

const QrScannerPage = () => {
  const [batchId, setBatchId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null); // State for camera errors
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Stop camera feed when component unmounts or scanning stops
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);
  
  // Logic to handle starting the camera feed
  useEffect(() => {
      if (isScanning) {
          setError(null); // Clear previous errors
          startCamera();
          // Simulate successful scan and redirection after 3 seconds
          const scanTimer = setTimeout(() => {
              stopCamera();
              history.pushState(null, '', '#/details');
          }, 3000);
          return () => {
            clearTimeout(scanTimer);
            stopCamera(); // Ensure camera stops if component re-renders quickly
          };
      } else {
          stopCamera();
      }
  }, [isScanning]);

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        // FIX: Use custom UI feedback instead of alert()
        setError("Camera access denied or device not found. Please check permissions.");
        setIsScanning(false);
      }
    } else {
        // FIX: Use custom UI feedback instead of alert()
        setError("Your browser does not support camera access.");
        setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };


  const handleSearch = (e) => {
    e.preventDefault();
    if (batchId) {
        console.log(`Searching for batch ID: ${batchId}`);
        // Simulate successful search and redirection
        history.pushState(null, '', '#/details');
    }
  };

  const sampleBatches = [
    { id: 'BATCH001', name: 'Organic Tomatoes' },
    { id: 'BATCH002', name: 'Fresh Spinach' },
    { id: 'BATCH003', name: 'Premium Basmati Rice' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
      <main className="container mx-auto px-4 flex flex-col items-center justify-start pt-8 pb-20">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          {isScanning && (
            <button 
              onClick={() => setIsScanning(false)}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-500 transition duration-150 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Stop Scanner
            </button>
          )}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Consumer Portal</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Trace your food's journey from farm to fork. Scan QR codes or search batch IDs to
            verify authenticity and view complete supply chain history.
          </p>
        </div>

        {/* --- Scanning View --- */}
        {isScanning && (
          <div className="w-full max-w-lg bg-black dark:bg-gray-900 rounded-xl shadow-2xl p-2 relative mb-16">
            <h2 className="text-xl font-semibold text-white text-center mb-4">
              Scanning for QR Code...
            </h2>
            <div className="w-full h-96 bg-gray-800 rounded-lg relative overflow-hidden">
                <video ref={videoRef} className="w-full h-full object-cover"></video>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-3/4 h-3/4 border-4 border-green-400 border-dashed animate-pulse"></div>
                </div>
            </div>
            <p className="text-center text-gray-400 mt-4 text-sm">
              Simulating scan and redirect in 3 seconds...
            </p>
          </div>
        )}
        
        {/* Error Display */}
        {error && !isScanning && (
            <div className="w-full max-w-5xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center justify-center font-medium">
                <Info className="w-5 h-5 mr-2" /> {error}
            </div>
        )}

        {/* --- Search/Input View --- */}
        {!isScanning && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 max-w-5xl">
            
            {/* Main Card Wrapper */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-700 p-8 rounded-xl shadow-xl border border-gray-100 dark:border-gray-600 transition-colors duration-500">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-white flex items-center mb-6">
                <QrCode className="w-6 h-6 mr-2 text-green-600" /> Track Your Produce
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Column: QR Scan Area (Static Placeholder) */}
                <div className="flex flex-col justify-between">
                  <div className="border-2 border-dashed border-blue-300 dark:border-blue-500 p-8 rounded-lg text-center bg-blue-50/50 dark:bg-blue-900/30 relative flex-grow flex flex-col justify-center">
                    <Smartphone className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                    <p className="font-semibold text-blue-600 dark:text-blue-300 mb-1">Scan QR Code</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Point your camera at the QR code on the produce packaging.
                    </p>
                  </div>

                  {/* Start Scanner Button */}
                  <button
                    onClick={() => setIsScanning(true)}
                    className="w-full btn-primary bg-blue-600 hover:bg-blue-700 mt-6 py-3 text-lg transition duration-300 flex items-center justify-center"
                  >
                    <Smartphone className="w-6 h-6 mr-2" /> Start QR Scanner
                  </button>
                </div>
                
                {/* Right Column: Manual Search */}
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4 flex items-center">
                    <Search className="w-5 h-5 mr-2" /> Manual Search
                  </h3>
                  <form onSubmit={handleSearch} className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Enter Batch ID or QR Code (e.g., BATCH001)"
                      value={batchId}
                      onChange={(e) => setBatchId(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-150 flex items-center justify-center"
                    >
                      <Search className="w-5 h-5 mr-2" /> Search Batch
                    </button>
                  </form>
                  
                  {/* Sample Batches */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 flex-grow">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Sample Batch IDs to try:</h4>
                    <ul className="text-sm space-y-1">
                      {sampleBatches.map(batch => (
                        <li key={batch.id}>
                          <a onClick={() => history.pushState(null, '', '#/details')} className="text-blue-600 hover:text-blue-800 transition duration-150 font-semibold cursor-pointer">
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
        )}

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
