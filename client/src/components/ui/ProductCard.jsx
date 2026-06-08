import { motion } from 'framer-motion';
import { useState } from 'react';
import PropTypes from 'prop-types';
import useCartStore from '../../store/useCartStore';
import useWishlistStore from '../../store/useWishlistStore';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);
  
  const cartItem = cartItems.find(item => item.id === product.id);
  const inWishlist = isInWishlist(product.id || product._id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-gray-100 aspect-square mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
            product.badge === 'Sale' 
              ? 'bg-red-500 text-white' 
              : product.badge === 'New'
              ? 'bg-charcoal text-white'
              : 'bg-gold text-white'
          }`}>
            {product.badge}
          </span>
        )}

        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            <motion.button
              type="button"
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
              onClick={() => toggleWishlist(product)}
              className={`py-2 px-3 cursor-pointer rounded-full transition-colors ${inWishlist ? 'bg-gold text-white' : 'bg-white text-charcoal hover:bg-gold hover:text-white'}`}
            >
              <i className={`${inWishlist ? 'ri-heart-fill' : 'ri-heart-line'} text-lg`}></i>
            </motion.button>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="bg-white py-2 px-3 cursor-pointer rounded-full hover:bg-gold hover:text-white transition-colors"
            >
              <i className="ri-eye-line text-lg"></i>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-1">
        <p className="text-xs text-gold font-medium uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <h3 className="text-sm font-medium text-charcoal mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-gold text-sm">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={i < Math.floor(product.rating) ? 'ri-star-fill' : 'ri-star-line'}
              ></i>
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-semibold text-charcoal">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              Rs. {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        {cartItem ? (
          <div className="w-full bg-charcoal text-white py-3 text-sm uppercase tracking-wider flex items-center justify-between px-4 rounded-lg">
            <button
              type="button"
              onClick={() => updateQuantity(cartItem.lineId, cartItem.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-white hover:text-charcoal transition-colors rounded"
            >
              <i className="ri-subtract-line"></i>
            </button>
            <span className="font-semibold text-base">{cartItem.quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(cartItem.lineId, cartItem.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-white hover:text-charcoal transition-colors rounded"
            >
              <i className="ri-add-line"></i>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="w-full bg-charcoal text-white py-3 text-sm uppercase tracking-wider hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-2 rounded-lg"
          >
            <i className="ri-shopping-cart-line"></i>
            Add to Cart
          </button>
        )}
      </div>
    </motion.div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    oldPrice: PropTypes.number,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    badge: PropTypes.string
  }).isRequired
};

export default ProductCard;
