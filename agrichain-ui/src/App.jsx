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
import QrScannerPage from './pages/QrScannerPage'; // <--- NEW IMPORT
// Import custom styles (contains custom classes and color variables)
import './styles/App.css'; 

// Utility function to determine the current page based on URL hash
const getCurrentPage = () => {
  const hash = window.location.hash.slice(1); // Remove '#'
  if (hash.startsWith('/farmer')) return 'Farmer Portal';
  if (hash.startsWith('/qrscanner')) return 'QR Scanner'; // <--- NEW ROUTE LOGIC
  // Add other pages here (e.g., Buy Produce)
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

  // Content for the Home Page
  const renderHomePage = () => (
    <>
      <main className="flex-grow">
        <Hero />
        <Stats />
        <Features />
        <CTA />
      </main>
    </>
  );

  // Simple Router to switch content
  const renderPageContent = () => {
    switch (currentPage) {
      case 'Farmer Portal':
        // FarmerPortalPage renders its own Navbar inside
        return <FarmerPortalPage />; 
      case 'QR Scanner': // <--- NEW CASE TO RENDER QR SCANNER PAGE
        // QrScannerPage renders its own Navbar inside
        return <QrScannerPage />;
      case 'Home':
      default:
        // Home page content
        return renderHomePage();
    }
  };

  return (
    // The main layout wrapper for the entire application
    <div className="min-h-screen flex flex-col antialiased">
      
      {/* 1. Navbar is rendered outside the content switch for Home page, but Home page content 
          is rendered without it in renderHomePage(). We must render the Navbar here 
          and remove it from renderHomePage() to prevent double Navbars on non-routed pages. */}
      {/* NOTE: Since FarmerPortalPage and QrScannerPage render their own Navbars, we need 
        to conditionally render the Navbar outside the page content only if the current page 
        is 'Home' to prevent double Navbars. 
        
        However, the original code renders the Navbar *inside* renderHomePage.
        Let's correct that by always rendering the Navbar once at the top, and modifying 
        renderHomePage to NOT contain the Navbar, and ensuring other pages don't
        double-render it.
      */}
      
      {/* Render Navbar once at the top, passing the current page for active link highlighting */}
      <Navbar currentPage={currentPage} />
      
      {/* RENDER THE SELECTED PAGE CONTENT (main content of the current view) */}
      <div className="flex-grow">
        {renderPageContent()}
      </div>

      {/* 3. Footer is placed outside the main content/page logic to always be visible */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} AgriChain. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
