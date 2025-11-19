// src/sections/Stats.jsx
import React from 'react';
import { Leaf, QrCode, Truck, Shield } from 'lucide-react';
import StatCard from '../components/StatCard';

const statsData = [
  { icon: Leaf, number: '1,248', label: 'Registered Farms' },
  { icon: QrCode, number: '45,629', label: 'Tracked Batches' },
  { icon: Truck, number: '892', label: 'Active Routes' },
  { icon: Shield, number: '156,847', label: 'Verified Transactions' },
];

const Stats = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        {/* The stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {statsData.map((stat) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              number={stat.number}
              label={stat.label}
            />
          ))}
        </div>

        {/* Why Choose AgriChain section text */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose AgriChain?
          </h2>
          <p className="text-lg text-gray-600">
            Our platform leverages cutting-edge blockchain technology to provide unprecedented
            transparency and trust in the food supply chain.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;