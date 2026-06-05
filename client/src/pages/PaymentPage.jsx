import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [processing, setProcessing] = useState(false);
  const [countdown, setCountdown] = useState(15);

  // Sample order data
  const orderData = {
    orderNumber: 'SH-2024-001234',
    items: [
      {
        id: 1,
        name: "HD Foundation - Flawless Finish",
        brand: "Silk Hue HD",
        price: 1299,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1595051665600-afd01ea7c446?w=200&q=80"
      },
      {
        id: 2,
        name: "Matte Lipstick - Nude Collection",
        brand: "Silk Hue",
        price: 899,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&q=80"
      }
    ],
    subtotal: 3097,
    shipping: 0,
    total: 3097,
    shippingAddress: {
      name: "John Doe",
      street: "123 Beauty Street, Gulberg III",
      city: "Lahore",
      state: "Punjab",
      zip: "54000",
      phone: "+92 300 1234567"
    }
  };

  // Auto-redirect countdown for COD
  useEffect(() => {
    let timer;
    if (processing && paymentMethod === 'cod') {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/order-success', { 
              state: { 
                orderNumber: orderData.orderNumber,
                total: orderData.total,
                paymentMethod: 'cod'
              }
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [processing, paymentMethod, navigate, orderData.orderNumber, orderData.total]);

  const handlePayment = async () => {
    if (paymentMethod === 'card') {
      // Basic validation
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        alert('Please fill in all card details');
        return;
      }
    }

    setProcessing(true);

    // Simulate payment processing
    if (paymentMethod === 'card') {
      setTimeout(() => {
        // Simulate 90% success rate
        const isSuccess = Math.random() > 0.1;
        if (isSuccess) {
          navigate('/order-success', { 
            state: { 
              orderNumber: orderData.orderNumber,
              total: orderData.total,
              paymentMethod: 'card'
            }
          });
        } else {
          navigate('/order-failed', { 
            state: { 
              orderNumber: orderData.orderNumber,
              total: orderData.total,
              errorMessage: 'Payment was declined by your bank. Please try a different payment method.'
            }
          });
        }
      }, 2000);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className=" border-b border-gray-100">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/checkout" className="text-sm text-gray-600 hover:text-gold transition-colors flex items-center gap-1">
                <i className="ri-arrow-left-line"></i>
                Back to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          {!processing ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Payment Methods */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
                >
                  <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">Payment Method</h2>
                  
                  <div className="space-y-4">
                    {/* Cash on Delivery */}
                    <label className={`flex items-start gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-gold bg-gold/5 shadow-md' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 mt-0.5 text-gold focus:ring-gold"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                            <i className="ri-cash-line text-2xl text-green-600"></i>
                          </div>
                          <div>
                            <span className="font-medium text-charcoal text-lg">Cash on Delivery</span>
                            <span className="ml-2 px-2 py-0.5 bg-green-50 text-green-600 text-xs rounded-full font-medium">Recommended</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 ml-13">Pay when you receive your order. No additional charges.</p>
                      </div>
                      {paymentMethod === 'cod' && (
                        <i className="ri-checkbox-circle-fill text-gold text-2xl"></i>
                      )}
                    </label>

                    {/* Credit/Debit Card */}
                    <label className={`flex items-start gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-gold bg-gold/5 shadow-md' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 mt-0.5 text-gold focus:ring-gold"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                            <i className="ri-bank-card-line text-2xl text-blue-600"></i>
                          </div>
                          <span className="font-medium text-charcoal text-lg">Credit/Debit Card</span>
                        </div>
                        <p className="text-sm text-gray-500 ml-13">Pay securely with your card. We accept Visa and Mastercard.</p>
                        
                        {/* Card Icons */}
                        <div className="flex gap-2 mt-2 ml-13">
                          <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                          <div className="w-10 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                        </div>
                      </div>
                      {paymentMethod === 'card' && (
                        <i className="ri-checkbox-circle-fill text-gold text-2xl"></i>
                      )}
                    </label>
                  </div>

                  {/* Card Details Form */}
                  <AnimatePresence>
                    {paymentMethod === 'card' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                          <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Card Details</h3>
                          
                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-2">Card Number</label>
                            <div className="relative">
                              <input
                                type="text"
                                maxLength="19"
                                value={cardDetails.number}
                                onChange={(e) => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                                placeholder="1234 5678 9012 3456"
                              />
                              <i className="ri-bank-card-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-2">Cardholder Name</label>
                            <input
                              type="text"
                              value={cardDetails.name}
                              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                              placeholder="John Doe"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-charcoal mb-2">Expiry Date</label>
                              <input
                                type="text"
                                maxLength="5"
                                value={cardDetails.expiry}
                                onChange={(e) => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-charcoal mb-2">CVV</label>
                              <div className="relative">
                                <input
                                  type="password"
                                  maxLength="3"
                                  value={cardDetails.cvv}
                                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/[^0-9]/g, '') })}
                                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                                  placeholder="123"
                                />
                                <i className="ri-question-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-help" title="3-digit security code on the back of your card"></i>
                              </div>
                            </div>
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                            <i className="ri-shield-check-line text-blue-600 text-xl mt-0.5"></i>
                            <div>
                              <p className="text-sm font-medium text-blue-800">Your payment is secure</p>
                              <p className="text-xs text-blue-600 mt-1">We use 256-bit SSL encryption to protect your data. We never store your card details.</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm lg:sticky lg:top-24">
                  <h3 className="text-xl font-serif font-bold text-charcoal mb-6">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    {orderData.items.map((item) => (
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
                          <p className="text-xs text-gray-500">{item.brand}</p>
                          <p className="text-sm font-semibold text-charcoal mt-1">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>Rs. {orderData.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-charcoal font-bold text-lg pt-3 border-t border-gray-100">
                      <span>Total</span>
                      <span>Rs. {orderData.total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Pay Button */}
                  <button
                    onClick={handlePayment}
                    className="w-full bg-gold text-white py-4 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-gold-dark transition-colors mt-6"
                  >
                    {paymentMethod === 'cod' ? 'Place Order' : `Pay Rs. ${orderData.total.toLocaleString()}`}
                  </button>

                  {/* Trust Badges */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <i className="ri-lock-line text-gold"></i>
                      <span>SSL Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <i className="ri-shield-check-line text-gold"></i>
                      <span>100% Protected</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <i className="ri-arrow-go-back-line text-gold"></i>
                      <span>30-Day Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Processing State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-sm text-center max-w-lg mx-auto"
            >
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">Processing Payment</h2>
              <p className="text-gray-600 mb-6">
                {paymentMethod === 'cod' 
                  ? 'Placing your order...' 
                  : 'Please wait while we process your payment...'}
              </p>
              
              {paymentMethod === 'cod' && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-2">Redirecting to confirmation in</p>
                  <div className="text-3xl font-bold text-gold">{countdown}s</div>
                </div>
              )}

              <p className="text-xs text-gray-400 mt-6">Do not close this page</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;