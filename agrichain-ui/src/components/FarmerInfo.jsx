// src/components/FarmerInfo.jsx
import React from 'react';
import { UserCheck, Leaf, Gauge } from 'lucide-react';

const FarmerInfo = ({ farmer, storage }) => (
  <div className="space-y-6">
    {/* Farmer Information */}
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <UserCheck className="w-6 h-6 mr-2 text-green-600" /> Farmer Information
      </h3>
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
          🧑‍🌾
        </div>
        <div>
          <p className="font-bold text-lg text-gray-800">{farmer.name}</p>
          <p className="text-sm text-gray-600">{farmer.location}</p>
          {farmer.verified && (
            <p className="text-xs font-medium text-green-600 flex items-center mt-1">
              <Leaf className="w-3 h-3 mr-1" /> Verified Organic Farmer
            </p>
          )}
        </div>
      </div>
    </div>

    {/* Storage Conditions */}
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Gauge className="w-6 h-6 mr-2 text-blue-600" /> Storage Conditions
      </h3>
      <p className="text-gray-700">
        Store at **{storage.temperature}**, **{storage.humidity}**
      </p>
    </div>
  </div>
);

export default FarmerInfo;