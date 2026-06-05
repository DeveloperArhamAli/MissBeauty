import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Confetti from 'react-confetti';

const OrderSuccessPage = () => {
  const location = useLocation();
  const orderDetails = location.state || {};
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const orderData = {
    orderNumber: orderDetails.orderNumber || 'SH-2024-001234',
    orderDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    total: orderDetails.total || 3097,
    paymentMethod: orderDetails.paymentMethod || 'cod',
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
    shippingAddress: {
      name: "John Doe",
      street: "123 Beauty Street, Gulberg III",
      city: "Lahore",
      state: "Punjab",
      zip: "54000",
      phone: "+92 300 1234567"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
          colors={['#C9A66B', '#222222', '#FDF5F0', '#E8D5C4', '#D4B98C']}
        />
      )}

      <div className="container-custom py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-sm text-center mb-6"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <i className="ri-check-line text-5xl text-green-500"></i>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-3">
                Order Placed Successfully!
              </h1>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase. Your order has been confirmed.
              </p>

              {/* Order Number */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <p className="text-sm text-gray-500 mb-2">Order Number</p>
                <p className="text-2xl font-bold text-charcoal font-mono tracking-wider">
                  {orderData.orderNumber}
                </p>
              </div>

              {/* Order Info Grid */}
              <div className="grid grid-cols-3 gap-4 text-center mb-8">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Order Date</p>
                  <p className="text-sm font-medium text-charcoal">{orderData.orderDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                  <p className="text-sm font-medium text-charcoal">Rs. {orderData.total.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Payment</p>
                  <p className="text-sm font-medium text-charcoal">
                    {orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6"
          >
            <h2 className="text-xl font-serif font-bold text-charcoal mb-6">Order Details</h2>
            
            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {orderData.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gold font-medium uppercase tracking-wider">{item.brand}</p>
                    <p className="text-sm font-medium text-charcoal">{item.name}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                      <span className="text-sm font-semibold text-charcoal">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Total */}
            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Rs. {orderData.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-charcoal font-bold text-lg pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>Rs. {orderData.total.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Shipping Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6"
          >
            <h2 className="text-xl font-serif font-bold text-charcoal mb-4">Shipping Details</h2>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-map-pin-line text-blue-600"></i>
              </div>
              <div>
                <p className="font-medium text-charcoal">{orderData.shippingAddress.name}</p>
                <p className="text-sm text-gray-600">{orderData.shippingAddress.street}</p>
                <p className="text-sm text-gray-600">
                  {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zip}
                </p>
                <p className="text-sm text-gray-600">{orderData.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Estimated Delivery */}
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 flex items-center gap-3">
              <i className="ri-truck-line text-gold text-xl"></i>
              <div>
                <p className="text-sm font-medium text-charcoal">Estimated Delivery</p>
                <p className="text-lg font-bold text-gold">{orderData.estimatedDelivery}</p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/orders"
              className="flex-1 bg-charcoal text-white py-4 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-gold transition-colors text-center flex items-center justify-center gap-2"
            >
              <i className="ri-file-list-line"></i>
              Track Order
            </Link>
            <Link
              to="/shop"
              className="flex-1 border-2 border-charcoal text-charcoal py-4 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-charcoal hover:text-white transition-colors text-center flex items-center justify-center gap-2"
            >
              <i className="ri-shopping-bag-line"></i>
              Continue Shopping
            </Link>
          </motion.div>

          {/* Need Help */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-gray-500">
              Need help with your order?{' '}
              <Link to="/contact" className="text-gold hover:text-gold-dark font-medium transition-colors">
                Contact Support
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;