// src/pages/FarmerPortalPage.jsx
import React, { useState } from 'react';
import { Leaf, Mail, Lock, User, Home, KeyRound } from 'lucide-react'; 
// import Navbar from '../components/Navbar'; <-- REMOVED IMPORT

const FarmerPortalPage = () => {
  // State to manage the active view: true = Login, false = Sign Up
  const [isLogin, setIsLogin] = useState(true); 

  // Form Field States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign Up specific fields
  const [fullName, setFullName] = useState('');
  const [aadharId, setAadharId] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Simple form submission handler
  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (isLogin) {
      // Handle Login logic
      console.log('Login attempt:', { email, password });
    } else {
      // Handle Sign Up logic
      if (password !== confirmPassword) {
        console.error('Passwords do not match!'); 
        // NOTE: Keeping alert for simple testing, but console.error is better
        // alert('Passwords do not match!'); 
        return;
      }
      console.log('Sign Up attempt:', { fullName, aadharId, email, password });
    }
    
    // Reset form fields after submission (optional)
    setEmail('');
    setPassword('');
    setFullName('');
    setAadharId('');
    setConfirmPassword('');
  };

  /**
   * Component for the Login/Sign Up toggle switch.
   */
  const CardHeader = () => (
    <div className="flex p-1 bg-gray-100 rounded-lg mb-8">
      <button
        onClick={() => setIsLogin(true)}
        className={`w-1/2 py-2 text-sm font-semibold transition duration-200 rounded-md ${
          isLogin ? 'bg-white shadow text-green-700' : 'text-gray-500 hover:bg-gray-200'
        }`}
      >
        Login
      </button>
      <button
        onClick={() => setIsLogin(false)}
        className={`w-1/2 py-2 text-sm font-semibold transition duration-200 rounded-md ${
          !isLogin ? 'bg-white shadow text-green-700' : 'text-gray-500 hover:bg-gray-200'
        }`}
      >
        Sign Up
      </button>
    </div>
  );

  /**
   * Reusable component for form inputs with icons.
   */
  const InputField = ({ Icon, placeholder, type = 'text', value, onChange, label }) => (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 text-gray-800"
        />
      </div>
    </div>
  );

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Navbar is REMOVED from here and rendered in App.jsx */}

      <div className="container flex flex-col items-center justify-start pt-16 pb-20">
        {/* Page Header */}
        <Leaf className="w-12 h-12 text-white bg-green-600 rounded-full p-2 mb-4 shadow-lg" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Farmer Portal</h1>
        <p className="text-gray-500 mb-12 text-center">
          Access your farm dashboard and register produce
        </p>

        {/* Login/Sign Up Card */}
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl border border-gray-100">
          <h2 className="text-xl font-medium text-center text-gray-700 mb-6">
            Welcome Back
          </h2>
          
          <CardHeader />

          <form onSubmit={handleSubmit}>
            {!isLogin && ( // Sign Up Fields
              <>
                <InputField 
                  Icon={User} 
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  label="Full Name"
                />
                <InputField 
                  Icon={Home} 
                  placeholder="xxxx-xxxx-xxxx"
                  value={aadharId}
                  onChange={(e) => setAadharId(e.target.value)}
                  label="Aadhar ID" // Correctly updated to Aadhar ID
                  type="text"
                />
              </>
            )}

            <InputField 
              Icon={Mail}
              placeholder="farmer@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
            />
            <InputField 
              Icon={Lock}
              placeholder={isLogin ? "Enter your password" : "Create a password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
            />
            
            {!isLogin && ( // Confirm Password for Sign Up
              <InputField 
                Icon={KeyRound} 
                placeholder="Confirm your password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm Password"
              />
            )}

            <button
              type="submit"
              className="w-full btn-primary mt-6 py-3 text-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              {isLogin ? 'Login to Dashboard' : 'Create Account'}
            </button>
          </form>
        </div>
        
        {/* Terms and Policy Footer Text */}
        <p className="mt-8 text-xs text-gray-400 max-w-sm text-center">
          By signing up, you agree to our terms of service and blockchain transparency policy.
        </p>
      </div>
    </main>
  );
};

export default FarmerPortalPage;
