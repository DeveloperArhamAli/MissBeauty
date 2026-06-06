import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BlogPostPage = () => {
  const post = {
    id: 1,
    title: "10 Skincare Tips for Glowing Skin This Summer",
    category: "Skincare",
    date: "June 15, 2024",
    author: "Sarah Ahmed",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4ee8e78?w=1200&q=80",
    content: `
      <p>Summer brings sunshine, beach days, and unfortunately, unique challenges for your skin. From increased oil production to sun damage, your skin needs extra care during the warmer months. Here are our top 10 tips for maintaining that summer glow.</p>
      
      <h2>1. Never Skip Sunscreen</h2>
      <p>This is non-negotiable. Apply a broad-spectrum SPF 50 sunscreen every morning, even on cloudy days. Reapply every 2 hours if you're spending time outdoors. Our SPF 50 Sunscreen is lightweight and perfect for daily use.</p>
      
      <h2>2. Stay Hydrated</h2>
      <p>Drink at least 8-10 glasses of water daily. Hydrated skin is happy skin. Incorporate hydrating serums with hyaluronic acid into your routine for an extra moisture boost.</p>
      
      <h2>3. Switch to Lightweight Moisturizers</h2>
      <p>Heavy winter creams can feel suffocating in summer. Switch to a lightweight, water-based moisturizer that won't clog your pores. Our BB Glow Cream SPF 30 is perfect for summer.</p>
      
      <h2>4. Exfoliate Gently</h2>
      <p>Exfoliate 2-3 times a week to remove dead skin cells and unclog pores. Use gentle chemical exfoliants rather than harsh physical scrubs.</p>
      
      <h2>5. Double Cleanse</h2>
      <p>Use an oil-based cleanser followed by a water-based cleanser to thoroughly remove sunscreen, sweat, and makeup without stripping your skin.</p>
    `,
    tags: ['skincare', 'summer', 'glowing skin', 'beauty tips'],
    relatedPosts: [
      { id: 5, title: "Understanding Your Skin Type", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80" },
      { id: 2, title: "How to Choose the Perfect Foundation", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80" },
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <article>
        {/* Hero */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-custom pb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="bg-gold text-white text-xs px-3 py-1 rounded-full font-medium mb-3 inline-block">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 max-w-3xl">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="max-w-3xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Link to="/" className="hover:text-gold">Home</Link>
              <i className="ri-arrow-right-s-line"></i>
              <Link to="/blog" className="hover:text-gold">Blog</Link>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-charcoal">{post.title}</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-100">
              {post.tags.map((tag) => (
                <span key={tag} className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 mt-6">
              <span className="text-sm text-gray-500">Share:</span>
              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-colors">
                <i className="ri-facebook-fill"></i>
              </button>
              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-colors">
                <i className="ri-twitter-fill"></i>
              </button>
              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-colors">
                <i className="ri-pinterest-fill"></i>
              </button>
            </div>

            {/* Related Posts */}
            <div className="mt-12 pt-12 border-t border-gray-100">
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-6">Related Posts</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {post.relatedPosts.map((related) => (
                  <Link key={related.id} to={`/blog/${related.id}`} className="group">
                    <div className="aspect-video rounded-xl overflow-hidden mb-3">
                      <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h4 className="font-medium text-charcoal group-hover:text-gold transition-colors">{related.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;