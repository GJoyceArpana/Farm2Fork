// src/sections/CTA.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-green-800 text-white">
      <div className="container text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to transform your supply chain?
        </h2>
        <p className="text-lg mb-10 opacity-90 max-w-3xl mx-auto">
          Join thousands of farmers, distributors, and consumers who trust AgriChain for complete food traceability.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="btn-primary bg-white text-green-700 hover:bg-gray-100 flex items-center">
            Get Started Today <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          {/* The blank button placeholder from the image */}
          <div className="w-40 h-12 bg-white bg-opacity-20 rounded-lg border border-white"></div>
        </div>
      </div>
    </section>
  );
};

export default CTA;