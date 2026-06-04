import { motion } from 'framer-motion';
import { instagramPosts } from '../../data/homepage';
import SectionTitle from '../ui/SectionTitle';

const InstagramGallery = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <SectionTitle 
          title="Follow Us On Instagram" 
          subtitle="@silkhue"
        />

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl aspect-square"
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <i className="ri-instagram-fill text-3xl mb-2 block"></i>
                  <p className="text-sm font-medium">{post.likes.toLocaleString()} likes</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
