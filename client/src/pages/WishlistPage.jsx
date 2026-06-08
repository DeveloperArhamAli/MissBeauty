import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';

const WishlistPage = () => {
  const wishlistItems = useWishlistStore((state) => state.items);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);

  const addToCart = useCartStore((state) => state.addToCart);

  const addAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock);
    inStockItems.forEach((item) => addToCart({ ...item, quantity: 1 }));
  };

  return (
    <div className="min-h-screen bg-gray-50">

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
            <span className="text-charcoal font-medium">Wishlist</span>
          </nav>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal">My Wishlist</h1>
              <p className="text-gray-500 mt-1">{wishlistItems.length} items saved</p>
            </div>
            {wishlistItems.length > 0 && (
              <button
                onClick={addAllToCart}
                className="bg-gold text-white px-6 py-3 rounded-lg text-sm uppercase tracking-wider font-medium hover:bg-gold-dark transition-colors flex items-center gap-2"
              >
                <i className="ri-shopping-cart-line"></i>
                Add All to Cart
              </button>
            )}
          </div>
        </motion.div>

        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-heart-line text-4xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-serif font-bold text-charcoal mb-2">Your Wishlist is Empty</h3>
            <p className="text-gray-500 mb-6">Save your favorite items to wishlist</p>
            <Link
              to="/shop"
              className="inline-flex bg-charcoal text-white px-8 py-3 rounded-lg text-sm uppercase tracking-wider font-medium hover:bg-gold transition-colors"
            >
              Discover Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white text-charcoal px-4 py-2 rounded-full text-sm font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {item.oldPrice && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Sale
                    </span>
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <i className="ri-heart-fill text-sm"></i>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <p className="text-xs text-gold font-medium uppercase tracking-wider mb-1">{item.brand}</p>
                  <h3 className="text-sm font-medium text-charcoal mb-2 line-clamp-2">{item.name}</h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-gold text-xs">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={i < Math.floor(item.rating) ? 'ri-star-fill' : 'ri-star-line'}></i>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({item.reviews})</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-charcoal">Rs. {item.price.toLocaleString()}</span>
                    {item.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">Rs. {item.oldPrice.toLocaleString()}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={!item.inStock}
                    onClick={() => addToCart({ ...item, quantity: 1 })}
                    className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                      item.inStock
                        ? 'bg-charcoal text-white hover:bg-gold'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <i className="ri-shopping-cart-line"></i>
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>

                  <p className="text-xs text-gray-400 mt-2">Added {item.addedDate}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;