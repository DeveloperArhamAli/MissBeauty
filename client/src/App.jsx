import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AnnouncementBar from './components/layout/AnnouncementBar'

import ScrollToTop from './components/utils/ScrollToTop'
import ProtectedRoute from './components/utils/ProtectedRoute'
import LoadingSpinner from './components/ui/LoadingSpinner'
import ResetPasswordPage from './pages/ResetPasswordPage'

const HomePage = lazy(() => import('./pages/HomePage'))
const ShopPage = lazy(() => import('./pages/ShopPage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const FAQPage = lazy(() => import('./pages/FAQPage'))
const TrackOrderPage = lazy(() => import('./pages/TrackOrderPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignUpPage = lazy(() => import('./pages/SignUpPage'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const OrdersPage = lazy(() => import('./pages/OrdersPage'))
const WishlistPage = lazy(() => import('./pages/WishlistPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const PaymentPage = lazy(() => import('./pages/PaymentPage'))
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'))
const OrderFailedPage = lazy(() => import('./pages/OrderFailedPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const ShippingPolicyPage = lazy(() => import('./pages/ShippingPolicyPage'))
const ReturnPolicyPage = lazy(() => import('./pages/ReturnPolicyPage'))

function App() {
  return (
      <>
        <ScrollToTop />
        <AnnouncementBar />
        <Navbar />
        
        <main className="min-h-screen">
        <Suspense fallback={<LoadingSpinner />}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/category/:categorySlug" element={<CategoryPage />} />
              <Route path="/product/:productSlug" element={<ProductPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/search/:query" element={<SearchPage />} />
              
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/help" element={<FAQPage />} />
              <Route path="/track-order" element={<TrackOrderPage />} />
              <Route path="/track-order/:orderNumber" element={<TrackOrderPage />} />
              
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:postSlug" element={<BlogPostPage />} />
              
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/register" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
              
              <Route path="/profile" element={
                <ProtectedRoute><ProfilePage /></ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute><OrdersPage /></ProtectedRoute>
              } />
              <Route path="/wishlist" element={
                <ProtectedRoute><WishlistPage /></ProtectedRoute>
              } />
              
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
              <Route path="/order-failed" element={<OrderFailedPage />} />
              
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsPage />} />
              <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
              <Route path="/return-policy" element={<ReturnPolicyPage />} />
              
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      
      <Footer />
      </>
  )
}

export default App