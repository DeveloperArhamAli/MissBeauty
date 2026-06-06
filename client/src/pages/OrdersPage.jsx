import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filters = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'processing', label: 'Processing' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const orders = [
    {
      id: 'SH-2024-001234',
      date: 'June 15, 2024',
      status: 'delivered',
      total: 3097,
      items: 3,
      tracking: 'TRK123456789',
      items_list: [
        { name: "HD Foundation - Flawless Finish", brand: "Silk Hue HD", price: 1299, qty: 1, image: "https://images.unsplash.com/photo-1595051665600-afd01ea7c446?w=200&q=80" },
        { name: "Matte Lipstick - Nude Collection", brand: "Silk Hue ", price: 899, qty: 2, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&q=80" }
      ]
    },
    {
      id: 'SH-2024-001235',
      date: 'June 18, 2024',
      status: 'shipped',
      total: 2499,
      items: 1,
      tracking: 'TRK987654321',
      items_list: [
        { name: "Matte Eyeshadow Palette - 12 Shades", brand: "Silk Hue HD", price: 2499, qty: 1, image: "https://images.unsplash.com/photo-1583241800698-e8ad37617af1?w=200&q=80" }
      ]
    },
    {
      id: 'SH-2024-001236',
      date: 'June 20, 2024',
      status: 'processing',
      total: 1499,
      items: 1,
      tracking: null,
      items_list: [
        { name: "Vitamin C Brightening Serum", brand: "Silk Hue ", price: 1499, qty: 1, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&q=80" }
      ]
    }
  ];

  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeFilter);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: 'ri-time-line',
      processing: 'ri-loader-4-line',
      shipped: 'ri-truck-line',
      delivered: 'ri-check-double-line',
      cancelled: 'ri-close-circle-line'
    };
    return icons[status] || 'ri-information-line';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-4">
          <Link to="/" className="text-2xl font-serif font-bold text-charcoal">
            Silk Hue<span className="text-gold"></span>
          </Link>
        </div>
      </div>

      <div className="container-custom py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link to="/profile" className="hover:text-gold transition-colors">My Account</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-charcoal font-medium">My Orders</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-8">My Orders</h1>
        </motion.div>

        {/* Filters */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-gold text-white shadow-lg shadow-gold/25'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-4 md:p-6 flex flex-col sm:flex-row justify-between gap-4 border-b border-gray-50">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif font-bold text-charcoal text-lg">{order.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                      <i className={getStatusIcon(order.status)}></i>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-lg font-bold text-charcoal">Rs. {order.total.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                    className="text-gold hover:text-gold-dark transition-colors"
                  >
                    <i className={`ri-arrow-${selectedOrder?.id === order.id ? 'up' : 'down'}-s-line text-xl`}></i>
                  </button>
                </div>
              </div>

              {/* Order Details (Expandable) */}
              <AnimatePresence>
                {selectedOrder?.id === order.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 md:p-6 bg-gray-50">
                      {/* Order Items */}
                      <div className="space-y-3 mb-6">
                        {order.items_list.map((item, i) => (
                          <div key={i} className="flex gap-4 p-3 bg-white rounded-xl">
                            <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gold font-medium uppercase tracking-wider">{item.brand}</p>
                              <p className="text-sm font-medium text-charcoal">{item.name}</p>
                              <div className="flex justify-between mt-2">
                                <span className="text-xs text-gray-500">Qty: {item.qty}</span>
                                <span className="text-sm font-semibold">Rs. {(item.price * item.qty).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tracking Info */}
                      {order.tracking && (
                        <div className="bg-white rounded-xl p-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                              <i className="ri-truck-line text-gold"></i>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-charcoal">Tracking Number</p>
                              <p className="text-lg font-bold text-charcoal font-mono">{order.tracking}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Order Timeline */}
                      <div className="bg-white rounded-xl p-4 mb-4">
                        <h4 className="font-medium text-charcoal mb-4">Order Timeline</h4>
                        <div className="space-y-4">
                          {[
                            { status: 'Order Placed', date: order.date, completed: true },
                            { status: 'Processing', date: 'June 16, 2024', completed: order.status !== 'pending' },
                            { status: 'Shipped', date: 'June 17, 2024', completed: ['shipped', 'delivered'].includes(order.status) },
                            { status: 'Delivered', date: 'June 19, 2024', completed: order.status === 'delivered' },
                          ].map((step, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                              }`}>
                                <i className={step.completed ? 'ri-check-line' : 'ri-time-line'}></i>
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${step.completed ? 'text-charcoal' : 'text-gray-400'}`}>
                                  {step.status}
                                </p>
                                {step.completed && <p className="text-xs text-gray-500">{step.date}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        {order.tracking && (
                          <button className="flex-1 bg-charcoal text-white py-3 rounded-lg text-sm uppercase tracking-wider font-medium hover:bg-gold transition-colors flex items-center justify-center gap-2">
                            <Link to={`/track-order/${order.id}`}>
                                <i className="ri-truck-line"></i>
                                Track Order
                            </Link>
                          </button>
                        )}
                        <button className="flex-1 border-2 border-charcoal text-charcoal py-3 rounded-lg text-sm uppercase tracking-wider font-medium hover:bg-charcoal hover:text-white transition-colors flex items-center justify-center gap-2">
                          <i className="ri-file-download-line"></i>
                          Download Invoice
                        </button>
                        {order.status === 'delivered' && (
                          <button className="flex-1 border-2 border-gold text-gold py-3 rounded-lg text-sm uppercase tracking-wider font-medium hover:bg-gold hover:text-white transition-colors flex items-center justify-center gap-2">
                            <i className="ri-star-line"></i>
                            Write Review
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-file-list-3-line text-4xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-serif font-bold text-charcoal mb-2">No Orders Found</h3>
              <p className="text-gray-500 mb-6">You haven&apos;t placed any orders yet.</p>
              <Link
                to="/shop"
                className="inline-flex bg-charcoal text-white px-8 py-3 rounded-lg text-sm uppercase tracking-wider font-medium hover:bg-gold transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;