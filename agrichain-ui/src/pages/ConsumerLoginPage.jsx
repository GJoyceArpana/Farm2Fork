// src/pages/ConsumerLoginPage.jsx
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Smartphone, 
  Home, 
  ArrowRight, 
  Lock,
  ArrowLeft
} from 'lucide-react';

const LoginMethodButton = ({ method, icon: Icon, currentMethod, setMethod }) => (
    <button
        onClick={() => setMethod(method)}
        className={`flex flex-col items-center p-3 rounded-lg w-1/3 transition-colors duration-200 border-2 ${
            currentMethod === method
                ? 'bg-black dark:bg-gray-900 border-black dark:border-white text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
    >
        <Icon className="w-5 h-5 mb-1" />
        <span className="text-xs font-semibold">{method}</span>
    </button>
);

const InputField = ({ Icon, placeholder, type = 'text', value, onChange, disabled = false, center = false }) => (
    <div className="relative mb-6">
        {!center && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Icon className="w-5 h-5 text-gray-400" />
            </div>
        )}
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 text-gray-800 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${center ? 'text-center text-xl font-bold tracking-widest px-4' : 'pl-12 pr-4'}`}
            maxLength={center ? 6 : undefined} // OTP input usually has a max length
        />
    </div>
);

const ConsumerLoginPage = () => {
    // State to manage the flow: 1 (Method Select/Initial Input), 2 (OTP Verification)
    const [step, setStep] = useState(1); 
    const [loginMethod, setLoginMethod] = useState('Mobile OTP');
    const [isSigningIn, setIsSigningIn] = useState(true);
    const [mobileNumber, setMobileNumber] = useState('9741577223'); // Pre-filled for demo
    const [otp, setOtp] = useState('');


    // --- Step 1 Handlers ---
    const handleSendOtp = () => {
        // Simple validation for OTP
        if (loginMethod === 'Mobile OTP' && mobileNumber.length === 10) {
            console.log(`Sending OTP to ${mobileNumber}`);
            setStep(2); // Move to OTP verification step
        } else {
            alert(`Please enter a valid 10-digit mobile number.`);
        }
    };

    const renderInitialInputs = () => {
        return (
            <>
                <h2 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Choose Login Method
                </h2>

                {/* Login Method Toggle */}
                <div className="flex justify-between space-x-3 mb-6">
                    <LoginMethodButton method="Mobile OTP" icon={Smartphone} currentMethod={loginMethod} setMethod={setLoginMethod} />
                    <LoginMethodButton method="Email" icon={Mail} currentMethod={loginMethod} setMethod={setLoginMethod} />
                    <LoginMethodButton method="Aadhar ID" icon={Home} currentMethod={loginMethod} setMethod={setLoginMethod} />
                </div>
                
                {/* Conditional Input Field (Only mobile for now based on flow) */}
                {loginMethod === 'Mobile OTP' && (
                    <InputField
                        Icon={Smartphone}
                        placeholder="Enter mobile number"
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                    />
                )}

                {/* Sign In / Sign Up Toggle (Hidden if Email/Aadhar selected) */}
                {loginMethod === 'Mobile OTP' && (
                    <div className="flex justify-start space-x-2 text-sm font-semibold mb-6">
                        <button 
                            type="button"
                            onClick={() => setIsSigningIn(true)}
                            className={`px-6 py-2 rounded-lg transition duration-150 ${isSigningIn ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        >
                            Sign In
                        </button>
                        <button 
                            type="button"
                            onClick={() => setIsSigningIn(false)}
                            className={`px-6 py-2 rounded-lg transition duration-150 ${!isSigningIn ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        >
                            Sign Up
                        </button>
                    </div>
                )}


                {/* Primary Action Button: Send OTP */}
                <button
                    onClick={handleSendOtp}
                    className="w-full flex items-center justify-center py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-150"
                >
                    Send OTP <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                
                {/* Guest Button */}
                <button
                    onClick={() => history.pushState(null, '', '#/buyproduce')}
                    className="w-full mt-3 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150"
                >
                    Continue as Guest
                </button>
            </>
        );
    };

    // --- Step 2 Handlers ---
    const handleVerifyOtp = () => {
        // Demo OTP is 123456
        if (otp === '123456') {
            console.log("OTP Verified! Logging in...");
            // CRITICAL FIX: Redirect user to the Buy Produce page after successful login
            // Also set mock user data for Navbar visibility
            localStorage.setItem('user', JSON.stringify({ name: 'John Consumer', role: 'consumer' }));
            history.pushState(null, '', '#/buyproduce'); 
        } else {
            alert('Verification failed. Please check the OTP.');
        }
    };
    
    const renderOtpVerification = () => {
        return (
            <>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                    OTP sent to {mobileNumber}
                </p>

                {/* OTP Input Field */}
                <InputField
                    Icon={Lock}
                    placeholder="123456"
                    type="tel"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                    center={true}
                />
                
                {/* Primary Action Button: Verify OTP */}
                <button
                    onClick={handleVerifyOtp}
                    className="w-full flex items-center justify-center py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-150"
                >
                    Verify OTP
                </button>
                
                {/* Back Link */}
                <button
                    onClick={() => setStep(1)}
                    className="w-full mt-4 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition duration-150"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </button>
                
                {/* Demo OTP Hint */}
                <p className="mt-4 text-xs text-center text-gray-400 dark:text-gray-500">
                    Demo OTP: 123456
                </p>
            </>
        );
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 pb-16">
            
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <User className="w-12 h-12 mx-auto mb-3 text-green-600 bg-green-100 dark:bg-green-800 rounded-full p-2" />
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome to FarmTrace</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Sign in to buy fresh produce directly from farmers
                    </p>
                </div>

                {/* Conditional Rendering of Steps */}
                {step === 1 && renderInitialInputs()}
                {step === 2 && renderOtpVerification()}

            </div>
        </div>
    );
};

export default ConsumerLoginPage;