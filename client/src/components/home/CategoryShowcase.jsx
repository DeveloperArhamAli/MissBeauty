import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '../../data/homepage';
import SectionTitle from '../ui/SectionTitle';

const CategoryShowcase = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <SectionTitle 
          title="Shop by Category" 
          subtitle="Discover our premium beauty collections"
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/category/${category.slug}`}
                className="group block relative overflow-hidden rounded-2xl aspect-[3/4]"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-1">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    {category.count} Products
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold text-sm font-medium uppercase tracking-wider">
                    Shop Now <i className="ri-arrow-right-line"></i>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
