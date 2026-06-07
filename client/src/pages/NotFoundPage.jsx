import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <div className="text-8xl md:text-9xl font-serif font-bold text-gold mb-4">404</div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-8 text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-gold text-white px-8 py-3.5 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-gold-dark transition-colors inline-flex items-center justify-center gap-2"
          >
            <i className="ri-home-line"></i>
            Go Home
          </Link>
          <Link
            to="/shop"
            className="border-2 border-charcoal text-charcoal px-8 py-3.5 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-charcoal hover:text-white transition-colors inline-flex items-center justify-center gap-2"
          >
            <i className="ri-shopping-bag-line"></i>
            Shop Now
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;