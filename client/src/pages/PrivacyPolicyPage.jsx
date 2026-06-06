import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-8 md:py-12">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-charcoal font-medium">Privacy Policy</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-charcoal mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: June 1, 2024</p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h2>1. Information We Collect</h2>
          <p>When you visit our website, we may collect the following types of information:</p>
          <ul>
            <li>Personal identification information (Name, email address, phone number, etc.)</li>
            <li>Payment information (processed securely through our payment partners)</li>
            <li>Browsing behavior and preferences</li>
            <li>Device and browser information</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the collected information for various purposes:</p>
          <ul>
            <li>To process and fulfill your orders</li>
            <li>To communicate with you about your orders and account</li>
            <li>To send promotional emails (with your consent)</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>3. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information, including SSL encryption for all transactions.</p>

          <h2>4. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at:</p>
          <p>Email: privacy@silkhue.com<br />Phone: +92 42 1234 5678</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;