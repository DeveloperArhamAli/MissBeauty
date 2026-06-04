import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/homepage';
import SectionTitle from '../ui/SectionTitle';

const BeautyBlog = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <SectionTitle 
          title="Beauty Blog" 
          subtitle="Tips, trends, and beauty insights"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="group cursor-pointer"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-gray-500">{post.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-charcoal group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <span className="inline-flex items-center gap-2 text-gold font-medium text-sm uppercase tracking-wider">
                    Read More <i className="ri-arrow-right-line"></i>
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeautyBlog;
