import React, { useState, useEffect } from 'react';
// Import sections and components
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
import ProduceDetailsPage from './pages/ProduceDetailsPage'; 
import CheckoutPage from './pages/CheckoutPage'; 
import ConsumerDashboard from './pages/ConsumerDashboard'; // NEW: Import Consumer Dashboard


// Import custom styles
import './styles/App.css'; 

// Utility function to determine the current page based on URL hash
const getCurrentPage = () => {
    const hash = window.location.hash.slice(1); // Remove '#'
    
    // 1. Check for specific details pages first
    if (hash.startsWith('/details/')) {
        return { name: 'Produce Details', id: hash.substring(9) };
    }
    
    // 2. Check for simple page routes
    if (hash.startsWith('/farmer')) return { name: 'Farmer Portal', id: null };
    if (hash.startsWith('/qrscanner')) return { name: 'QR Scanner', id: null };
    if (hash.startsWith('/buyproduce')) return { name: 'Buy Produce', id: null };
    
    // UPDATED: Use a new route name for the consumer dashboard to avoid conflicts
    if (hash.startsWith('/consumer-dashboard')) return { name: 'Consumer Dashboard', id: null };
    
    // If the user lands on just '#/dashboard', we default to the FarmerDashboardPage for simplicity
    // or you might choose to route based on user role (which isn't implemented here). 
    // Sticking to original routes and mapping:
    if (hash.startsWith('/dashboard')) return { name: 'Consumer Dashboard', id: null }; // <--- MAPPED TO CONSUMER DASHBOARD

    if (hash.startsWith('/register')) return { name: 'Register Produce', id: null };
    if (hash.startsWith('/success')) return { name: 'Registration Success', id: null };
    if (hash.startsWith('/login')) return { name: 'Consumer Login', id: null };
    
    // 3. Checkout and Order Success Routes
    if (hash.startsWith('/checkout')) return { name: 'Checkout', id: null }; 
    if (hash.startsWith('/success-order')) return { name: 'Order Success', id: null }; 
    

    // 4. Default to Home
    return { name: 'Home', id: null }; 
};

function App() {
    const [currentPage, setCurrentPage] = useState(getCurrentPage());
    const [currentOrder, setCurrentOrder] = useState(null); 
    const [successfulOrderAmount, setSuccessfulOrderAmount] = useState(null); 

    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'dark' ? true : false
    );

    const toggleTheme = () => {
        setIsDarkMode(prev => {
            const newMode = !prev;
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            return newMode;
        });
    };

    // --- HANDLER: Triggered by ProduceDetailsPage "Buy Now" ---
    const handleBuyNow = (orderData) => {
        setCurrentOrder(orderData);
        window.location.hash = '#/checkout';
    };

    // --- NEW HANDLER: Triggered by CheckoutPage "Place Order" ---
    const handleOrderSuccess = (totalAmount) => {
        // Step 1: Set the final data needed for the success page
        setSuccessfulOrderAmount(totalAmount); 
        // Step 2: Clear the previous checkout data
        setCurrentOrder(null); 
        // Step 3: Navigate
        window.location.hash = '#/success-order'; 
    };
    
    // --- UPDATED HANDLER: Go back/Clear state ---
    const handleBack = () => {
        setCurrentOrder(null);
        setSuccessfulOrderAmount(null);
        window.location.hash = '#/buyproduce'; 
    };
    // --------------------------------------------------------------------------

    useEffect(() => {
        const handleHashChange = () => {
            const newPage = getCurrentPage();
            setCurrentPage(newPage);
            
            // Cleanup state if navigating away from the order flow
            if (newPage.name !== 'Checkout' && newPage.name !== 'Produce Details' && newPage.name !== 'Order Success') {
                setCurrentOrder(null);
                setSuccessfulOrderAmount(null);
            }
        };

        window.addEventListener('hashchange', handleHashChange);

        if (window.location.hash === '' || window.location.hash === '#/') {
            window.location.hash = '#/home';
        }
        
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const renderHomePage = () => (
        <main className="flex-grow pt-20">
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
            case 'QR Scanner':
            case 'Buy Produce':
            case 'Register Produce':
            case 'Registration Success':
            case 'Consumer Login':
                // Using an object lookup for brevity, functional equivalent to multiple returns
                return {
                    'Farmer Portal': <FarmerPortalPage />,
                    'QR Scanner': <QrScannerPage />,
                    'Buy Produce': <BuyProducePage />,
                    'Register Produce': <RegisterProducePage />,
                    'Registration Success': <RegistrationSuccessPage />,
                    'Consumer Login': <ConsumerLoginPage />,
                }[currentPage.name];
            
            case 'Consumer Dashboard': // <--- NEW/UPDATED MAPPING
                return <ConsumerDashboard />;

            case 'Dashboard': // This is assumed to be the Farmer Dashboard route in this context
                return <FarmerDashboardPage />;

            case 'Produce Details': 
                return (
                    <ProduceDetailsPage 
                        batchId={currentPage.id} 
                        onBuyNow={handleBuyNow} 
                        onBack={handleBack} 
                    />
                );
            
            case 'Checkout':
                if (currentOrder) {
                    return <CheckoutPage 
                                order={currentOrder} 
                                onBack={handleBack} 
                                onSuccess={handleOrderSuccess} 
                            />;
                }
                // Fallback: If no order data exists for checkout, redirect.
                window.location.hash = '#/buyproduce';
                return null;

            case 'Order Success':
                if (successfulOrderAmount !== null) {
                    // Render success page, which handles its own navigation (Track/Continue Shopping)
                    return <OrderSuccessPage totalAmount={successfulOrderAmount} />;
                }
                // Fallback: If no amount data exists for success page, redirect.
                window.location.hash = '#/buyproduce';
                return null;
                
            case 'Home':
            default:
                return renderHomePage();
        }
    };

    return (
        <div className={`min-h-screen flex flex-col antialiased ${isDarkMode ? 'dark' : ''}`}>
            
            {/* 1. NAVBAR RENDERED ONCE AT THE TOP */}
            <Navbar 
                currentPage={currentPage.name}
                isDarkMode={isDarkMode} 
                toggleTheme={toggleTheme} 
            />
            
            {/* 2. RENDER THE SELECTED PAGE CONTENT */}
            <div className="flex-grow bg-white dark:bg-gray-800 transition-colors duration-500 pt-16">
                {renderPageContent()}
            </div>

            {/* 3. Footer */}
            <footer className="bg-gray-800 text-white text-center py-4 dark:bg-gray-900 transition-colors duration-500">
                <p className="text-sm">&copy; {new Date().getFullYear()} AgriChain. All rights reserved.</p>
            </footer>
            
        </div>
    );
}

export default App;