// src/sections/CTA.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    // Added dark mode classes for text and background gradients
    <section className="py-20 bg-gradient-to-br from-green-600 to-green-800 dark:from-green-800 dark:to-green-900 text-white">
      <div className="container text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to transform your supply chain?
        </h2>
        <p className="text-lg mb-10 opacity-90 max-w-3xl mx-auto">
          Join thousands of farmers, distributors, and consumers who trust AgriChain for complete food traceability.
        </p>
        <div className="flex justify-center space-x-4">
          
          {/* 1. Get Started Today -> Farmer Portal Page (#/farmer) */}
          <a 
            href="#/farmer" 
            className="btn-primary bg-white text-green-700 hover:bg-gray-100 flex items-center shadow-lg transition duration-300 py-3 px-6 rounded-lg font-semibold"
          >
            Get Started Today <ArrowRight className="w-5 h-5 ml-2" />
          </a>
          
          {/* 2. Learn More -> QR Scanner Page (#/qrscanner) */}
          <a 
            href="#/qrscanner" 
            className="btn-primary bg-white text-green-700 hover:bg-gray-100 flex items-center shadow-lg transition duration-300 py-3 px-6 rounded-lg font-semibold"
          >
            Learn More <ArrowRight className="w-5 h-5 ml-2" />
          </a>
          
        </div>
      </div>
    </section>
  );
};

export default CTA;
