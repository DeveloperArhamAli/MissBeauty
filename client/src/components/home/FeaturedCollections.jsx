import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { featuredCollections } from '../../data/homepage';
import SectionTitle from '../ui/SectionTitle';

const FeaturedCollections = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <SectionTitle 
          title="Featured Collections" 
          subtitle="Curated beauty collections for every need"
        />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {featuredCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <Link
                to={`/collections/${collection.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                
                <h3 className="text-2xl text-charcoal mb-2">
                  {collection.name}
                </h3>
                <p className="text-gray-600 mb-3">
                  {collection.description}
                </p>
                <span className="inline-flex items-center gap-2 text-gold font-medium uppercase text-sm tracking-wider">
                  {collection.count} Products <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
