// src/pages/RegisterProducePage.jsx
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Archive, 
  Scale, 
  Calendar, 
  Upload, 
  Image as ImageIcon,
  CheckCircle 
} from 'lucide-react';

/**
 * Reusable Input Field Component for forms
 */
const FormInput = ({ Icon, label, placeholder, type = 'text', value, onChange }) => (
  <div className="mb-6">
    <label className="block text-lg font-semibold text-gray-800 dark:text-white mb-2">
      {label} *
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className={`w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 text-gray-800 dark:bg-gray-700 dark:text-white ${
          Icon ? 'pl-10 pr-4' : 'px-4'
        }`}
      />
    </div>
  </div>
);

const RegisterProducePage = () => {
  const [produceName, setProduceName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [produceImage, setProduceImage] = useState(null);

  const handleFileChange = (e) => {
    setProduceImage(e.target.files[0]);
  };

  // NOTE: Redirection logic is now handled by the <a> tags below.

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-500 pb-20">
      
      <main className="container pt-6 max-w-4xl">
        
        {/* Back Button - CONVERTED TO ANCHOR TAG */}
        <a 
          href="#/dashboard"
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition duration-150 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
        </a>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
          Register New Produce
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Add your harvest to the blockchain for complete traceability
        </p>

        {/* Form area starts here. Using a div instead of a formal <form> tag to avoid submission conflicts */}
        <div> 
          <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
              <Archive className="w-5 h-5 mr-2" /> Produce Information
            </h2>
            
            {/* Produce Name */}
            <FormInput
              label="Produce Name"
              placeholder="e.g., Organic Tomatoes, Fresh Spinach"
              value={produceName}
              onChange={(e) => setProduceName(e.target.value)}
            />

            {/* Quantity */}
            <FormInput
              Icon={Scale}
              label="Quantity (kg)"
              placeholder="100"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            {/* Harvest Date */}
            <FormInput
              Icon={Calendar}
              label="Harvest Date"
              placeholder="dd-mm-yyyy"
              type="date"
              value={harvestDate}
              onChange={(e) => setHarvestDate(e.target.value)}
            />
            
            {/* Produce Image Upload (Optional) */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Produce Image (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center bg-gray-50 dark:bg-gray-800">
                {produceImage ? (
                  <div className="text-green-600">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-medium">{produceImage.name} uploaded successfully.</p>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600 dark:text-gray-400 mb-3">Upload a photo of your produce</p>
                    <input type="file" id="file-upload" className="hidden" accept="image/jpeg, image/png, image/webp" onChange={handleFileChange} />
                    <label htmlFor="file-upload" className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition duration-150">
                      <Upload className="w-4 h-4 mr-2" /> Choose Image
                    </label>
                  </>
                )}
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Maximum file size: 5MB. Supported formats: JPEG, PNG, WebP</p>
              </div>
            </div>
          </div>
          
          {/* What Happens Next Section */}
          <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-xl border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">What happens next?</h3>
            <ul className="list-disc pl-5 text-sm text-blue-700 dark:text-blue-200 space-y-2">
              <li>Your produce will be registered on the blockchain</li>
              <li>A unique QR code will be generated for tracking</li>
              <li>Supply chain participants can scan to verify authenticity</li>
              <li>All transactions will be recorded immutably</li>
            </ul>
          </div>

          {/* Submit Button (Anchor Tag) */}
          <a
            href="#/success" 
            className="w-full btn-primary py-3 text-lg shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center"
          >
            <Archive className="w-5 h-5 mr-2" /> Register Produce
          </a>
        </div>
      </main>
    </div>
  );
};

export default RegisterProducePage;
