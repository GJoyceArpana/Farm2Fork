// src/sections/Hero.jsx
import React from 'react';
import { ArrowRight, QrCode } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-white pt-16">
      <div className="container grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side: Text and CTAs */}
        <div>
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Trace your produce from 
            <span className="text-gradient"> farm to fork</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Experience complete transparency in your food supply chain with
            blockchain-powered traceability. Know exactly where your food
            comes from, who grew it, and how it reached you.
          </p>
          {/* Buttons */}
          <div className="flex space-x-4">
            <button className="btn-primary flex items-center">
              Start as Farmer <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="btn-secondary-outline flex items-center">
              Track Your Food <QrCode className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

        {/* Right Side: Image Placeholder */}
        <div className="h-[500px] rounded-lg overflow-hidden shadow-2xl">
          {/* In a real project, you would use the actual image here, perhaps as a background image 
          or an <img> tag. For now, we use a placeholder and an image tag for display. */}
                  </div>
      </div>
    </section>
  );
};

export default Hero;