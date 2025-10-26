// src/App.jsx
import React, { useState, useEffect } from 'react';
// Import all section and component files
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import Features from './sections/Features';
import CTA from './sections/CTA';
// Import the application pages
import FarmerPortalPage from './pages/FarmerPortalPage';
import QrScannerPage from './pages/QrScannerPage';
import BuyProducePage from './pages/BuyProducePage'; // NEW IMPORT
// Import custom styles (contains custom classes and color variables)
import './styles/App.css'; 

// Utility function to determine the current page based on URL hash
const getCurrentPage = () => {
  const hash = window.location.hash.slice(1); // Remove '#'
  if (hash.startsWith('/farmer')) return 'Farmer Portal';
  if (hash.startsWith('/qrscanner')) return 'QR Scanner';
  if (hash.startsWith('/buyproduce')) return 'Buy Produce'; // ROUTE LOGIC FOR BUY PRODUCE
  return 'Home'; // Default to Home page
};

function App() {
  const [currentPage, setCurrentPage] = useState(getCurrentPage());

  // Effect to listen for changes in the URL hash (client-side routing)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getCurrentPage());
    };

    window.addEventListener('hashchange', handleHashChange);

    // Ensure there is a default hash on load
    if (window.location.hash === '') {
      window.location.hash = '#/home';
    }
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Content for the Home Page (excluding the Navbar)
  const renderHomePage = () => (
    <main className="flex-grow">
      <Hero />
      <Stats />
      <Features />
      <CTA />
    </main>
  );

  // Simple Router to switch page content based on currentPage state
  const renderPageContent = () => {
    switch (currentPage) {
      case 'Farmer Portal':
        return <FarmerPortalPage />; // Does NOT render its own Navbar
      case 'QR Scanner':
        return <QrScannerPage />; // Does NOT render its own Navbar
      case 'Buy Produce':
        return <BuyProducePage />; // Does NOT render its own Navbar
      case 'Home':
      default:
        return renderHomePage();
    }
  };

  return (
    // The main layout wrapper for the entire application
    <div className="min-h-screen flex flex-col antialiased">
      
      {/* 1. NAVBAR RENDERED ONCE AT THE TOP (Passed currentPage for active link highlight) */}
      <Navbar currentPage={currentPage} />
      
      {/* 2. RENDER THE SELECTED PAGE CONTENT, which occupies the remaining space */}
      <div className="flex-grow">
        {renderPageContent()}
      </div>

      {/* 3. Footer is placed outside the page logic to always be visible */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} AgriChain. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
