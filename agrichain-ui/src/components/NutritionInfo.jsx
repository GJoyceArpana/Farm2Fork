// src/components/NutritionInfo.jsx
import React from 'react';

const NutritionInfo = ({ nutrition }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Nutrition Information (per 100g)</h3>
    <div className="flex justify-around items-start text-center mb-6">
      {[
        { value: nutrition.calories, unit: '', label: 'Calories' },
        { value: nutrition.protein, unit: 'g', label: 'Protein' },
        { value: nutrition.carbs, unit: 'g', label: 'Carbs' },
        { value: nutrition.fiber, unit: 'g', label: 'Fiber' },
      ].map((item, index) => (
        <div key={index} className="p-2">
          <p className="text-3xl font-extrabold text-green-700">{item.value}{item.unit}</p>
          <p className="text-sm font-medium text-gray-600">{item.label}</p>
        </div>
      ))}
    </div>

    <h4 className="text-base font-semibold text-gray-700 mb-2">Rich in Vitamins:</h4>
    <div className="flex flex-wrap gap-2">
      {nutrition.richIn.map((vitamin, index) => (
        <span 
          key={index}
          className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-700 rounded-full border border-gray-200"
        >
          {vitamin}
        </span>
      ))}
    </div>
  </div>
);

export default NutritionInfo;