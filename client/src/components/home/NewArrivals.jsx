import { motion } from 'framer-motion';
import { newArrivals } from '../../data/homepage';
import SectionTitle from '../ui/SectionTitle';

const NewArrivals = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <SectionTitle 
          title="New Arrivals" 
          subtitle="Fresh beauty products just landed"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="relative overflow-hidden bg-gray-100 aspect-square mb-4 rounded-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <span className="absolute top-4 left-4 bg-charcoal text-white text-xs px-3 py-1 uppercase tracking-wider">
                  {product.badge}
                </span>

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button className="bg-white p-3 rounded-full hover:bg-gold hover:text-white transition-colors">
                    <i className="ri-heart-line text-lg"></i>
                  </button>
                  <button className="bg-white p-3 rounded-full hover:bg-gold hover:text-white transition-colors">
                    <i className="ri-shopping-cart-line text-lg"></i>
                  </button>
                </div>
              </div>

              <div className="px-1">
                <p className="text-xs text-gold font-medium uppercase tracking-wider mb-1">
                  {product.brand}
                </p>
                <h3 className="font-medium text-charcoal mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  <div className="flex text-gold text-sm">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={i < Math.floor(product.rating) ? 'ri-star-fill' : 'ri-star-line'}></i>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
