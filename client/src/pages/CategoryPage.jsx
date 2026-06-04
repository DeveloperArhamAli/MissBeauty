import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import SectionTitle from '../components/ui/SectionTitle';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const productsPerPage = 12;

  useEffect(() => {
    console.log(categoryId)
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [categoryId]);

  // Category data with subcategories
  const categoriesData = {
    makeup: {
      name: "Makeup",
      description: "Discover our complete range of premium makeup products designed to enhance your natural beauty. From foundations to lipsticks, find everything you need for a flawless look.",
      heroImage: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80",
      productCount: 45,
      subcategories: [
        { id: 'all', name: 'All Makeup' },
        { id: 'face', name: 'Face' },
        { id: 'eyes', name: 'Eyes' },
        { id: 'lips', name: 'Lips' },
        { id: 'cheeks', name: 'Cheeks' },
        { id: 'brushes', name: 'Brushes & Tools' },
      ],
      featuredBrands: ['Silk Hue HD', 'Silk Hue', 'Silk Hue Pro'],
      benefits: [
        { icon: 'ri-shield-check-line', text: 'Dermatologically Tested' },
        { icon: 'ri-leaf-line', text: 'Cruelty Free' },
        { icon: 'ri-sun-line', text: 'SPF Protection' },
        { icon: 'ri-drop-line', text: 'Long Lasting' },
      ]
    },
    skincare: {
      name: "Skin Care",
      description: "Transform your skincare routine with our scientifically formulated products. From serums to moisturizers, each product is crafted to deliver visible results for every skin type.",
      heroImage: "https://images.unsplash.com/photo-1555820585-c5ae44394b79?q=80&w=425&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      productCount: 35,
      subcategories: [
        { id: 'all', name: 'All Skin Care' },
        { id: 'cleansers', name: 'Cleansers' },
        { id: 'serums', name: 'Serums' },
        { id: 'moisturizers', name: 'Moisturizers' },
        { id: 'masks', name: 'Face Masks' },
        { id: 'sunscreen', name: 'Sunscreen' },
      ],
      featuredBrands: ['Silk Hue', 'Silk Hue Pro'],
      benefits: [
        { icon: 'ri-test-tube-line', text: 'Clinically Proven' },
        { icon: 'ri-plant-line', text: 'Natural Ingredients' },
        { icon: 'ri-shield-star-line', text: 'Dermatologist Recommended' },
        { icon: 'ri-recycle-line', text: 'Eco-Friendly' },
      ]
    },
    haircare: {
      name: "Hair Care",
      description: "Give your hair the care it deserves with our professional-grade hair care products. From nourishing shampoos to styling essentials, achieve salon-worthy results at home.",
      heroImage: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=1200&q=80",
      productCount: 20,
      subcategories: [
        { id: 'all', name: 'All Hair Care' },
        { id: 'shampoo', name: 'Shampoo' },
        { id: 'conditioner', name: 'Conditioner' },
        { id: 'treatments', name: 'Treatments' },
        { id: 'styling', name: 'Styling' },
        { id: 'oils', name: 'Hair Oils' },
      ],
      featuredBrands: ['Silk Hue'],
      benefits: [
        { icon: 'ri-flask-line', text: 'Advanced Formula' },
        { icon: 'ri-rainbow-line', text: 'Color Safe' },
        { icon: 'ri-leaf-line', text: 'Paraben Free' },
        { icon: 'ri-sparkling-line', text: 'Sulfate Free' },
      ]
    },
    fragrances: {
      name: "Fragrances",
      description: "Explore our exquisite collection of fragrances that capture the essence of elegance. Each scent is carefully crafted to make a lasting impression.",
      heroImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&q=80",
      productCount: 12,
      subcategories: [
        { id: 'all', name: 'All Fragrances' },
        { id: 'women', name: 'For Women' },
        { id: 'men', name: 'For Men' },
        { id: 'unisex', name: 'Unisex' },
        { id: 'gift-sets', name: 'Gift Sets' },
      ],
      featuredBrands: ['Silk Hue'],
      benefits: [
        { icon: 'ri-timer-line', text: 'Long Lasting' },
        { icon: 'ri-global-line', text: 'Imported' },
        { icon: 'ri-gift-line', text: 'Perfect for Gifting' },
        { icon: 'ri-palette-line', text: 'Unique Blends' },
      ]
    },
    accessories: {
      name: "Accessories",
      description: "Complete your beauty routine with our range of professional accessories and tools. Quality essentials designed for effortless application and stunning results.",
      heroImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80",
      productCount: 8,
      subcategories: [
        { id: 'all', name: 'All Accessories' },
        { id: 'brushes', name: 'Makeup Brushes' },
        { id: 'sponges', name: 'Beauty Sponges' },
        { id: 'bags', name: 'Makeup Bags' },
        { id: 'mirrors', name: 'Mirrors' },
      ],
      featuredBrands: ['Silk Hue HD', 'Silk Hue Pro'],
      benefits: [
        { icon: 'ri-tools-line', text: 'Professional Grade' },
        { icon: 'ri-verified-badge-line', text: 'Premium Quality' },
        { icon: 'ri-brush-line', text: 'Easy to Use' },
        { icon: 'ri-heart-pulse-line', text: 'Skin Friendly' },
      ]
    },
  };

  const category = categoriesData[categoryId] || categoriesData.makeup;

  // Sample products for this category
  const allProducts = [
    { id: 1, name: "HD Foundation - Flawless Finish", brand: "Silk Hue HD", price: 1299, oldPrice: 1799, rating: 4.8, reviews: 342, image: "https://images.unsplash.com/photo-1595051665600-afd01ea7c446?w=400&q=80", badge: "Sale", subcategory: "face" },
    { id: 2, name: "Matte Lipstick - Nude Collection", brand: "Silk Hue", price: 899, oldPrice: 1299, rating: 4.6, reviews: 189, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80", badge: "Best Seller", subcategory: "lips" },
    { id: 3, name: "Waterproof Mascara", brand: "Silk Hue", price: 699, oldPrice: null, rating: 4.5, reviews: 567, image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&q=80", badge: "Popular", subcategory: "eyes" },
    { id: 4, name: "Contour & Highlight Palette", brand: "Silk Hue HD", price: 1999, oldPrice: null, rating: 4.9, reviews: 234, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80", badge: "New", subcategory: "face" },
    { id: 5, name: "Matte Eyeshadow Palette - 12 Shades", brand: "Silk Hue HD", price: 2499, oldPrice: 2999, rating: 4.8, reviews: 89, image: "https://images.unsplash.com/photo-1595051665600-afd01ea7c446?w=400&q=80", badge: "New", subcategory: "eyes" },
    { id: 6, name: "Silk Finish Compact Powder", brand: "Silk Hue HD", price: 999, oldPrice: 1299, rating: 4.7, reviews: 156, image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&q=80", badge: "Sale", subcategory: "face" },
    { id: 7, name: "Liquid Eyeliner - Precision Tip", brand: "Silk Hue", price: 599, oldPrice: null, rating: 4.4, reviews: 234, image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&q=80", badge: null, subcategory: "eyes" },
    { id: 8, name: "Blush Palette - 4 Shades", brand: "Silk Hue HD", price: 1499, oldPrice: 1899, rating: 4.7, reviews: 178, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80", badge: "Best Seller", subcategory: "cheeks" },
    { id: 9, name: "Makeup Brush Set - Professional", brand: "Silk Hue HD", price: 2999, oldPrice: null, rating: 4.7, reviews: 312, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80", badge: "Best Seller", subcategory: "brushes" },
    { id: 10, name: "Lip Gloss - Shimmer Collection", brand: "Silk Hue", price: 799, oldPrice: null, rating: 4.3, reviews: 145, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80", badge: "New", subcategory: "lips" },
    { id: 11, name: "BB Cream SPF 30", brand: "Silk Hue", price: 1099, oldPrice: 1399, rating: 4.5, reviews: 234, image: "https://images.unsplash.com/photo-1595051665600-afd01ea7c446?w=400&q=80", badge: "Sale", subcategory: "face" },
    { id: 12, name: "Setting Spray - Matte Finish", brand: "Silk Hue HD", price: 899, oldPrice: null, rating: 4.6, reviews: 167, image: "https://images.unsplash.com/photo-1595051665600-afd01ea7c446?w=400&q=80", badge: "Popular", subcategory: "face" },
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
  ];

  // Filter products by subcategory
  const filteredProducts = selectedSubcategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.subcategory === selectedSubcategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'newest': return 0;
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'popular': return b.reviews - a.reviews;
      default: return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

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
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={category.heroImage}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="absolute inset-0 container-custom flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white max-w-lg"
          >
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-white/70 mb-4">
              <a href="/" className="hover:text-gold transition-colors">Home</a>
              <i className="ri-arrow-right-s-line"></i>
              <a href="/shop" className="hover:text-gold transition-colors">Shop</a>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-white">{category.name}</span>
            </nav>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
              {category.name}
            </h1>
            <p className="text-white/80 text-sm md:text-lg max-w-md">
              {category.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-4 md:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {category.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 md:gap-3 justify-center md:justify-start"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className={`${benefit.icon} text-gold text-sm md:text-lg`}></i>
                </div>
                <span className="text-xs md:text-sm text-gray-600 font-medium">{benefit.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-6 md:py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Subcategories */}
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Categories</h3>
                <div className="space-y-1">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setSelectedSubcategory(sub.id);
                        setCurrentPage(1);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-300 ${
                        selectedSubcategory === sub.id
                          ? 'bg-gold text-white font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                      }`}
                    >
                      <span>{sub.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Brands */}
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Brands</h3>
                <div className="space-y-2">
                  {category.featuredBrands.map((brand) => (
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

              {/* Price Range */}
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Price Range</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold" />
                      <span className="text-sm text-gray-600">Under Rs. 1,000</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold" />
                      <span className="text-sm text-gray-600">Rs. 1,000 - Rs. 2,000</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold" />
                      <span className="text-sm text-gray-600">Rs. 2,000 - Rs. 3,000</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold" />
                      <span className="text-sm text-gray-600">Above Rs. 3,000</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal mb-4">Availability</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold" />
                    <span className="text-sm text-gray-600">In Stock</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold" />
                    <span className="text-sm text-gray-600">On Sale</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
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

              {/* Subcategory Pills - Mobile Scrollable */}
              <div className="lg:hidden flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
                {category.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubcategory(sub.id);
                      setCurrentPage(1);
                    }}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                      selectedSubcategory === sub.id
                        ? 'bg-gold text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>

              {/* Results Count */}
              <div className="flex items-center text-sm text-gray-500">
                <span>{filteredProducts.length} products</span>
              </div>

              {/* Sort & View Options */}
              <div className="flex items-center gap-3 ml-auto">
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

            {/* Products Grid */}
            {loading ? (
              <ProductGridSkeleton />
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedSubcategory}-${sortBy}-${currentPage}`}
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
                    <p className="text-gray-500 mb-6">Try adjusting your filters</p>
                    <button
                      onClick={() => setSelectedSubcategory('all')}
                      className="bg-charcoal text-white px-6 py-2.5 rounded-lg text-sm uppercase tracking-wider hover:bg-gold transition-colors"
                    >
                      View All {category.name}
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

      {/* Related Categories */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container-custom">
          <SectionTitle
            title="Explore More Categories"
            subtitle="Discover our full range of beauty products"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {Object.entries(categoriesData).filter(([slug]) => slug !== categoryId).slice(0, 4).map(([slug, cat]) => (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Link
                  to={`/category/${slug}`}
                  className="group block relative overflow-hidden rounded-xl aspect-square"
                >
                  <img
                    src={cat.heroImage}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                    <h3 className="text-lg md:text-xl font-serif font-bold mb-1">{cat.name}</h3>
                    <p className="text-white/80 text-xs md:text-sm">{cat.productCount} Products</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
                  <div>
                    <h4 className="font-medium text-charcoal mb-3">Categories</h4>
                    <div className="space-y-1">
                      {category.subcategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setSelectedSubcategory(sub.id);
                            setCurrentPage(1);
                            setMobileFilterOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                            selectedSubcategory === sub.id
                              ? 'bg-gold text-white'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <span>{sub.name}</span>
                        </button>
                      ))}
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

export default CategoryPage;