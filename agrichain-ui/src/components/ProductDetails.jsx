// src/components/ProductDetails.jsx
import React, { useState } from 'react';

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const total = (quantity * product.pricePerKg).toFixed(2);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <div style={{ display: 'flex', gap: '20px', border: '1px solid #eee', padding: '20px' }}>
      {/* Placeholder for Image */}
      <div style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
              </div>

      <div style={{ flex: 1 }}>
        <h1>{product.name}</h1>
        <p>⭐ {product.rating} ({product.reviews} reviews) | **Organic**</p>
        <p>From **{product.origin}**</p>
        <p>Harvested on **{product.harvestDate}**</p>
        <p>{product.availableQuantity} kg available</p>

        <h2>₹{product.pricePerKg}/kg</h2>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>Quantity (kg)</span>
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
        
        <p>Total Price: **₹{total}**</p>
        
        <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none' }}>
          Buy Now
        </button>
        <button>Add to Cart</button>

        <p style={{ marginTop: '15px', color: 'green' }}>
          **Blockchain Verified Produce**
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;