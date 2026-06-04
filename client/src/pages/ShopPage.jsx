import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ui/ProductCard';

const ShopPage = () => {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sample products data
  const allProducts = [
    { id: 1, name: "HD Foundation - Flawless Finish", brand: "Silk Hue HD", price: 1299, oldPrice: 1799, rating: 4.8, reviews: 342, image: "https://images.unsplash.com/photo-1595051665600-afd01ea7c446?w=400&q=80", badge: "Sale", category: "makeup" },
    { id: 2, name: "Matte Lipstick - Nude Collection", brand: "Silk Hue", price: 899, oldPrice: 1299, rating: 4.6, reviews: 189, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80", badge: "Best Seller", category: "makeup" },
    { id: 3, name: "Vitamin C Brightening Serum", brand: "Silk Hue", price: 1499, oldPrice: 1999, rating: 4.9, reviews: 456, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80", badge: "Best Seller", category: "skincare" },
    { id: 4, name: "Retinol Night Cream", brand: "Silk Hue", price: 1799, oldPrice: 2499, rating: 4.6, reviews: 189, image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&q=80", badge: "Sale", category: "skincare" },
    { id: 5, name: "Waterproof Mascara", brand: "Silk Hue", price: 699, oldPrice: null, rating: 4.5, reviews: 567, image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&q=80", badge: "Popular", category: "makeup" },
    { id: 6, name: "Rose Water Toner", brand: "Silk Hue", price: 599, oldPrice: 899, rating: 4.8, reviews: 345, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80", badge: "Sale", category: "skincare" },
    { id: 7, name: "Contour & Highlight Palette", brand: "Silk Hue HD", price: 1999, oldPrice: null, rating: 4.9, reviews: 234, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80", badge: "New", category: "makeup" },
    { id: 8, name: "Argan Oil Hair Serum", brand: "Silk Hue", price: 899, oldPrice: 1199, rating: 4.7, reviews: 432, image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&q=80", badge: "Sale", category: "haircare" },
    { id: 9, name: "BB Glow Cream SPF 30", brand: "Silk Hue", price: 1299, oldPrice: null, rating: 4.6, reviews: 123, image: "https://plus.unsplash.com/premium_photo-1670584258172-102db20b1da3?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", badge: "New", category: "skincare" },
    { id: 10, name: "Matte Eyeshadow Palette - 12 Shades", brand: "Silk Hue HD", price: 2499, oldPrice: 2999, rating: 4.8, reviews: 89, image: "https://images.unsplash.com/photo-1625094640367-05f84293fe42?q=80&w=864&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", badge: "New", category: "makeup" },
    { id: 11, name: "Hyaluronic Acid Face Mask Set", brand: "Silk Hue", price: 899, oldPrice: null, rating: 4.5, reviews: 67, image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&q=80", badge: "New", category: "skincare" },
    { id: 12, name: "Silk Finish Compact Powder", brand: "Silk Hue HD", price: 999, oldPrice: 1299, rating: 4.7, reviews: 156, image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&q=80", badge: "Sale", category: "makeup" },
    { id: 13, name: "Hair Repair Shampoo", brand: "Silk Hue", price: 799, oldPrice: null, rating: 4.4, reviews: 234, image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&q=80", badge: null, category: "haircare" },
    { id: 14, name: "Eau De Parfum - Rose", brand: "Silk Hue", price: 3499, oldPrice: 4499, rating: 4.9, reviews: 178, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80", badge: "Sale", category: "fragrances" },
    { id: 15, name: "Makeup Brush Set - Professional", brand: "Silk Hue HD", price: 2999, oldPrice: null, rating: 4.7, reviews: 312, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80", badge: "Best Seller", category: "accessories" },
    { id: 16, name: "Sunscreen SPF 50", brand: "Silk Hue", price: 699, oldPrice: 899, rating: 4.5, reviews: 445, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80", badge: "Sale", category: "skincare" },
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: 120 },
    { id: 'makeup', name: 'Makeup', count: 45 },
    { id: 'skincare', name: 'Skin Care', count: 35 },
    { id: 'haircare', name: 'Hair Care', count: 20 },
    { id: 'fragrances', name: 'Fragrances', count: 12 },
    { id: 'accessories', name: 'Accessories', count: 8 },
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
  ];

  // Filter products by category
  const filteredProducts = activeCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === activeCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'newest': return 0; // Would sort by date in real app
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'popular': return b.reviews - a.reviews;
      default: return 0; // featured
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

  // Skeleton Loader
  const ProductGridSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 aspect-square rounded-xl sm:rounded-2xl mb-3 sm:mb-4"></div>
          <div className="space-y-2 px-1">
            <div className="h-3 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-gold transition-colors">Home</a>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-charcoal font-medium">Shop</span>
          </nav>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-2">
              Shop All Products
            </h1>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl">
              Discover our complete range of premium beauty and personal care products
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-6 md:py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Categories</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setCurrentPage(1);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-300 ${
                        activeCategory === category.id
                          ? 'bg-gold text-white font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className={`text-xs ${
                        activeCategory === category.id ? 'text-white/80' : 'text-gray-400'
                      }`}>
                        ({category.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 mb-1 block">Min</label>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
                        placeholder="0"
                      />
                    </div>
                    <span className="text-gray-400 mt-5">-</span>
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 mb-1 block">Max</label>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold"
                        placeholder="5000"
                      />
                    </div>
                  </div>
                  <button className="w-full bg-charcoal text-white py-2 rounded-lg text-sm uppercase tracking-wider hover:bg-gold transition-colors">
                    Apply Filter
                  </button>
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Brands</h3>
                <div className="space-y-2">
                  {['Silk Hue', 'Silk Hue HD', 'Silk Hue Pro'].map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold"
                      />
                      <span className="text-sm text-gray-600">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Availability</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold"
                    />
                    <span className="text-sm text-gray-600">In Stock</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold"
                    />
                    <span className="text-sm text-gray-600">On Sale</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-medium text-charcoal hover:border-gold transition-colors w-fit"
              >
                <i className="ri-filter-3-line"></i>
                Filters
              </button>

              {/* Results Count */}
              <div className="flex items-center text-sm text-gray-500">
                <span>{filteredProducts.length} products found</span>
              </div>

              {/* Sort & View Options */}
              <div className="flex items-center gap-3 ml-auto">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-charcoal focus:outline-none focus:border-gold cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"></i>
                </div>

                {/* View Toggle */}
                <div className="hidden sm:flex border-2 border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 transition-colors ${
                      viewMode === 'grid' ? 'bg-gold text-white' : 'text-gray-500 hover:text-charcoal'
                    }`}
                  >
                    <i className="ri-grid-fill"></i>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 transition-colors ${
                      viewMode === 'list' ? 'bg-gold text-white' : 'text-gray-500 hover:text-charcoal'
                    }`}
                  >
                    <i className="ri-list-view"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeCategory !== 'all' && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs text-gray-500">Active filters:</span>
                <button
                  onClick={() => setActiveCategory('all')}
                  className="flex items-center gap-1 px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-medium hover:bg-gold/20 transition-colors"
                >
                  {categories.find(c => c.id === activeCategory)?.name}
                  <i className="ri-close-line"></i>
                </button>
                <button
                  onClick={() => setActiveCategory('all')}
                  className="text-xs text-gray-500 hover:text-charcoal transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Products Grid */}
            {loading ? (
              <ProductGridSkeleton />
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCategory}-${sortBy}-${currentPage}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={viewMode === 'grid' 
                      ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
                      : "space-y-4"
                    }
                  >
                    {paginatedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                      >
                        {viewMode === 'grid' ? (
                          <ProductCard product={product} />
                        ) : (
                          <div className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 hover:shadow-lg transition-shadow">
                            <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gold font-medium uppercase tracking-wider mb-1">{product.brand}</p>
                              <h3 className="font-medium text-charcoal mb-2">{product.name}</h3>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex text-gold text-sm">
                                  {[...Array(5)].map((_, i) => (
                                    <i key={i} className={i < Math.floor(product.rating) ? 'ri-star-fill' : 'ri-star-line'}></i>
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">({product.reviews})</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-semibold">Rs. {product.price.toLocaleString()}</span>
                                {product.oldPrice && (
                                  <span className="text-sm text-gray-400 line-through">Rs. {product.oldPrice.toLocaleString()}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Empty State */}
                {paginatedProducts.length === 0 && (
                  <div className="text-center py-16">
                    <i className="ri-shopping-bag-line text-6xl text-gray-300 mb-4 block"></i>
                    <h3 className="text-xl font-serif font-bold text-charcoal mb-2">No Products Found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria</p>
                    <button
                      onClick={() => setActiveCategory('all')}
                      className="bg-charcoal text-white px-6 py-2.5 rounded-lg text-sm uppercase tracking-wider hover:bg-gold transition-colors"
                    >
                      View All Products
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8 md:mt-12">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-gold hover:text-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="ri-arrow-left-s-line"></i>
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                          currentPage === i + 1
                            ? 'bg-gold text-white'
                            : 'border border-gray-200 text-gray-600 hover:border-gold hover:text-gold'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-gold hover:text-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="ri-arrow-right-s-line"></i>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-80 bg-white z-50 overflow-y-auto lg:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-xl font-bold text-charcoal">Filters</h3>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="text-gray-500 hover:text-charcoal"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Categories */}
                  <div>
                    <h4 className="font-medium text-charcoal mb-3">Categories</h4>
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            setActiveCategory(category.id);
                            setCurrentPage(1);
                            setMobileFilterOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                            activeCategory === category.id
                              ? 'bg-gold text-white'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <span>{category.name}</span>
                          <span className="text-xs">({category.count})</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium text-charcoal mb-3">Price Range</h4>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        placeholder="Min"
                      />
                      <span className="text-gray-400">-</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  <button className="w-full bg-charcoal text-white py-3 rounded-lg text-sm uppercase tracking-wider hover:bg-gold transition-colors">
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage;