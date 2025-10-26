// src/pages/FarmerPortalPage.jsx
import React, { useState } from 'react';
import { Leaf, Mail, Lock, User, Home, KeyRound } from 'lucide-react'; 

// NOTE: InputField component is defined outside to maintain focus stability
const InputField = ({ Icon, placeholder, type = 'text', value, onChange, label }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
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
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
      />
    </div>
  </div>
);

const FarmerPortalPage = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Mock user name for persistence. This should be empty initially, but is pre-filled here for demo purposes.
  const [fullName, setFullName] = useState('John Farm Owner'); 
  const [aadharId, setAadharId] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to save user data to localStorage and redirect
  const authenticateAndRedirect = (user, role) => {
    // 1. Persist mock user data (name and role) in localStorage
    localStorage.setItem('user', JSON.stringify({ name: user, role: role }));
    
    // 2. Redirect to Dashboard
    history.pushState(null, '', '#/dashboard'); 
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    // --- Mock Authentication Logic ---
    if (isLogin) {
      console.log('Login attempt:', { email, password });
      // On success, redirect and save mock user data
      authenticateAndRedirect(fullName, 'farmer'); 

    } else {
      if (password !== confirmPassword) {
        console.error('Sign Up Error: Passwords do not match!'); 
        return;
      }
      console.log('Sign Up attempt:', { fullName, aadharId, email, password });
      // On success, redirect and save mock user data
      authenticateAndRedirect(fullName, 'farmer'); 
    }
    
    // Reset form fields
    setEmail('');
    setPassword('');
    setAadharId('');
    setConfirmPassword('');
  };

  /**
   * Component for the Login/Sign Up toggle switch.
   */
  const CardHeader = () => (
    <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg mb-8">
      <button
        type="button" 
        onClick={() => setIsLogin(true)}
        className={`w-1/2 py-2 text-sm font-semibold transition duration-200 rounded-md ${
          isLogin ? 'bg-white shadow text-green-700 dark:bg-gray-600 dark:text-white' : 'text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700'
        }`}
      >
        Login
      </button>
      <button
        type="button" 
        onClick={() => setIsLogin(false)}
        className={`w-1/2 py-2 text-sm font-semibold transition duration-200 rounded-md ${
          !isLogin ? 'bg-white shadow text-green-700 dark:bg-gray-600 dark:text-white' : 'text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700'
        }`}
      >
        Sign Up
      </button>
    </div>
  );

  return (
    <div className="pb-20"> 
      <main className="container flex flex-col items-center justify-start pt-16">
        {/* Page Header */}
        <Leaf className="w-12 h-12 text-white bg-green-600 rounded-full p-2 mb-4 shadow-lg" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Farmer Portal</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-12 text-center">
          Access your farm dashboard and register produce
        </p>

        {/* Login/Sign Up Card */}
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-medium text-center text-gray-700 dark:text-white mb-6">
            Welcome Back
          </h2>
          
          <CardHeader />

          <form onSubmit={handleSubmit}>
            {!isLogin && ( // Sign Up Fields
              <>
                <InputField Icon={User} placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} label="Full Name"/>
                <InputField Icon={Home} placeholder="xxxx-xxxx-xxxx" value={aadharId} onChange={(e) => setAadharId(e.target.value)} label="Aadhar ID" type="text"/>
              </>
            )}

            <InputField Icon={Mail} placeholder="farmer@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Email"/>
            <InputField Icon={Lock} placeholder={isLogin ? "Enter your password" : "Create a password"} type="password" value={password} onChange={(e) => setPassword(e.target.value)} label="Password"/>
            
            {!isLogin && ( // Confirm Password for Sign Up
              <InputField Icon={KeyRound} placeholder="Confirm your password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} label="Confirm Password"/>
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
        <p className="mt-8 text-xs text-gray-400 dark:text-gray-500 max-w-sm text-center">
          By signing up, you agree to our terms of service and blockchain transparency policy.
        </p>
      </main>
    </div>
  );
};

export default FarmerPortalPage;
