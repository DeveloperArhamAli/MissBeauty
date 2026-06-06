import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'skincare', name: 'Skincare' },
    { id: 'makeup', name: 'Makeup' },
    { id: 'beauty-tips', name: 'Beauty Tips' },
    { id: 'lifestyle', name: 'Lifestyle' },
  ];

  const posts = [
    {
      id: 1,
      title: "10 Skincare Tips for Glowing Skin This Summer",
      category: "skincare",
      date: "June 15, 2024",
      image: "https://images.unsplash.com/photo-1570194065650-d99fb4ee8e78?w=600&q=80",
      excerpt: "Discover the best skincare routine for the summer season...",
      author: "Sarah Ahmed",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "How to Choose the Perfect Foundation Shade",
      category: "makeup",
      date: "June 10, 2024",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
      excerpt: "A complete guide to finding your perfect foundation match...",
      author: "Ayesha Khan",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "The Ultimate Guide to Korean Beauty Routine",
      category: "beauty-tips",
      date: "June 5, 2024",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80",
      excerpt: "Step-by-step guide to the famous Korean skincare routine...",
      author: "Fatima Raza",
      readTime: "8 min read"
    },
    {
      id: 4,
      title: "5 Must-Have Products for Your Travel Bag",
      category: "lifestyle",
      date: "June 1, 2024",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
      excerpt: "Pack light with these essential beauty products...",
      author: "Zainab Ali",
      readTime: "4 min read"
    },
    {
      id: 5,
      title: "Understanding Your Skin Type: A Complete Guide",
      category: "skincare",
      date: "May 28, 2024",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80",
      excerpt: "Learn how to identify your skin type and choose the right products...",
      author: "Sarah Ahmed",
      readTime: "6 min read"
    },
    {
      id: 6,
      title: "Makeup Trends 2024: What's Hot This Year",
      category: "makeup",
      date: "May 25, 2024",
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80",
      excerpt: "Stay ahead of the curve with these trending makeup looks...",
      author: "Ayesha Khan",
      readTime: "5 min read"
    }
  ];

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-8 md:py-12">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-charcoal font-medium">Blog</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-charcoal mb-2">Beauty Blog</h1>
            <p className="text-gray-600 max-w-2xl">Tips, trends, and beauty insights from our experts</p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Category Filters */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-gold text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/blog/${post.id}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-charcoal text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-serif font-bold text-charcoal group-hover:text-gold transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-sm text-gold font-medium">Read More</span>
                    <i className="ri-arrow-right-line text-gold"></i>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;