// src/components/FeatureCard.jsx
import React from 'react';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50 mr-3">
          {/* Render the Lucide Icon component passed via props */}
          <Icon className="w-5 h-5 text-orange-500" /> 
          {/* Note: Icon color is slightly adjusted here to match the image, 
          using a different color per icon is done in the Features.jsx file. */}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;