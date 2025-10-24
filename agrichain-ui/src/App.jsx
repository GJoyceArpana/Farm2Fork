// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import Features from './sections/Features';
import CTA from './sections/CTA';
import './styles/App.css'; // Import global styles

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Stats />
        <Features />
        <CTA />
      </main>
      {/* You'd typically add a Footer component here */}
    </div>
  );
}

export default App;