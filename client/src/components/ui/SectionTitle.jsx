import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const SectionTitle = ({ title, subtitle, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`text-center mb-12 ${className}`}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight text-charcoal mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
    </motion.div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string
};

export default SectionTitle;
