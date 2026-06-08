import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import ProductCard from '../components/ui/ProductCard';
import SectionTitle from '../components/ui/SectionTitle';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';
import { bestSellers } from "../data/homepage"

const ProductPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('30ml');
  const [selectedVariant, setSelectedVariant] = useState('Natural Beige');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const cartItems = useCartStore((state) => state.items);
  const toggleWishlistItem = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const product = {
    id: 1,
    name: "HD Foundation - Flawless Finish",
    brand: "SilkHue HD",
    price: 1299,
    oldPrice: 1799,
    discount: 28,
    rating: 4.8,
    reviews: 342,
    sku: "RHD-FND-001",
    availability: "In Stock",
    description: "Experience flawless coverage with our HD Foundation. Formulated with light-diffusing particles and skin-nourishing ingredients, this foundation provides a natural, radiant finish that lasts all day. Perfect for all skin types, it blends seamlessly to create a smooth, even complexion.",
    features: [
      "Lightweight, buildable coverage",
      "SPF 15 sun protection",
      "Suitable for all skin types",
      "Long-lasting 12-hour wear",
      "Non-comedogenic formula",
      "Available in 12 shades"
    ],
    images: [
      "https://images.unsplash.com/photo-1595051665600-afd01ea7c446?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1627885793933-584e53987c14?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1608979087030-1a1ab4d262c1?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1673628167571-532a6c5f5d16?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1701271482230-5ecaec3cd3e1?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    sizes: ['15ml', '30ml', '50ml'],
    variants: ['Natural Beige', 'Warm Sand', 'Porcelain', 'Golden Honey', 'Rose Ivory'],
    reviews_list: [
      {
        id: 1,
        user: "Sarah K.",
        rating: 5,
        date: "June 15, 2024",
        title: "Best foundation ever!",
        comment: "This foundation gives such a natural finish. It doesn't feel heavy on the skin and lasts all day. Highly recommend!",
        verified: true
      },
      {
        id: 2,
        user: "Ayesha M.",
        rating: 4,
        date: "June 10, 2024",
        title: "Great coverage",
        comment: "Loving the coverage and finish. Just wish there were more shade options for deeper skin tones.",
        verified: true
      },
      {
        id: 3,
        user: "Fatima R.",
        rating: 5,
        date: "June 5, 2024",
        title: "Perfect match",
        comment: "Finally found my perfect shade! The Natural Beige matches my skin tone perfectly. Will definitely repurchase.",
        verified: true
      }
    ],
    relatedProducts: bestSellers.slice(0, 4)
  };

  const lineId = `${product.id}-${selectedVariant}-${selectedSize}`;
  const cartItem = cartItems.find(item => item.lineId === lineId);

  const ProductPageSkeleton = () => (
    <div className="animate-pulse">
      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="aspect-square bg-gray-200 rounded-2xl mb-4"></div>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <ProductPageSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Breadcrumb */}
      <div className="container-custom py-3 md:py-4">
        <nav className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-500 overflow-hidden">
          <a href="/" className="hover:text-gold transition-colors whitespace-nowrap">Home</a>
          <i className="ri-arrow-right-s-line flex-shrink-0"></i>
          <a href="/makeup" className="hover:text-gold transition-colors whitespace-nowrap">Makeup</a>
          <i className="ri-arrow-right-s-line flex-shrink-0"></i>
          <a href="/makeup/face" className="hover:text-gold transition-colors whitespace-nowrap hidden sm:inline">Face</a>
          <i className="ri-arrow-right-s-line flex-shrink-0 hidden sm:inline"></i>
          {/* FIX: truncate long product name on mobile */}
          <span className="text-charcoal truncate min-w-0">HD Foundation - Flawless Finish</span>
        </nav>
      </div>

      {/* Product Details Section */}
      <section className="container-custom py-4 md:py-8 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 min-w-0">

          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-w-0 w-full"
          >
            {/* Main Image Swiper */}
            <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square mb-3 md:mb-4 w-full">
              <Swiper
                modules={[Navigation, Thumbs]}
                navigation
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className="!absolute !inset-0 !w-full !h-full"
                onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)}
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {product.discount > 0 && (
                <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-red-500 text-white px-2 md:px-3 py-0.5 md:py-1 text-xs md:text-sm font-semibold rounded-full z-10">
                  -{product.discount}%
                </div>
              )}

              <button className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gold hover:text-white transition-colors z-10">
                <i className="ri-heart-line text-base md:text-lg"></i>
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={8}
              slidesPerView="auto"
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="thumb-swiper"
            >
              {product.images.map((image, index) => (
                /* FIX: explicit w-16 sm:w-20 so thumbs are consistent and don't overflow */
                <SwiperSlide key={index} style={{ width: 'auto' }}>
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg overflow-hidden cursor-pointer border-2 flex-shrink-0 transition-colors ${
                    selectedImage === index ? 'border-gold' : 'border-transparent'
                  }`}>
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 md:space-y-6 min-w-0 w-full"
          >
            {/* Brand & Title */}
            <div>
              <p className="text-gold text-xs md:text-sm font-medium uppercase tracking-wider mb-1.5 md:mb-2">
                {product.brand}
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-charcoal mb-3 md:mb-4">
                {product.name}
              </h1>

              {/* Rating row */}
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                <div className="flex items-center gap-1">
                  <div className="flex text-gold text-sm">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={i < Math.floor(product.rating) ? 'ri-star-fill' : 'ri-star-line'}
                      ></i>
                    ))}
                  </div>
                  <span className="text-charcoal font-semibold ml-1 text-sm md:text-base">{product.rating}</span>
                </div>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <button className="text-gray-600 hover:text-gold transition-colors text-xs md:text-sm">
                  {product.reviews} Reviews
                </button>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <span className="text-green-600 text-xs md:text-sm font-medium flex items-center gap-1">
                  <i className="ri-checkbox-circle-fill"></i>
                  {product.availability}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-2 md:gap-3">
              <span className="text-2xl md:text-3xl font-bold text-charcoal">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-lg md:text-xl text-gray-400 line-through">
                    Rs. {product.oldPrice.toLocaleString()}
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-red-500 bg-red-50 px-2 py-0.5 md:py-1 rounded">
                    Save Rs. {(product.oldPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="text-xs md:text-sm font-semibold text-charcoal uppercase tracking-wider mb-2 md:mb-3">
                Size: <span className="text-gold">{selectedSize}</span>
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 md:px-6 py-2 md:py-3 border-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-gold bg-gold text-white'
                        : 'border-gray-200 text-charcoal hover:border-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Variant/Shade Selection */}
            <div>
              <h3 className="text-xs md:text-sm font-semibold text-charcoal uppercase tracking-wider mb-2 md:mb-3">
                Shade: <span className="text-gold">{selectedVariant}</span>
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-3 md:px-6 py-2 md:py-3 border-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                      selectedVariant === variant
                        ? 'border-gold bg-gold text-white'
                        : 'border-gray-200 text-charcoal hover:border-gold'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-xs md:text-sm font-semibold text-charcoal uppercase tracking-wider mb-2 md:mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-0 border-2 border-gray-200 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <i className="ri-subtract-line"></i>
                </button>
                <span className="w-12 h-10 md:w-16 md:h-12 flex items-center justify-center font-medium text-charcoal border-x-2 border-gray-200 text-sm md:text-base">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <i className="ri-add-line"></i>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              {cartItem ? (
                <div className="flex-1 bg-charcoal text-white py-3 md:py-4 px-6 md:px-8 rounded-lg uppercase text-xs md:text-sm tracking-wider font-medium flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => updateQuantity(lineId, cartItem.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white hover:text-charcoal transition-colors rounded"
                  >
                    <i className="ri-subtract-line text-lg"></i>
                  </button>
                  <span className="font-semibold text-lg">{cartItem.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(lineId, cartItem.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white hover:text-charcoal transition-colors rounded"
                  >
                    <i className="ri-add-line text-lg"></i>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => addToCart({
                    ...product,
                    selectedSize,
                    selectedVariant,
                    quantity,
                  })}
                  className="flex-1 bg-charcoal text-white py-3 md:py-4 px-6 md:px-8 rounded-lg uppercase text-xs md:text-sm tracking-wider font-medium hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <i className="ri-shopping-cart-line text-base md:text-lg"></i>
                  Add to Cart
                </button>
              )}
              <button className="flex-1 bg-gold text-white py-3 md:py-4 px-6 md:px-8 rounded-lg uppercase text-xs md:text-sm tracking-wider font-medium hover:bg-gold-dark transition-colors duration-300 flex items-center justify-center gap-2">
                <i className="ri-flashlight-line text-base md:text-lg"></i>
                Buy Now
              </button>
            </div>

            {/* Additional Actions */}
            <div className="flex flex-wrap gap-4 md:gap-6 pt-1 md:pt-2">
              <button
                type="button"
                onClick={() => toggleWishlistItem(product)}
                className="flex items-center gap-2 text-gray-600 hover:text-gold transition-colors text-xs md:text-sm"
              >
                <i className={isInWishlist(product.id || product._id) ? 'ri-heart-fill text-gold' : 'ri-heart-add-line'}></i>
                {isInWishlist(product.id || product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gold transition-colors text-xs md:text-sm">
                <i className="ri-scales-line"></i>
                Compare
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gold transition-colors text-xs md:text-sm">
                <i className="ri-share-forward-line"></i>
                Share
              </button>
            </div>

            {/* Product Meta */}
            <div className="border-t border-gray-200 pt-4 md:pt-6 space-y-2 text-xs md:text-sm">
              <div className="flex gap-2">
                <span className="text-gray-500 w-16 md:w-20 flex-shrink-0">SKU:</span>
                <span className="text-charcoal">{product.sku}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500 w-16 md:w-20 flex-shrink-0">Category:</span>
                {/* FIX: flex-wrap so category links wrap on mobile */}
                <div className="flex flex-wrap gap-1">
                  <a href="/makeup" className="text-charcoal hover:text-gold transition-colors">Makeup</a>
                  <span>,</span>
                  <a href="/makeup/face" className="text-charcoal hover:text-gold transition-colors">Face</a>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500 w-16 md:w-20 flex-shrink-0">Tags:</span>
                <span className="text-charcoal">Foundation, HD, Flawless, Coverage</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-4 bg-nude-light rounded-xl">
              <div className="text-center">
                <i className="ri-shield-check-line text-gold text-lg md:text-xl mb-1 block"></i>
                <span className="text-xs text-gray-600">Authentic</span>
              </div>
              <div className="text-center">
                <i className="ri-truck-line text-gold text-lg md:text-xl mb-1 block"></i>
                <span className="text-xs text-gray-600">Free Shipping</span>
              </div>
              <div className="text-center">
                <i className="ri-arrow-go-back-line text-gold text-lg md:text-xl mb-1 block"></i>
                <span className="text-xs text-gray-600">Easy Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Tabs Section */}
      <section className="bg-gray-50 py-10 md:py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex overflow-x-auto scrollbar-hide gap-0 mb-6 md:mb-8 border-b border-gray-200">
              {['description', 'features', 'reviews', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-medium uppercase tracking-wider transition-colors relative whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab
                      ? 'text-gold'
                      : 'text-gray-500 hover:text-charcoal'
                  }`}
                >
                  {tab === 'reviews' ? `Reviews (${product.reviews})` : tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Description Tab */}
                {activeTab === 'description' && (
                  <div className="prose max-w-none">
                    <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Features Tab */}
                {activeTab === 'features' && (
                  <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 md:p-4 bg-white rounded-xl">
                        <i className="ri-check-line text-gold text-lg md:text-xl flex-shrink-0"></i>
                        <span className="text-sm md:text-base text-charcoal">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6 md:space-y-8">
                    {/* Reviews Summary */}
                    <div className="bg-white p-4 md:p-6 rounded-xl">
                      {/* FIX: stack vertically on mobile, side-by-side on sm+ */}
                      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8">
                        <div className="text-center sm:text-left">
                          <div className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-1 md:mb-2">
                            {product.rating}
                          </div>
                          <div className="flex text-gold justify-center sm:justify-start mb-1 text-sm">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className="ri-star-fill"></i>
                            ))}
                          </div>
                          <p className="text-xs md:text-sm text-gray-500">{product.reviews} reviews</p>
                        </div>
                        {/* FIX: w-full so the bar chart fills width on mobile */}
                        <div className="w-full sm:flex-1 space-y-1.5 md:space-y-2">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center gap-2">
                              <span className="text-xs md:text-sm text-gray-600 w-6 md:w-8">{star}</span>
                              <i className="ri-star-fill text-gold text-xs md:text-sm flex-shrink-0"></i>
                              <div className="flex-1 h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gold rounded-full"
                                  style={{ width: `${star === 5 ? 75 : star === 4 ? 18 : star === 3 ? 5 : star === 2 ? 2 : 0}%` }}
                                ></div>
                              </div>
                              <span className="text-xs md:text-sm text-gray-500 w-8 md:w-10">
                                {star === 5 ? '75%' : star === 4 ? '18%' : star === 3 ? '5%' : star === 2 ? '2%' : '0%'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    {product.reviews_list.map((review) => (
                      <div key={review.id} className="bg-white p-4 md:p-6 rounded-xl">
                        {/* FIX: stack badge below name on very small screens */}
                        <div className="flex items-start justify-between gap-3 mb-3 md:mb-4">
                          <div>
                            <h4 className="font-semibold text-sm md:text-base text-charcoal">{review.user}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex text-gold text-xs md:text-sm">
                                {[...Array(5)].map((_, i) => (
                                  <i
                                    key={i}
                                    className={i < review.rating ? 'ri-star-fill' : 'ri-star-line'}
                                  ></i>
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">{review.date}</span>
                            </div>
                          </div>
                          {review.verified && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1 whitespace-nowrap flex-shrink-0">
                              <i className="ri-shield-check-fill"></i>
                              <span className="hidden sm:inline">Verified Purchase</span>
                              <span className="sm:hidden">Verified</span>
                            </span>
                          )}
                        </div>
                        <h5 className="font-medium text-sm md:text-base text-charcoal mb-1.5 md:mb-2">{review.title}</h5>
                        <p className="text-sm text-gray-600">{review.comment}</p>
                      </div>
                    ))}

                    <button className="w-full border-2 border-charcoal text-charcoal py-3 rounded-lg uppercase text-xs md:text-sm tracking-wider font-medium hover:bg-charcoal hover:text-white transition-colors duration-300">
                      Write a Review
                    </button>
                  </div>
                )}

                {/* Shipping Tab */}
                {activeTab === 'shipping' && (
                  <div className="space-y-4">
                    <div className="bg-white p-4 md:p-6 rounded-xl">
                      <h4 className="font-serif text-lg md:text-xl font-bold text-charcoal mb-3 md:mb-4">Shipping Information</h4>
                      <ul className="space-y-2.5 md:space-y-3 text-sm md:text-base text-gray-600">
                        <li className="flex items-start gap-3">
                          <i className="ri-check-line text-gold mt-0.5 md:mt-1 flex-shrink-0"></i>
                          <span>Free shipping on all orders above Rs. 1,999</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <i className="ri-check-line text-gold mt-0.5 md:mt-1 flex-shrink-0"></i>
                          <span>Standard delivery: 3-5 business days</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <i className="ri-check-line text-gold mt-0.5 md:mt-1 flex-shrink-0"></i>
                          <span>Express delivery: 1-2 business days (additional charges apply)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <i className="ri-check-line text-gold mt-0.5 md:mt-1 flex-shrink-0"></i>
                          <span>Easy returns within 30 days of purchase</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-10 md:py-16 lg:py-24">
        <div className="container-custom">
          <SectionTitle
            title="You May Also Like"
            subtitle="Complete your beauty routine"
          />

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {product.relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="w-full"
              >
                <ProductCard product={relatedProduct} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProductPage;