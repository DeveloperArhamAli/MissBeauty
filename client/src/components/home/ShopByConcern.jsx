import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { concerns } from '../../data/homepage';
import SectionTitle from '../ui/SectionTitle';

const ShopByConcern = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <SectionTitle 
          title="Shop by Concern" 
          subtitle="Targeted solutions for your beauty needs"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-3">
          {concerns.map((concern, index) => (
            <motion.div
              key={concern.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/concern/${concern.slug}`}
                className="group bg-white p-6 rounded-2xl text-center block hover:shadow-lg transition-all duration-300 h-full border border-transparent hover:border-gold/20"
              >
                <div className="w-16 h-16 bg-nude-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/10 transition-colors duration-300">
                  <i className={`${concern.icon} text-2xl text-gold group-hover:scale-110 transition-transform duration-300`}></i>
                </div>
                <h3 className="text-lg font-serif font-bold text-charcoal mb-2 group-hover:text-gold transition-colors">
                  {concern.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {concern.description}
                </p>
                <span className="inline-flex items-center justify-center gap-1 text-gold text-sm font-medium">
                  Explore <i className="ri-arrow-right-line text-sm"></i>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByConcern;