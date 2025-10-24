// src/components/StatCard.jsx
import React from 'react';

const StatCard = ({ icon: Icon, number, label }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 border-2 border-green-300 mb-4">
        {/* Render the Lucide Icon component passed via props */}
        <Icon className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-4xl font-semibold text-gray-800 mb-1">{number}</h3>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
    </div>
  );
};

export default StatCard;