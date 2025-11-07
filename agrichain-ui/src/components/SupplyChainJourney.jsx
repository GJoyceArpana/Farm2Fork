// src/components/SupplyChainJourney.jsx
import React from 'react';
import { Sprout, Truck, Store, CheckCircle, MapPin } from 'lucide-react';

// Icon mapping for steps
const StepIcon = ({ step }) => {
  switch (step) {
    case 'Harvest': return <Sprout className="w-5 h-5" />;
    case 'Transport': return <Truck className="w-5 h-5" />;
    case 'Market': return <Store className="w-5 h-5" />;
    case 'You': return <MapPin className="w-5 h-5" />;
    default: return <CheckCircle className="w-5 h-5" />;
  }
};

const SupplyChainJourney = ({ chain }) => {
  const steps = ["Farm", "Transport", "Market", "You"];
  const completedSteps = chain.filter(s => s.status === 'completed').length;
  const progressWidth = `${(completedSteps / (steps.length - 1)) * 100}%`;

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        Supply Chain Journey
      </h3>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between relative mb-2">
          {steps.map((step, index) => (
            <div key={step} className={`text-sm font-semibold ${index <= completedSteps ? 'text-green-700' : 'text-gray-400'}`}>
              {step}
            </div>
          ))}
        </div>
        <div className="relative h-1 bg-gray-200 rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-green-600 rounded-full transition-all duration-500 ease-out" 
            style={{ width: progressWidth }}
          ></div>
        </div>
        <p className="text-sm font-medium text-right mt-2 text-green-700">Status: Delivered</p>
      </div>
      
      {/* Timeline Details */}
      <div className="space-y-6">
        {chain.map((item, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div className="p-2 bg-green-100 text-green-700 rounded-full">
                <StepIcon step={item.step} />
              </div>
              {index < chain.length - 1 && <div className="h-10 w-px bg-gray-300"></div>}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-lg text-gray-800">{item.step}</h4>
                <span className="text-xs font-medium text-white bg-green-500 px-2 py-0.5 rounded-full">
                  completed
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{item.details}</p>
              <div className="flex space-x-4 text-xs text-gray-500 mt-1">
                <p>🌡️ {item.temp}</p>
                <p>💧 {item.humidity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplyChainJourney;