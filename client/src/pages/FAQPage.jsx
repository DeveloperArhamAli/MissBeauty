import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('orders');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'orders', label: 'Orders & Shipping', icon: 'ri-truck-line' },
    { id: 'returns', label: 'Returns & Refunds', icon: 'ri-arrow-go-back-line' },
    { id: 'products', label: 'Products & Ingredients', icon: 'ri-flask-line' },
    { id: 'account', label: 'Account & Payment', icon: 'ri-user-settings-line' },
    { id: 'beauty', label: 'Beauty Tips', icon: 'ri-sparkling-line' },
  ];

  const faqs = {
    orders: [
      {
        question: "How can I track my order?",
        answer: "You can track your order by visiting our Track Order page and entering your order number. You'll also receive tracking updates via email once your order ships."
      },
      {
        question: "What are the shipping charges?",
        answer: "We offer free shipping on all orders above Rs. 1,999. For orders below this amount, a standard shipping fee of Rs. 199 applies."
      },
      {
        question: "How long does delivery take?",
        answer: "Standard delivery takes 3-5 business days. Express delivery (1-2 business days) is available for Rs. 299 extra."
      },
      {
        question: "Do you ship internationally?",
        answer: "Currently, we only ship within Pakistan. We're working on expanding to international destinations soon."
      },
      {
        question: "Can I change my shipping address after placing an order?",
        answer: "You can change your shipping address within 1 hour of placing the order by contacting our customer support team."
      }
    ],
    returns: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for unused and unopened products. Items must be in their original packaging with all seals intact."
      },
      {
        question: "How do I initiate a return?",
        answer: "To initiate a return, go to your Orders page, select the order, and click 'Return Item'. Follow the instructions to generate a return label."
      },
      {
        question: "How long do refunds take?",
        answer: "Once we receive and inspect the returned item, refunds are processed within 5-7 business days to the original payment method."
      },
      {
        question: "Can I exchange a product?",
        answer: "Yes, you can exchange products within 30 days. The replacement will be shipped once we receive the original item."
      }
    ],
    products: [
      {
        question: "Are your products cruelty-free?",
        answer: "Yes, all Silk Hue products are cruelty-free. We do not test on animals at any stage of product development."
      },
      {
        question: "Are your products suitable for sensitive skin?",
        answer: "Many of our products are formulated for sensitive skin. Look for our 'Dermatologically Tested' badge on product pages. We recommend doing a patch test before full application."
      },
      {
        question: "How do I find the right shade of foundation?",
        answer: "Use our Shade Finder tool on any foundation product page. You can also visit our store for a professional color match."
      },
      {
        question: "What is the shelf life of your products?",
        answer: "Most products have a shelf life of 24-36 months unopened. Once opened, refer to the PAO (Period After Opening) symbol on the packaging."
      }
    ],
    account: [
      {
        question: "How do I create an account?",
        answer: "Click on the profile icon and select 'Create Account'. Fill in your details and verify your email address to get started."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept Cash on Delivery (COD) and Credit/Debit cards (Visa and Mastercard)."
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes, we use 256-bit SSL encryption to protect your payment information. We never store your full card details."
      },
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login page and enter your email address. We'll send you a password reset link."
      }
    ],
    beauty: [
      {
        question: "How do I build a skincare routine?",
        answer: "Start with a basic routine: Cleanse → Tone → Moisturize → SPF (morning). Gradually add serums and treatments based on your skin concerns."
      },
      {
        question: "How often should I exfoliate?",
        answer: "For most skin types, exfoliating 2-3 times per week is sufficient. Those with sensitive skin should exfoliate once a week."
      },
      {
        question: "What's the correct order to apply makeup?",
        answer: "Primer → Foundation → Concealer → Powder → Bronzer/Blush → Eyeshadow → Eyeliner → Mascara → Lips. Set with setting spray for long-lasting wear."
      }
    ]
  };

  const filteredFAQs = searchQuery
    ? Object.values(faqs).flat().filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs[activeCategory] || [];

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
              How Can We Help You?
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Find answers to commonly asked questions about our products, orders, and services
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto mb-8"
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gold transition-colors text-charcoal placeholder-gray-400 shadow-sm"
              />
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
            </div>
          </motion.div>

          {/* Categories */}
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide justify-center"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setOpenFAQ(null);
                  }}
                  className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-gold text-white shadow-lg shadow-gold/25'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <i className={category.icon}></i>
                  {category.label}
                </button>
              ))}
            </motion.div>
          )}

          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-question-line text-3xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-serif font-bold text-charcoal mb-2">No Results Found</h3>
                <p className="text-gray-500">Try searching with different keywords</p>
              </div>
            ) : (
              filteredFAQs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-charcoal pr-4">{faq.question}</span>
                    <i className={`ri-arrow-${openFAQ === index ? 'up' : 'down'}-s-line text-gray-400 flex-shrink-0 transition-transform duration-300`}></i>
                  </button>
                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </motion.div>

          {/* Still Need Help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-white rounded-2xl p-8 shadow-sm text-center"
          >
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-customer-service-2-line text-2xl text-gold"></i>
            </div>
            <h3 className="text-xl font-serif font-bold text-charcoal mb-2">Still Need Help?</h3>
            <p className="text-gray-500 mb-6">Our support team is here to assist you</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gold text-white px-8 py-3 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-gold-dark transition-colors inline-flex items-center justify-center gap-2"
              >
                <i className="ri-mail-send-line"></i>
                Contact Us
              </Link>
              <a
                href="tel:+924212345678"
                className="border-2 border-charcoal text-charcoal px-8 py-3 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-charcoal hover:text-white transition-colors inline-flex items-center justify-center gap-2"
              >
                <i className="ri-phone-line"></i>
                +92 42 1234 5678
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;