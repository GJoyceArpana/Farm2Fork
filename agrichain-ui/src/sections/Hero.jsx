// src/sections/Hero.jsx
import React from 'react';
import { ArrowRight, QrCode } from 'lucide-react';
// Note: We use the .png extension here as a standard placeholder, 
// ensure your asset file matches the extension you are importing!
import fieldBg from '../assets/field-bg.png'; 

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-white pt-16">
      <div className="container grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side: Text and CTAs */}
        <div>
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Trace your produce from 
            {/* The 'text-gradient' class is defined in src/styles/App.css */}
            <span className="text-gradient"> farm to fork</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Experience complete transparency in your food supply chain with
            blockchain-powered traceability. Know exactly where your food
            comes from, who grew it, and how it reached you.
          </p>
          {/* Buttons changed to anchor tags for routing */}
          <div className="flex space-x-4">
            
            {/* Start as Farmer -> Farmer Portal Page */}
            <a href="#/farmer" className="btn-primary flex items-center">
              Start as Farmer <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            
            {/* Track Your Food -> QR Scanner Page */}
            <a href="#/qrscanner" className="btn-secondary-outline flex items-center">
              Track Your Food <QrCode className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>

        {/* Right Side: Image Display */}
        <div className="h-[500px] rounded-lg overflow-hidden shadow-2xl">
          <img
            src={fieldBg}
            alt="Vast green agricultural fields"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
