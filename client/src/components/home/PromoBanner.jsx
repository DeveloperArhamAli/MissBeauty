import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PromoBanner = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="bg-nude-light rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-square md:aspect-auto"
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1661337068033-6f2ded49fed7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Summer Beauty Essentials"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center p-8 md:p-16"
            >
              <div>
                <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
                  Limited Time Offer
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
                  Summer Beauty Essentials
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Discover our curated collection of summer must-haves. From lightweight moisturizers 
                  to long-lasting makeup, everything you need for a radiant summer glow.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/summer-collection"
                    className="bg-charcoal text-white px-8 py-3 uppercase text-sm tracking-wider hover:bg-gold transition-colors duration-300"
                  >
                    Shop Collection
                  </Link>
                  <Link
                    to="/offers"
                    className="border-2 border-charcoal text-charcoal px-8 py-3 uppercase text-sm tracking-wider hover:bg-charcoal hover:text-white transition-colors duration-300"
                  >
                    View Offers
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
