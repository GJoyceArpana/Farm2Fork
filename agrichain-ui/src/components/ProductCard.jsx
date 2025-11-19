// src/components/ProductCard.jsx
import React from 'react';
import { Star } from 'lucide-react';

/**
 * Reusable card component for displaying individual product details 
 * in the Buy Produce catalog, with an added click handler for traceability.
 */
const ProductCard = ({ 
  imageSrc, 
  title, 
  rating, 
  reviews, 
  location, 
  price, 
  isOrganic = false,
  isConventional = false,
  // NEW PROP: Function to call when the card is clicked (e.g., to route)
  onViewDetails, 
}) => {
  // Determine the primary badge color and text
  const primaryBadgeColor = "bg-green-600";
  const primaryBadgeText = "Blockchain Verified";

  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full max-w-sm cursor-pointer"
      // Apply the click handler here to make the whole card interactive
      onClick={onViewDetails}
    >
      
      {/* Product Image */}
      <div className="relative h-48">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover" 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://placehold.co/600x400/D1E7DD/0F5132?text=Product+Image";
          }}
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        
        {/* Title and Verified Badge */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 leading-snug">{title}</h3>
          <span 
            className={`text-xs font-medium text-white px-2 py-0.5 rounded-full whitespace-nowrap ${primaryBadgeColor}`}
          >
            {primaryBadgeText}
          </span>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
          <span className="font-semibold mr-1">{rating.toFixed(1)}</span>
          ({reviews} reviews)
        </div>

        {/* Location */}
        <p className="text-xs text-gray-500 mb-3">
          <span className="mr-1">📍</span> from {location}
        </p>

        {/* Price and Badges */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <p className="text-xl font-bold text-green-700">{price}</p>
          
          <div className="flex space-x-2">
            {isOrganic && (
              <span className="text-xs font-medium text-green-800 bg-green-100 px-3 py-1 rounded-full border border-green-200">
                Organic
              </span>
            )}
            {isConventional && (
              <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                Conventional
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;