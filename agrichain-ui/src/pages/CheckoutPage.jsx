// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  Lock,
  MapPin,
  ClipboardList,
  Smartphone,
  CheckCircle,
  Clock,
  Shield,
  Truck
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

// Helper to generate a mock order number
const generateOrderNumber = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'ORDER_';
  for (let i = 0; i < 8; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
};

const PaymentOption = ({ method, icon, isSelected, onSelect }) => (
  <div
    onClick={() => onSelect(method)}
    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border ${
      isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-md bg-gray-100">{icon}</div>
      <div className="font-medium">{method}</div>
    </div>
    {isSelected && <div className="text-green-600 font-semibold">Selected</div>}
  </div>
);

const CheckoutPage = ({ onBack, onSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // read order from location.state (parent should pass it)
  const incomingOrder = location?.state?.order ?? null;

  const [order, setOrder] = useState(() => {
    const o = incomingOrder ?? {
      productName: 'Unknown Product',
      quantity: 1,
      pricePerKg: 0,
      subtotal: 0,
      deliveryFee: 0,
      totalAmount: 0,
    };
    // compute safe totals
    return {
      ...o,
      subtotal: o.subtotal ?? (o.quantity * (o.pricePerKg ?? 0)),
      totalAmount: o.totalAmount ?? ((o.subtotal ?? 0) + (o.deliveryFee ?? 0)),
    };
  });

  const [selectedPayment, setSelectedPayment] = useState('UPI');
  const [upiId, setUpiId] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    // if no incoming order, keep showing checkout but with fallback data
    if (!incomingOrder) {
      console.warn('CheckoutPage: no order in location.state — using fallback data');
    }
  }, [incomingOrder]);

  const handlePlaceOrder = (e) => {
    if (e?.preventDefault) e.preventDefault();

    if (!deliveryAddress) {
      alert('Please enter your delivery address.');
      return;
    }
    if (selectedPayment === 'UPI' && !upiId) {
      alert('Please enter your UPI ID.');
      return;
    }

    const finalOrder = {
      ...order,
      deliveryAddress,
      paymentMethod: selectedPayment,
      placedAt: new Date().toISOString(),
    };

    // call parent hook if provided
    if (typeof onSuccess === 'function') onSuccess(finalOrder);

    // mark placed and show success UI
    setOrder(finalOrder);
    setOrderNumber(generateOrderNumber());
    setOrderPlaced(true);
  };

  const handleTrackOrder = () => {
    alert(`Tracking Order ${orderNumber}...`);
  };

  const handleContinueShopping = () => {
    // navigate to main buy page (adjust path if different)
    navigate('/');
  };

  const handleBack = () => {
    if (typeof onBack === 'function') return onBack();
    navigate(-1);
  };

  if (orderPlaced) {
    // Embedded Order Success UI (previously OrderSuccessPage)
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 2);
    const formattedDeliveryDate = `${deliveryDate.getMonth() + 1}/${deliveryDate.getDate()}/${deliveryDate.getFullYear()}`;

    return (
      <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-800 pt-20">
        <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-xl border border-gray-100 dark:border-gray-600 w-full max-w-md text-center relative">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Order Placed Successfully!</h1>

          <div className="space-y-4 text-left text-gray-700 dark:text-gray-300 mb-8">
            <div className="flex justify-between border-b border-gray-100 dark:border-gray-600 pb-2">
              <p>Order Number:</p>
              <p className="font-semibold text-gray-900 dark:text-white">{orderNumber}</p>
            </div>

            <div className="flex justify-between border-b border-gray-100 dark:border-gray-600 pb-2">
              <p className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500" /> Expected Delivery:
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">{formattedDeliveryDate}</p>
            </div>

            <div className="flex justify-between pt-2">
              <p>Total Amount:</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">₹{order.totalAmount}</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 mb-8">
            <div className="flex items-center text-blue-700 dark:text-blue-300 font-semibold justify-center mb-1">
              <Shield className="w-4 h-4 mr-2" /> Blockchain Escrow Active
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-400">
              Your payment is secured in smart contract escrow until delivery confirmation
            </p>
          </div>

          <button
            onClick={handleTrackOrder}
            className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg mb-4 flex items-center justify-center"
          >
            <Truck className="w-5 h-5 mr-2" /> Track Order
          </button>

          <button
            onClick={handleContinueShopping}
            className="w-full py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition"
          >
            Continue Shopping
          </button>

          <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-900 p-3 rounded-lg shadow-2xl border border-green-300 flex items-center text-sm text-green-700 dark:text-green-300">
            <CheckCircle className="w-4 h-4 mr-2" /> Order placed successfully!
          </div>
        </div>
      </div>
    );
  }

  // Checkout form UI
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-500 pb-20">
      <header className="bg-white dark:bg-gray-900 shadow-md">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition duration-150 font-semibold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Checkout</h1>
          <div className="w-12" />
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 mt-6">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600 mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <ClipboardList className="w-5 h-5 mr-2 text-green-600" /> Order Summary
          </h2>

          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <div className="flex justify-between border-b pb-2 border-gray-100 dark:border-gray-600">
              <p>{order.productName}</p>
              <p className="font-semibold">₹{order.subtotal}</p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {order.quantity} kg x ₹{order.pricePerKg}
            </p>

            <div className="flex justify-between pt-2">
              <p>Subtotal:</p>
              <p>₹{order.subtotal}</p>
            </div>

            <div className="flex justify-between">
              <p>Delivery Fee:</p>
              <p>₹{order.deliveryFee}</p>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
              <p className="text-lg font-bold text-gray-800 dark:text-white">Total Amount:</p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">₹{order.totalAmount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600 mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-red-500" /> Delivery Address
          </h2>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            rows="3"
            placeholder="Enter your complete delivery address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
        </div>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600 mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Payment Method</h2>

          <div className="space-y-4">
            <PaymentOption method="UPI" icon={<Smartphone className="w-5 h-5" />} isSelected={selectedPayment === 'UPI'} onSelect={setSelectedPayment} />
            <PaymentOption method="Card" icon={<CreditCard className="w-5 h-5" />} isSelected={selectedPayment === 'Card'} onSelect={setSelectedPayment} />
            <PaymentOption method="Wallet" icon={<Wallet className="w-5 h-5" />} isSelected={selectedPayment === 'Wallet'} onSelect={setSelectedPayment} />
          </div>

          {selectedPayment === 'UPI' && (
            <div className="mt-6">
              <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                UPI ID
              </label>
              <input
                id="upi-id"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
          )}

          <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center text-blue-700 dark:text-blue-300 font-semibold mb-1">
              <Lock className="w-4 h-4 mr-2" /> Secure Blockchain Escrow
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              Payment will be held in blockchain escrow until delivery confirmation
            </p>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="w-full">
          <button type="submit" className="w-full py-4 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition shadow-lg">
            Place Order - ₹{order.totalAmount}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CheckoutPage;