import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useCartStore from '../store/useCartStore';

const CartDrawer = ({ isOpen, onClose }) => {
  const cartItems = useCartStore((state) => state.items);
  const updateQuantityInStore = useCartStore((state) => state.updateQuantity);
  const removeItemFromStore = useCartStore((state) => state.removeFromCart);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const updateQuantity = (lineId, newQuantity) => {
    updateQuantityInStore(lineId, newQuantity)
  };

  const removeItem = (lineId) => {
    removeItemFromStore(lineId)
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 1999 ? 0 : 199;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 flex-shrink-0">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-charcoal">
                  Shopping Cart
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-charcoal"
              >
                <i className="ri-close-line text-2xl cursor-pointer"></i>
              </button>
            </div>

            {/* Cart Items - Scrollable */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <i className="ri-shopping-cart-line text-4xl text-gray-400"></i>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-charcoal mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 text-sm mb-6">Looks like you haven&apos;t added anything yet</p>
                  <button
                    onClick={onClose}
                    className="bg-charcoal text-white px-8 py-3 rounded-lg text-sm uppercase tracking-wider hover:bg-gold transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.lineId}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gold font-medium uppercase tracking-wider mb-1">
                          {item.brand}
                        </p>
                        <h4 className="text-sm font-medium text-charcoal mb-1 line-clamp-2">
                          {item.name}
                        </h4>
                        
                        {item.variant && (
                          <p className="text-xs text-gray-500 mb-1">Shade: {item.variant}</p>
                        )}
                        {item.size && (
                          <p className="text-xs text-gray-500 mb-1">Size: {item.size}</p>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-semibold text-charcoal">
                            Rs. {item.price.toLocaleString()}
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                            <button
                              onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500"
                            >
                              <i className="ri-subtract-line text-sm"></i>
                            </button>
                            <span className="w-8 h-7 flex items-center justify-center text-xs font-medium text-charcoal border-x border-gray-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500"
                            >
                              <i className="ri-add-line text-sm"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.lineId)}
                        className="self-start p-1 hover:text-red-500 transition-colors text-gray-400"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </motion.div>
                  ))}

                  {/* Free Shipping Progress */}
                  {subtotal < 1999 && (
                    <div className="bg-gold/5 border border-gold/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="ri-truck-line text-gold"></i>
                        <p className="text-sm text-charcoal font-medium">
                          Add Rs. {(1999 - subtotal).toLocaleString()} more for free shipping!
                        </p>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((subtotal / 1999) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer - Fixed at bottom */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 p-4 sm:p-6 space-y-4 bg-white flex-shrink-0">
                {/* Order Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                      {shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-charcoal font-semibold text-base pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="block w-full bg-gold text-white py-3.5 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-gold-dark transition-colors text-center"
                  >
                    Proceed to Checkout
                  </Link>
                  <button
                    onClick={onClose}
                    className="block w-full border-2 border-charcoal text-charcoal py-3.5 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-charcoal hover:text-white transition-colors text-center"
                  >
                    Continue Shopping
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2">
                  <span className="flex items-center gap-1">
                    <i className="ri-shield-check-line text-gold"></i>
                    Secure Checkout
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-arrow-go-back-line text-gold"></i>
                    Easy Returns
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

CartDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CartDrawer;