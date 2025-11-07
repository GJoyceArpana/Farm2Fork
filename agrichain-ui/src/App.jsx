// src/App.jsx
import React, { useState, useEffect } from 'react';
// Import all section and component files (Re-enabled based on user confirmation)
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import Features from './sections/Features';
import CTA from './sections/CTA';
// Import all application pages
import FarmerPortalPage from './pages/FarmerPortalPage';
import QrScannerPage from './pages/QrScannerPage';
import BuyProducePage from './pages/BuyProducePage';
import FarmerDashboardPage from './pages/FarmerDashboardPage';
import RegisterProducePage from './pages/RegisterProducePage'; 
import RegistrationSuccessPage from './pages/RegistrationSuccessPage'; 
import ConsumerLoginPage from './pages/ConsumerLoginPage'; 
import ProduceDetailsPage from './pages/ProduceDetailsPage'; // <--- NEW: Import the traceability page
// Import custom styles
import './styles/App.css'; 

// Utility function to determine the current page based on URL hash
const getCurrentPage = () => {
    const hash = window.location.hash.slice(1); // Remove '#'
    
    // 1. Check for specific details pages first
    if (hash.startsWith('/details/')) {
        // Returns an object to pass the batch ID to the component
        return { name: 'Produce Details', id: hash.substring(9) };
    }
    
    // 2. Check for simple page routes
    if (hash.startsWith('/farmer')) return { name: 'Farmer Portal', id: null };
    if (hash.startsWith('/qrscanner')) return { name: 'QR Scanner', id: null };
    if (hash.startsWith('/buyproduce')) return { name: 'Buy Produce', id: null };
    if (hash.startsWith('/dashboard')) return { name: 'Dashboard', id: null };
    if (hash.startsWith('/register')) return { name: 'Register Produce', id: null };
    if (hash.startsWith('/success')) return { name: 'Registration Success', id: null };
    if (hash.startsWith('/login')) return { name: 'Consumer Login', id: null };
    
    // 3. Default to Home
    return { name: 'Home', id: null }; 
};

function App() {
    // currentPage now stores an object: { name: 'Page Name', id: 'batchId' }
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
        if (window.location.hash === '' || window.location.hash === '#/') {
            window.location.hash = '#/home';
        }
        
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    // Content for the Home Page (excluding the Navbar)
    const renderHomePage = () => (
        <main className="flex-grow pt-20"> {/* Added pt-20 to ensure content clears fixed Navbar */}
            <Hero />
            <Stats />
            <Features />
            <CTA />
        </main>
    );

    // Simple Router to switch page content based on currentPage state
    const renderPageContent = () => {
        switch (currentPage.name) {
            case 'Farmer Portal':
                return <FarmerPortalPage />; 
            case 'QR Scanner':
                return <QrScannerPage />;
            case 'Buy Produce':
                return <BuyProducePage />;
            case 'Dashboard': 
                return <FarmerDashboardPage />;
            case 'Register Produce':
                return <RegisterProducePage />;
            case 'Registration Success':
                return <RegistrationSuccessPage />;
            case 'Consumer Login':
                return <ConsumerLoginPage />;
            
            // --- NEW TRACEABILITY ROUTE ---
            case 'Produce Details': 
                // Render the dedicated details page and pass the batch ID
                return <ProduceDetailsPage batchId={currentPage.id} />;
                
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
                currentPage={currentPage.name} // Pass only the name string to Navbar
                isDarkMode={isDarkMode} 
                toggleTheme={toggleTheme} 
            />
            
            {/* 2. RENDER THE SELECTED PAGE CONTENT, which occupies the remaining space */}
            <div className="flex-grow bg-white dark:bg-gray-800 transition-colors duration-500 pt-16"> {/* Adjust pt to match Navbar height */}
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