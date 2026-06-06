import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-8 md:py-12">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-charcoal font-medium">Terms of Service</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-charcoal mb-2">Terms of Service</h1>
            <p className="text-gray-600">Last updated: June 1, 2024</p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using the Silk Hue website, you agree to be bound by these Terms of Service.</p>

          <h2>2. Products and Pricing</h2>
          <p>All prices are listed in Pakistani Rupees (PKR). We reserve the right to modify prices without prior notice.</p>

          <h2>3. Orders and Payment</h2>
          <p>By placing an order, you agree to provide accurate and complete information. We accept Cash on Delivery and Credit/Debit cards.</p>

          <h2>4. Shipping and Delivery</h2>
          <p>Delivery times are estimates and may vary. We are not responsible for delays caused by circumstances beyond our control.</p>

          <h2>5. Returns and Refunds</h2>
          <p>Please refer to our Return Policy for detailed information about returns and refunds.</p>

          <h2>6. Contact</h2>
          <p>For questions about these terms, contact us at info@silkhue.com</p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;