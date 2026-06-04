import { motion } from 'framer-motion';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

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
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="bg-white p-3 rounded-full hover:bg-gold hover:text-white transition-colors"
            >
              <i className="ri-heart-line text-lg"></i>
            </motion.button>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="bg-white p-3 rounded-full hover:bg-gold hover:text-white transition-colors"
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
        <button className="w-full bg-charcoal text-white py-3 text-sm uppercase tracking-wider hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-2">
          <i className="ri-shopping-cart-line"></i>
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
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
