import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ShippingPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-8 md:py-12">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-charcoal font-medium">Shipping Policy</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-charcoal mb-2">Shipping Policy</h1>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h2>Shipping Options</h2>
          <ul>
            <li><strong>Standard Delivery:</strong> 3-5 business days - Rs. 199 (Free on orders above Rs. 1,999)</li>
            <li><strong>Express Delivery:</strong> 1-2 business days - Rs. 299</li>
          </ul>

          <h2>Delivery Areas</h2>
          <p>We currently deliver to all major cities across Pakistan including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, and more.</p>

          <h2>Order Tracking</h2>
          <p>Once your order ships, you&apos;ll receive a tracking number via email. Track your order <Link to="/track-order" className="text-gold">here</Link>.</p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;