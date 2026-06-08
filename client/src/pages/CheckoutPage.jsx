import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';

const CheckoutPage = () => {
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const cartItems = useCartStore((state) => state.items);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = shippingMethod === 'express' ? 299 : subtotal > 1999 ? 0 : 199;
  const total = subtotal + shippingCost;

  const handleSumbit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                    <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">Shipping Information</h2>
                    
                    <form className="space-y-4" onSubmit={handleSumbit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">First Name *</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                            placeholder="Enter first name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">Last Name *</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                            placeholder="Enter last name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Email Address *</label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                          placeholder="example@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                          placeholder="+92 300 1234567"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Address *</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                          placeholder="House No., Street Name"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">City *</label>
                          <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors">
                            <option value="">Select City</option>
                            <option value="lahore">Lahore</option>
                            <option value="karachi">Karachi</option>
                            <option value="islamabad">Islamabad</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">State *</label>
                          <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors">
                            <option value="">Select State</option>
                            <option value="punjab">Punjab</option>
                            <option value="sindh">Sindh</option>
                            <option value="kpk">KPK</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">ZIP Code</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                            placeholder="54000"
                          />
                        </div>
                      </div>

                      {/* Shipping Method */}
                      <div>
                        <h3 className="text-lg font-serif font-bold text-charcoal mb-4 mt-6">Shipping Method</h3>
                        <div className="space-y-3">
                          <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            shippingMethod === 'standard' ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <input
                              type="radio"
                              name="shipping"
                              value="standard"
                              checked={shippingMethod === 'standard'}
                              onChange={(e) => setShippingMethod(e.target.value)}
                              className="w-5 h-5 text-gold focus:ring-gold"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-charcoal">Standard Delivery</span>
                                <span className="text-sm text-gray-500">3-5 Business Days</span>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                {subtotal > 1999 ? 'Free' : `Rs. 199`}
                              </p>
                            </div>
                          </label>

                          <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            shippingMethod === 'express' ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <input
                              type="radio"
                              name="shipping"
                              value="express"
                              checked={shippingMethod === 'express'}
                              onChange={(e) => setShippingMethod(e.target.value)}
                              className="w-5 h-5 text-gold focus:ring-gold"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-charcoal">Express Delivery</span>
                                <span className="text-sm text-gray-500">1-2 Business Days</span>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">Rs. 299</p>
                            </div>
                          </label>
                        </div>
                      </div>
                      
                      <Link
                        to={"/payment"}
                        className="w-full inline-block text-center bg-gold text-white py-4 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-gold-dark transition-colors mt-6"
                      >
                        Continue to Payment
                      </Link> 
                    </form>
                  </div>
                </motion.div>

            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96">
            {/* Mobile Order Summary Toggle */}
            <button
              onClick={() => setShowOrderSummary(!showOrderSummary)}
              className="lg:hidden w-full bg-white rounded-xl p-4 mb-4 shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="font-medium text-charcoal">Order Summary</span>
                <span className="text-sm text-gray-500 ml-2">Rs. {total.toLocaleString()}</span>
              </div>
              <i className={`ri-arrow-${showOrderSummary ? 'up' : 'down'}-s-line text-gray-500`}></i>
            </button>

            <div className={`bg-white rounded-2xl p-6 shadow-sm lg:sticky lg:top-24 ${showOrderSummary ? 'block' : 'hidden lg:block'}`}>
              <h3 className="text-xl font-serif font-bold text-charcoal mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-charcoal text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.variant && `${item.variant}`}</p>
                      <p className="text-sm font-semibold text-charcoal mt-1">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
                />
                <button className="px-4 py-2.5 bg-charcoal text-white rounded-lg text-sm font-medium hover:bg-gold transition-colors">
                  Apply
                </button>
              </div>

              <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                    {shippingCost === 0 ? 'Free' : `Rs. ${shippingCost.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-charcoal font-bold text-lg pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <i className="ri-lock-line text-gold"></i>
                  <span>SSL Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <i className="ri-shield-check-line text-gold"></i>
                  <span>Your data is protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;