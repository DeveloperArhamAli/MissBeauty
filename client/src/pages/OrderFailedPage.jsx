import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OrderFailedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state || {};

  const orderData = {
    orderNumber: orderDetails.orderNumber || 'RUK-2024-001234',
    total: orderDetails.total || 3097,
    errorMessage: orderDetails.errorMessage || 'Your payment could not be processed. Please try again.',
    items: [
      {
        id: 1,
        name: "HD Foundation - Flawless Finish",
        brand: "Rivaj HD",
        price: 1299,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1595051665600-afd01ea7c446?w=200&q=80"
      },
      {
        id: 2,
        name: "Matte Lipstick - Nude Collection",
        brand: "Rivaj UK",
        price: 899,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&q=80"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="container-custom py-8">
        <div className="max-w-2xl mx-auto">
          {/* Failure Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-sm text-center mb-6"
          >
            {/* Failure Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <i className="ri-close-line text-5xl text-red-500"></i>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-3">
                Payment Failed
              </h1>
              <p className="text-gray-600 mb-6">
                We couldn&apos;t process your payment. Don&apos;t worry, your items are still saved.
              </p>

              {/* Error Message */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <i className="ri-error-warning-line text-red-500 text-xl flex-shrink-0 mt-0.5"></i>
                  <div className="text-left">
                    <p className="text-sm font-medium text-red-800 mb-1">Error Details</p>
                    <p className="text-sm text-red-600">{orderData.errorMessage}</p>
                  </div>
                </div>
              </div>

              {/* Order Number */}
              {orderData.orderNumber && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-xs text-gray-500 mb-1">Reference Number</p>
                  <p className="text-lg font-bold text-charcoal font-mono">
                    {orderData.orderNumber}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Why Payment Failed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6"
          >
            <h2 className="text-xl font-serif font-bold text-charcoal mb-4">Why did my payment fail?</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-bank-card-line text-gray-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">Insufficient Funds</p>
                  <p className="text-xs text-gray-500">Check your account balance and try again.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-error-warning-line text-gray-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">Incorrect Card Details</p>
                  <p className="text-xs text-gray-500">Verify your card number, expiry date, and CVV.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-shield-flash-line text-gray-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">Bank Security Block</p>
                  <p className="text-xs text-gray-500">Your bank may have blocked this transaction. Contact them to authorize it.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-global-line text-gray-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">Network Issue</p>
                  <p className="text-xs text-gray-500">A connection problem may have interrupted the payment. Try again.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Saved Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6"
          >
            <h2 className="text-xl font-serif font-bold text-charcoal mb-4">Your Items Are Safe</h2>
            
            <div className="space-y-3">
              {orderData.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <div className="w-16 h-16 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gold font-medium uppercase tracking-wider">{item.brand}</p>
                    <p className="text-sm font-medium text-charcoal">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Qty: {item.quantity} × Rs. {item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-charcoal">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between text-charcoal font-bold">
              <span>Total Amount</span>
              <span>Rs. {orderData.total.toLocaleString()}</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="space-y-3"
          >
            <button
              onClick={() => navigate('/payment')}
              className="w-full bg-gold text-white py-4 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-gold-dark transition-colors flex items-center justify-center gap-2"
            >
              <i className="ri-refresh-line"></i>
              Try Again
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/checkout"
                className="border-2 border-charcoal text-charcoal py-4 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-charcoal hover:text-white transition-colors text-center flex items-center justify-center gap-2"
              >
                <i className="ri-arrow-left-line"></i>
                Back to Checkout
              </Link>
              <Link
                to="/shop"
                className="border-2 border-charcoal text-charcoal py-4 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-charcoal hover:text-white transition-colors text-center flex items-center justify-center gap-2"
              >
                <i className="ri-shopping-bag-line"></i>
                Shop More
              </Link>
            </div>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-gray-500">
              Still having issues?{' '}
              <Link to="/contact" className="text-gold hover:text-gold-dark font-medium transition-colors">
                Contact our support team
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderFailedPage;