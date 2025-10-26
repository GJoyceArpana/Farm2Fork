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
import BuyProducePage from './pages/BuyProducePage';
import FarmerDashboardPage from './pages/FarmerDashboardPage';
import RegisterProducePage from './pages/RegisterProducePage'; // <--- NEW IMPORT
// Import custom styles (contains custom classes and color variables)
import './styles/App.css'; 

// Utility function to determine the current page based on URL hash
const getCurrentPage = () => {
  const hash = window.location.hash.slice(1); // Remove '#'
  if (hash.startsWith('/farmer')) return 'Farmer Portal';
  if (hash.startsWith('/qrscanner')) return 'QR Scanner';
  if (hash.startsWith('/buyproduce')) return 'Buy Produce';
  if (hash.startsWith('/dashboard')) return 'Dashboard'; // Dashboard page
  if (hash.startsWith('/register')) return 'Register Produce'; // New Register Produce form
  return 'Home'; // Default to Home page
};

function App() {
  const [currentPage, setCurrentPage] = useState(getCurrentPage());
  // Theme State management
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ? true : false
  );

  // Function to toggle theme
  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

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
        return <FarmerPortalPage />; 
      case 'QR Scanner':
        return <QrScannerPage />;
      case 'Buy Produce':
        return <BuyProducePage />;
      case 'Dashboard': 
        return <FarmerDashboardPage />;
      case 'Register Produce': // <--- NEW CASE
        return <RegisterProducePage />;
      case 'Home':
      default:
        return renderHomePage();
    }
  };

  return (
    // Apply 'dark' class based on state to enable Tailwind's dark mode
    <div className={`min-h-screen flex flex-col antialiased ${isDarkMode ? 'dark' : ''}`}>
      
      {/* 1. NAVBAR RENDERED ONCE AT THE TOP */}
      <Navbar 
        currentPage={currentPage} 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
      />
      
      {/* 2. RENDER THE SELECTED PAGE CONTENT, which occupies the remaining space */}
      <div className="flex-grow bg-white dark:bg-gray-800 transition-colors duration-500">
        {renderPageContent()}
      </div>

      {/* 3. Footer is placed outside the page logic to always be visible */}
      <footer className="bg-gray-800 text-white text-center py-4 dark:bg-gray-900 transition-colors duration-500">
        <p className="text-sm">&copy; {new Date().getFullYear()} AgriChain. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;