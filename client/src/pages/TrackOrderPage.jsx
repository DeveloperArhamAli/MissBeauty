import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

const TrackOrderPage = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');

  const { orderId } = useParams();

  const fetchOrder = (orderIdToTrack) => {
    const normalizedOrderId = orderIdToTrack?.toUpperCase() || '';
    setOrderNumber(normalizedOrderId);
    setError('');
    setIsTracking(true);
    setOrderDetails(null);

    // Simulate API call
    setTimeout(() => {
      if (normalizedOrderId === 'SH-2024-001234') {
        setOrderDetails({
          orderNumber: 'SH-2024-001234',
          status: 'shipped',
          estimatedDelivery: 'June 25, 2024',
          currentLocation: 'Lahore Distribution Center',
          timeline: [
            { status: 'Order Placed', date: 'June 15, 2024 - 2:30 PM', completed: true },
            { status: 'Order Confirmed', date: 'June 15, 2024 - 3:00 PM', completed: true },
            { status: 'Processing', date: 'June 16, 2024 - 10:00 AM', completed: true },
            { status: 'Shipped', date: 'June 17, 2024 - 4:00 PM', completed: true },
            { status: 'Out for Delivery', date: 'Expected June 24, 2024', completed: false },
            { status: 'Delivered', date: 'Expected June 25, 2024', completed: false },
          ]
        });
      } else {
        setError('No order found with this number. Please check and try again.');
        setOrderDetails(null);
      }
      setIsTracking(false);
    }, 1500);
  };

  useEffect(() => {
    if (!orderId) return;
    fetchOrder(orderId);
  }, [orderId]);

  const handleTrack = (e) => {
    e.preventDefault();
    fetchOrder(orderNumber);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="container-custom py-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4 text-center">
              Track Your Order
            </h1>
            <p className="text-gray-500 text-center mb-8">
              Enter your order number to check the status of your delivery
            </p>
          </motion.div>

          {/* Track Form */}
          {!orderDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <form onSubmit={handleTrack} className="max-w-md mx-auto space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Order Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                      placeholder="e.g., SH-2024-001234"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors font-mono"
                      required
                    />
                    <i className="ri-file-list-3-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Email Address (optional)
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Order confirmation email"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                    />
                    <i className="ri-mail-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                    <i className="ri-error-warning-line"></i>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isTracking}
                  className="w-full bg-gold text-white py-3.5 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-gold-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isTracking ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <i className="ri-search-line"></i>
                      Track Order
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  You can find your order number in the confirmation email or in your{' '}
                  <Link to="/orders" className="text-gold hover:text-gold-dark font-medium">order history</Link>
                </p>
              </form>
            </motion.div>
          )}

          {/* Tracking Result */}
          {orderDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Order Status Card */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Order Number</p>
                    <h2 className="text-2xl font-bold text-charcoal font-mono">{orderDetails.orderNumber}</h2>
                  </div>
                  <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-2">
                    <i className="ri-truck-line"></i>
                    {orderDetails.status.charAt(0).toUpperCase() + orderDetails.status.slice(1)}
                  </span>
                </div>

                <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-map-pin-line text-2xl text-gold"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal">Current Location</p>
                    <p className="text-lg font-bold text-gold">{orderDetails.currentLocation}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <i className="ri-calendar-check-line text-gold"></i>
                  <span className="text-gray-600">
                    Estimated Delivery: <strong className="text-charcoal">{orderDetails.estimatedDelivery}</strong>
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="text-xl font-serif font-bold text-charcoal mb-6">Delivery Timeline</h3>
                
                <div className="space-y-0">
                  {orderDetails.timeline.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          <i className={step.completed ? 'ri-check-line' : 'ri-time-line text-lg'}></i>
                        </div>
                        {index < orderDetails.timeline.length - 1 && (
                          <div className={`w-0.5 h-12 ${step.completed ? 'bg-green-200' : 'bg-gray-200'}`}></div>
                        )}
                      </div>
                      <div className="pb-8">
                        <p className={`font-medium ${step.completed ? 'text-charcoal' : 'text-gray-400'}`}>
                          {step.status}
                        </p>
                        <p className="text-sm text-gray-500">{step.date}</p>
                        {index === orderDetails.timeline.findIndex(s => !s.completed) && step.completed && (
                          <div className="mt-2 flex items-center gap-2 text-gold">
                            <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs font-medium">In Progress</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <p className="text-gray-600 mb-3">Need help with your order?</p>
                <div className="flex justify-center gap-4">
                  <Link to="/contact" className="text-gold hover:text-gold-dark font-medium transition-colors flex items-center gap-1">
                    <i className="ri-customer-service-2-line"></i>
                    Contact Support
                  </Link>
                  <Link to="/faq" className="text-gold hover:text-gold-dark font-medium transition-colors flex items-center gap-1">
                    <i className="ri-question-line"></i>
                    View FAQ
                  </Link>
                </div>
              </div>

              {/* Track Another */}
              <button
                onClick={() => {
                  setOrderDetails(null);
                  setOrderNumber('');
                  setError('');
                }}
                className="w-full border-2 border-charcoal text-charcoal py-3 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-charcoal hover:text-white transition-colors"
              >
                Track Another Order
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;