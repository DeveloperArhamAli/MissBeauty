import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';

const SearchPage = () => {
  const { query } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = query || searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');

  const suggestions = [
    'Foundation', 'Lipstick', 'Serum', 'Moisturizer', 
    'Mascara', 'Toner', 'Sunscreen', 'Eyeshadow'
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API search
    setTimeout(() => {
      setResults([
        { id: 1, name: "HD Foundation - Flawless Finish", brand: "Rivaj HD", price: 1299, oldPrice: 1799, rating: 4.8, reviews: 342, image: "https://images.unsplash.com/photo-1595051665600-afd01ea7c446?w=400&q=80", badge: "Sale" },
        { id: 2, name: "Matte Lipstick - Nude Collection", brand: "Rivaj UK", price: 899, oldPrice: 1299, rating: 4.6, reviews: 189, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80", badge: "Best Seller" },
        { id: 3, name: "Vitamin C Brightening Serum", brand: "Rivaj UK", price: 1499, oldPrice: null, rating: 4.9, reviews: 456, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80", badge: null },
        { id: 4, name: "Retinol Night Cream", brand: "Rivaj UK", price: 1799, oldPrice: 2499, rating: 4.6, reviews: 189, image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&q=80", badge: "Sale" },
      ]);
      setLoading(false);
    }, 800);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-8">
        {/* Search Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-charcoal font-medium">Search</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal">
            {searchQuery ? `Results for "${searchQuery}"` : 'Search Products'}
          </h1>
          {searchQuery && !loading && (
            <p className="text-gray-500 mt-2">{results.length} products found</p>
          )}
        </motion.div>

        {!searchQuery ? (
          <div className="max-w-xl mx-auto text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-search-line text-3xl text-gray-400"></i>
            </div>
            <h2 className="text-xl font-serif font-bold text-charcoal mb-4">Search Our Products</h2>
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gold transition-colors"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    window.location.href = `/search/${e.target.value}`;
                  }
                }}
              />
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-4">Popular Searches</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map((suggestion) => (
                  <Link
                    key={suggestion}
                    to={`/search/${suggestion.toLowerCase()}`}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gold hover:text-white transition-colors"
                  >
                    {suggestion}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-2xl mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-file-search-line text-4xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-serif font-bold text-charcoal mb-2">No Results Found</h3>
            <p className="text-gray-500 mb-6">Try different keywords or browse categories</p>
            <Link to="/shop" className="bg-charcoal text-white px-8 py-3 rounded-lg text-sm uppercase tracking-wider hover:bg-gold transition-colors inline-block">
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-6">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {results.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;