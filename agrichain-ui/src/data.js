// src/data.js

export const productData = {
  name: "Organic Tomatoes",
  rating: 4.8,
  reviews: 156,
  origin: "Bangalore Rural, Karnataka",
  harvestDate: "January 15, 2024",
  availableQuantity: 100, // kg
  pricePerKg: 48,
  
  farmer: {
    name: "Ramesh Kumar",
    location: "Bangalore Rural, Karnataka",
    verified: true,
    isOrganic: true,
  },
  
  nutrition: {
    calories: 18,
    protein: 0.9, // g
    carbs: 3.9,   // g
    fiber: 1.2,   // g
    richIn: ["Vitamin C", "Vitamin K", "Folate"],
  },
  
  storage: {
    temperature: "12-15°C",
    humidity: "85-90% humidity",
  },
  
  supplyChain: [
    {
      step: "Harvest",
      status: "completed",
      details: "Ramesh Kumar Farm → Fresh Distributors",
      temp: "25°C",
      humidity: "65%",
    },
    {
      step: "Transport",
      status: "completed",
      details: "Fresh Distributors → City Market",
      temp: "15°C",
      humidity: "85%",
    },
    // The "Market" and "You" steps would follow...
  ],
};