import React from 'react';
// Import all section and component files
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import Features from './sections/Features';
import CTA from './sections/CTA';
// Import custom styles (contains custom classes and color variables)
import './styles/App.css'; 

function App() {
  return (
    // min-h-screen: Ensures the container takes full viewport height
    // flex flex-col: Stacks children vertically
    // antialiased: Applies text smoothing for a cleaner look
    <div className="min-h-screen flex flex-col antialiased">
      
      {/* 1. Header and Navigation */}
      <Navbar />
      
      {/* 2. Main Content Area */}
      <main className="flex-grow">
        <Hero />
        <Stats />
        <Features />
        <CTA />
      </main>
      
      {/* 3. Footer Placeholder */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} AgriChain. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
