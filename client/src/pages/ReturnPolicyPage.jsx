import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ReturnPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-8 md:py-12">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-charcoal font-medium">Return Policy</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-charcoal mb-2">Return & Exchange Policy</h1>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h2>30-Day Return Policy</h2>
          <p>We offer a 30-day return policy for unused and unopened products in their original packaging.</p>

          <h2>How to Return</h2>
          <ol>
            <li>Log into your account and go to My Orders</li>
            <li>Select the order and click Return Item</li>
            <li>Follow the instructions to generate a return label</li>
            <li>Pack the item securely and drop it at the designated location</li>
          </ol>

          <h2>Refund Timeline</h2>
          <p>Refunds are processed within 5-7 business days after we receive and inspect the returned item.</p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;