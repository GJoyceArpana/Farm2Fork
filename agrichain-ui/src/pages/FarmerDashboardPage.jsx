// src/pages/FarmerDashboardPage.jsx
import React from 'react';
import { 
  Leaf, 
  Package, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Plus, 
  Archive,
  User 
} from 'lucide-react';
import BatchCard from '../components/BatchCard'; // <--- Import the BatchCard

/**
 * Reusable Metric Card component for the dashboard statistics.
 */
const MetricCard = ({ title, value, icon: Icon, iconColor, iconBg }) => (
  <div className="p-5 bg-white dark:bg-gray-700 rounded-xl shadow-md border border-gray-100 dark:border-gray-600 flex justify-between items-center transition-colors duration-500">
    <div>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{value}</h3>
    </div>
    <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

const FarmerDashboardPage = () => {
  const userName = "John Farm Owner"; // Updated name for consistency
  const farmId = "FARM001"; // Updated ID for consistency

  // Mock data for the registered batches: ONE DELIVERED BATCH
  const batches = [
      { 
          id: "BATCH001", 
          name: "Organic Tomatoes", 
          quantity: "100 kg", 
          harvestDate: "Jan 15, 2024", 
          progress: 100, // 100% complete for delivered status
          status: "delivered" // New status property for card display
      }
  ];

  const metrics = [
    { 
      title: 'Total Batches', 
      value: batches.length.toString(), // 1
      icon: Package, 
      iconColor: 'text-blue-600', 
      iconBg: 'bg-blue-100 dark:bg-blue-900' 
    },
    { 
      title: 'In Transit', 
      value: '0', // Assuming 0 in transit
      icon: Clock, 
      iconColor: 'text-orange-500', 
      iconBg: 'bg-orange-100 dark:bg-orange-900' 
    },
    { 
      title: 'Delivered', 
      value: '1', // Updated to 1
      icon: CheckCircle, 
      iconColor: 'text-green-600', 
      iconBg: 'bg-green-100 dark:bg-green-900' 
    },
    { 
      title: 'Success Rate', 
      value: '100%', // Updated to 100%
      icon: TrendingUp, 
      iconColor: 'text-purple-600', 
      iconBg: 'bg-purple-100 dark:bg-purple-900' 
    },
  ];
  
  // CRITICAL: Function to redirect to the registration page (using <a> tag is the final fix)
  const redirectToRegister = () => {
      history.pushState(null, '', '#/register');
  };


  return (
    <div className="pb-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
      
      <main className="container pt-4">
        
        {/* Dashboard Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              Welcome back, {userName}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Farm ID: {farmId} &bullet; Manage your produce and track supply chain
            </p>
          </div>
          
          {/* Button 1: Register Produce (Top Right) - Uses <a> for reliable routing */}
          <a 
            href="#/register"
            className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150"
          >
            <Plus className="w-5 h-5 mr-2" /> Register Produce
          </a>
        </div>

        {/* Metric Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              iconColor={metric.iconColor}
              iconBg={metric.iconBg}
            />
          ))}
        </div>

        {/* Registered Batches Section */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
          <Archive className="w-5 h-5 mr-2" /> Your Registered Batches
        </h2>
        
        {/* Conditional Rendering of Batch List or Empty State */}
        {batches.length > 0 ? (
            batches.map(batch => (
                <BatchCard key={batch.id} batch={batch} />
            ))
        ) : (
            /* Empty State / No Batches Placeholder (Removed for this final data state) */
            <div className="text-center p-16 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 shadow-sm transition-colors duration-500">
              <Archive className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No batches registered yet
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Start by registering your first produce batch to track it through the supply chain.
              </p>
              
              {/* Button 2: Register First Batch (Center) - Uses <a> for reliable routing */}
              <a 
                href="#/register"
                className="flex items-center mx-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-150"
              >
                <Plus className="w-5 h-5 mr-2" /> Register First Batch
              </a>
            </div>
        )}
        
      </main>
    </div>
  );
};

export default FarmerDashboardPage;