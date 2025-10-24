// src/sections/Features.jsx
import React from 'react';
import { Shield, QrCode, TrendingUp, Users } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

const featuresData = [
  {
    icon: Shield,
    title: 'Blockchain Security',
    description: 'Every transaction is recorded on an immutable blockchain ledger.',
    iconColor: 'text-blue-500',
  },
  {
    icon: QrCode,
    title: 'QR Code Tracing',
    description: 'Scan any QR code to trace produce from farm to your table.',
    iconColor: 'text-green-500',
  },
  {
    icon: TrendingUp,
    title: 'Real-time Analytics',
    description: 'Track supply chain metrics and performance in real-time.',
    iconColor: 'text-purple-500',
  },
  {
    icon: Users,
    title: 'Multi-stakeholder',
    description: 'Connects farmers, distributors, retailers, and consumers.',
    iconColor: 'text-orange-500',
  },
];

const Features = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={(props) => <feature.icon {...props} className={feature.iconColor} />}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;